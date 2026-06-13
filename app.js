// API Configuration
const API_BASE = "https://rucoystatsapi.net/api/";

// App State
const state = {
  currentView: "leaderboards",
  leaderboard: {
    type: "leaderboard/exp-records", // default
    days: 7,
    search: "",
    minLevel: "",
    maxLevel: "",
    pageIndex: 1,
    pageSize: 20
  },
  monstersList: [],
  skillsList: [],
  experiencesList: [],
  playerChart: null
};

// Game-accurate sorted database for training calculators (from monsters_fallback.json)
const TRAINING_MONSTERS_DB = [
  { "name": "Rat Lv.1", "level": 1, "defense": 4, "hp": 25, "img": "assets/monsters/Movingrat.gif" },
  { "name": "Rat Lv.3", "level": 3, "defense": 7, "hp": 35, "img": "assets/monsters/Movingrat.gif" },
  { "name": "Crow Lv.6", "level": 6, "defense": 13, "hp": 40, "img": "assets/monsters/Crow.gif" },
  { "name": "Wolf Lv.9", "level": 9, "defense": 17, "hp": 50, "img": "assets/monsters/Wolf.gif" },
  { "name": "Scorpion Lv.12", "level": 12, "defense": 18, "hp": 50, "img": "assets/monsters/Scorpion.gif" },
  { "name": "Cobra Lv.13", "level": 13, "defense": 18, "hp": 50, "img": "assets/monsters/Cobra.gif" },
  { "name": "Worm Lv.14", "level": 14, "defense": 19, "hp": 55, "img": "assets/monsters/Worm.gif" },
  { "name": "Goblin Lv.15", "level": 15, "defense": 21, "hp": 60, "img": "assets/monsters/Goblin.gif" },
  { "name": "Mummy Lv.25", "level": 25, "defense": 36, "hp": 80, "img": "assets/monsters/Mummy.gif" },
  { "name": "Pharaoh Lv.35", "level": 35, "defense": 51, "hp": 100, "img": "assets/monsters/Pharaoh.gif" },
  { "name": "Assassin Lv.45", "level": 45, "defense": 71, "hp": 120, "img": "assets/monsters/45assassin.gif" },
  { "name": "Assassin Lv.50", "level": 50, "defense": 81, "hp": 140, "img": "assets/monsters/Yellow_Assassin_Gif.gif" },
  { "name": "Assassin Ninja Lv.55", "level": 55, "defense": 91, "hp": 160, "img": "assets/monsters/assasin_ninja.gif" },
  { "name": "Skeleton Archer Lv.80", "level": 80, "defense": 101, "hp": 300, "img": "assets/monsters/Skeleton_Archer_Gif.gif" },
  { "name": "Zombie Lv.65", "level": 65, "defense": 106, "hp": 200, "img": "assets/monsters/Zombie_Gif.gif" },
  { "name": "Skeleton Lv.75", "level": 75, "defense": 121, "hp": 300, "img": "assets/monsters/Skeleton.gif" },
  { "name": "Skeleton Warrior Lv.90", "level": 90, "defense": 146, "hp": 375, "img": "assets/monsters/Skeleton_Warrior_Gif.gif" },
  { "name": "Vampire Lv.100", "level": 100, "defense": 171, "hp": 450, "img": "assets/monsters/Vampire_Gif.gif" },
  { "name": "Vampire Lv.110", "level": 110, "defense": 186, "hp": 530, "img": "assets/monsters/Red_Vampire_Gif.gif" },
  { "name": "Drow Ranger Lv.125", "level": 125, "defense": 191, "hp": 600, "img": "assets/monsters/Drow_Ranger_Gif.gif" },
  { "name": "Drow Mage Lv.130", "level": 130, "defense": 191, "hp": 600, "img": "assets/monsters/Drow_Mage_Gif.gif" },
  { "name": "Drow Assassin Lv.120", "level": 120, "defense": 221, "hp": 620, "img": "assets/monsters/Drow_Assassin_Gif.gif" },
  { "name": "Drow Sorceress Lv.140", "level": 140, "defense": 221, "hp": 600, "img": "assets/monsters/Drow_Sorceress_Gif.gif" },
  { "name": "Drow Fighter Lv.135", "level": 135, "defense": 246, "hp": 680, "img": "assets/monsters/Drow_Fighter_Gif.gif" },
  { "name": "Lizard Archer Lv.160", "level": 160, "defense": 271, "hp": 650, "img": "assets/monsters/Lizard_Archer_Gif.gif" },
  { "name": "Lizard Shaman Lv.170", "level": 170, "defense": 276, "hp": 600, "img": "assets/monsters/Lizard_Shaman_Gif.gif" },
  { "name": "Dead Eyes Lv.170", "level": 170, "defense": 276, "hp": 600, "img": "assets/monsters/dead_eyes.gif" },
  { "name": "Lizard Warrior Lv.150", "level": 150, "defense": 301, "hp": 680, "img": "assets/monsters/Lizard_Warrior_Gif.gif" },
  { "name": "Djinn Lv.150", "level": 150, "defense": 301, "hp": 640, "img": "assets/monsters/djinn.gif" },
  { "name": "Lizard High Shaman Lv.190", "level": 190, "defense": 326, "hp": 740, "img": "assets/monsters/Lizard_High_Shaman_Gif.gif" },
  { "name": "Gargoyle Lv.190", "level": 190, "defense": 326, "hp": 740, "img": "assets/monsters/gargoyle.gif" },
  { "name": "Dragon Hatchling Lv.240", "level": 240, "defense": 331, "hp": 10000, "img": "assets/monsters/Dragon_Hatchling_Gif.gif" },
  { "name": "Lizard Captain Lv.180", "level": 180, "defense": 361, "hp": 815, "img": "assets/monsters/Lizard_Captain_Gif.gif" },
  { "name": "Minotaur Lv.225", "level": 225, "defense": 511, "hp": 4250, "img": "assets/monsters/minotaur_225.gif" },
  { "name": "Minotaur Lv.250", "level": 250, "defense": 591, "hp": 5000, "img": "assets/monsters/minotaur_250.gif" },
  { "name": "Dragon Lv.250", "level": 250, "defense": 601, "hp": 15000, "img": "assets/monsters/Dragon_Gif.gif" },
  { "name": "Dragon Warden Lv.280", "level": 280, "defense": 626, "hp": 30000, "img": "assets/monsters/Dragon_Warden_Gif.gif" },
  { "name": "Ice Elemental Lv.300", "level": 300, "defense": 676, "hp": 40000, "img": "assets/monsters/Ice_Elemental.png" },
  { "name": "Minotaur Lv.275", "level": 275, "defense": 691, "hp": 5750, "img": "assets/monsters/minotaur_275.gif" },
  { "name": "Ice Dragon", "level": 320, "defense": 726, "hp": 45000, "img": "assets/monsters/Ice_Dragon.png" },
  { "name": "Yeti", "level": 350, "defense": 826, "hp": 55000, "img": "assets/monsters/Yeti.png" }
];

// Precise game-mechanic formula calculations matching Formulas.kt / Formulas.java
const Formulas = {
  auto_max_raw_damage_Calc(stat, weaponatk, base) {
    return ((stat * weaponatk) / 10) + (base / 4);
  },

  auto_min_raw_damage_Calc(stat, weaponatk, base) {
    return ((stat * weaponatk) / 20) + (base / 4);
  },

  average_damage_Calc(accuracy, max_damage, min_damage, max_crit_damage) {
    return (accuracy * ((min_damage + max_damage) / 2) * 0.99) + (((max_crit_damage + max_damage) / 2) * 0.01);
  },

  max_raw_crit_damage_Calc(max_raw_damage) {
    return max_raw_damage * 1.05;
  },

  powertickrate_Calc(totalaccuracy, maxtickrate) {
    return maxtickrate * totalaccuracy;
  },

  special_magic_max_raw_damage_Calc(stat, weaponatk, base) {
    return ((((stat * 1.05) * weaponatk) / 10) + ((9 * base) / 32)) * 1.5;
  },

  special_magic_min_raw_damage_Calc(stat, weaponatk, base) {
    return ((((stat * 1.05) * weaponatk) / 20) + ((9 * base) / 32)) * 1.5;
  },

  special_meldist_max_raw_damage_Calc(stat, weaponatk, base) {
    return (((stat * weaponatk) / 10) + (base / 4)) * 1.5;
  },

  special_meldist_min_raw_damage_Calc(stat, weaponatk, base) {
    return (((stat * weaponatk) / 20) + (base / 4)) * 1.5;
  },

  min_damage_Calc(min_raw_damage, pos, mobs) {
    const defense = mobs[pos].defense;
    const val = min_raw_damage - defense;
    return val < 0 ? 0 : val;
  },

  max_damage_Calc(max_raw_damage, pos, mobs) {
    const defense = mobs[pos].defense;
    return max_raw_damage - defense;
  },

  max_crit_damage_Calc(max_raw_crit_damage, pos, mobs) {
    const defense = mobs[pos].defense;
    return max_raw_crit_damage - defense;
  },

  normal_accuracy_Calc(max_raw_damage, min_raw_damage, x, mobs) {
    const defense = mobs[x].defense;
    const val = (max_raw_damage - defense) / (max_raw_damage - min_raw_damage);
    return val > 1.0 ? 1.0 : val;
  },

  crit_accuracy_Calc(max_raw_crit_damage, max_raw_damage, x, mobs) {
    const defense = mobs[x].defense;
    const val = (max_raw_crit_damage - defense) / (max_raw_crit_damage - max_raw_damage);
    return val > 1.0 ? 1.0 : val;
  },

  accuracy_Calc(max_raw_crit_damage, max_raw_damage, min_raw_damage, x, mobs) {
    return (0.99 * this.normal_accuracy_Calc(max_raw_damage, min_raw_damage, x, mobs)) + 
           (this.crit_accuracy_Calc(max_raw_crit_damage, max_raw_damage, x, mobs) * 0.01);
  },

  total_accuracy_Calc(accuracy, tick) {
    return 1.0 - Math.pow(Math.pow(1.0 - accuracy, tick), 10.0);
  },

  time_to_kill_Calc(avgdmg, pos, mobs) {
    const hp = mobs[pos].hp;
    return hp / avgdmg;
  },

  tickrate_Calc(accuracy, maxtickrate) {
    return maxtickrate * (1.0 - Math.pow(1.0 - accuracy, 10.0));
  },

  max_tickrate_Calc(tick) {
    if (tick <= 5.0) {
      return tick * 3600;
    }
    return 18000;
  },

  threshold_Calc(tick) {
    return 1.0 - Math.pow(0.8251, 1.0 / tick);
  }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded: Inicializando módulos...");
  
  try { initNavigation(); } catch(e) { console.error("Falla initNavigation:", e); }
  try { initLeaderboardFilters(); } catch(e) { console.error("Falla initLeaderboardFilters:", e); }
  try { initCalculators(); } catch(e) { console.error("Falla initCalculators:", e); }
  try { initComparers(); } catch(e) { console.error("Falla initComparers:", e); }
  try { initGuildSearch(); } catch(e) { console.error("Falla initGuildSearch:", e); }
  try { initPuzzleSolver(); } catch(e) { console.error("Falla initPuzzleSolver:", e); }
  
  // Load default view
  try {
    switchView("comparers");
  } catch(e) {
    console.error("Falla switchView inicial:", e);
  }
});

// ==========================================
// NAVIGATION & LAYOUT CONTROLLERS
// ==========================================
function initNavigation() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  
  // View switches
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = item.getAttribute("data-view");
      
      // Update active nav item
      document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      
      switchView(targetView);
      
      // Close mobile menu if open
      sidebar.classList.remove("open");
      backdrop.classList.remove("active");
    });
  });

  // Mobile menu toggle
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    backdrop.classList.add("active");
  });

  backdrop.addEventListener("click", () => {
    sidebar.classList.remove("open");
    backdrop.classList.remove("active");
  });
}

function switchView(viewName) {
  state.currentView = viewName;
  
  // Hide all sections
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.add("hidden");
  });
  
  // Show target section
  const activeSec = document.getElementById(`view-${viewName}`);
  if (activeSec) {
    activeSec.classList.remove("hidden");
  }

  // Update Page Title
  const titleDisplay = document.getElementById("page-title-display");
  const navItem = document.querySelector(`.nav-item[data-view="${viewName}"] span`);
  if (titleDisplay && navItem) {
    titleDisplay.textContent = navItem.textContent;
  }

  // Trigger view specific loader
  if (viewName === "leaderboards") {
    loadLeaderboard();
  } else if (viewName === "items") {
    loadItemsView();
  } else if (viewName === "locations") {
    loadLocationsView();
  } else if (viewName === "calculators") {
    ensureTablesLoaded();
  }
}

// ==========================================
// API HELPER FUNCTIONS
// ==========================================
async function fetchAPI(endpoint, params = {}) {
  const url = new URL(API_BASE + endpoint);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      url.searchParams.append(key, params[key]);
    }
  });

  // Add cache buster to force proxies to bypass their caches and get live data
  url.searchParams.append("_", Date.now().toString());

  const fetchWithTimeout = async (targetUrl, opts = {}) => {
    console.log(`[RucoyNexus v2.0.8] Intentando fetch a: ${targetUrl}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(targetUrl, { signal: controller.signal, ...opts });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      try {
        const parsed = JSON.parse(text);
        console.log(`[RucoyNexus v2.0.8] Respuesta parseada de ${endpoint}:`, parsed);
        return parsed;
      } catch {
        console.log(`[RucoyNexus v2.0.8] Respuesta texto de ${endpoint}:`, text);
        return text;
      }
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  // 1. Try direct call first (works if API has CORS open)
  try {
    return await fetchWithTimeout(url.toString());
  } catch (directErr) {
    console.warn(`Direct API call failed [${endpoint}], trying proxies...`, directErr.message);
  }

  // 2. Proxy fallback chain
  const proxies = [
    `https://corsproxy.io/?${encodeURIComponent(url.toString())}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url.toString())}`,
    `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url.toString())}`
  ];

  for (const proxy of proxies) {
    try {
      return await fetchWithTimeout(proxy);
    } catch (err) {
      console.warn(`Proxy failed [${proxy.split('?')[0]}]:`, err.message);
    }
  }

  console.error(`All fetch attempts failed for API [${endpoint}]`);
  return null;
}

// Format numbers elegantly (e.g. 1000000 -> 1,000,000)
function formatNum(num) {
  if (num === null || num === undefined) return "-";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format date nicely
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Helpers for Client-Side Calculators
let loadingPromise = null;
async function ensureTablesLoaded() {
  if (state.skillsList.length > 0 && state.experiencesList.length > 0 && state.monstersList.length > 0) {
    return;
  }

  // Defer heavy mappings to a setTimeout to keep page load completely instant
  return new Promise((resolve) => {
    setTimeout(async () => {
      // Try loading from static embedded tables first (instant, bypasses CORS, works offline)
      if (typeof STATIC_SKILLS_DATA !== "undefined" && typeof STATIC_EXPERIENCES_DATA !== "undefined") {
        if (state.skillsList.length === 0) {
          let sum = 0;
          state.skillsList = STATIC_SKILLS_DATA.map(item => {
            const stat = item[0];
            const ticks = item[1];
            const currentTotal = sum;
            sum += ticks;
            return {
              stat: stat,
              ticks: ticks,
              totalTicks: currentTotal
            };
          });
        }
        if (state.experiencesList.length === 0) {
          state.experiencesList = STATIC_EXPERIENCES_DATA.map(item => {
            return {
              level: item[0],
              exp: item[1],
              expNeeded: item[2],
              hitPoints: item[3],
              manaPoints: item[4],
              speed: item[5]
            };
          });
        }
        if (state.monstersList.length === 0 && typeof STATIC_MONSTERS_DATA !== "undefined") {
          state.monstersList = STATIC_MONSTERS_DATA;
        }

        // Initialize selectors dynamically
        populateMonsterSelectors();
        resolve();
        return;
      }

      // Fallback to API if static tables are missing (e.g. if script failed to load or wasn't linked)
      if (loadingPromise) {
        return loadingPromise;
      }
      
      loadingPromise = (async () => {
        try {
          if (state.skillsList.length === 0) {
            const res = await fetchAPI("calculator/skills");
            const data = res && res.data ? res.data : res;
            if (data && data.length > 0) {
              let sum = 0;
              state.skillsList = data.map(item => {
                const currentTotal = sum;
                sum += item.ticks;
                return {
                  stat: item.stat,
                  ticks: item.ticks,
                  totalTicks: currentTotal
                };
              });
            }
          }
          if (state.experiencesList.length === 0) {
            const res = await fetchAPI("calculator/experiences");
            const data = res && res.data ? res.data : res;
            if (data && data.length > 0) {
              state.experiencesList = data;
            }
          }
          
          populateMonsterSelectors();
        } catch (e) {
          console.error("Error loading calculator tables via API:", e);
        } finally {
          loadingPromise = null;
        }
      })();
      await loadingPromise;
      resolve();
    }, 50);
  });
}

function populateMonsterSelectors() {
  if (state.monstersList.length > 0) {
    const select1 = document.getElementById("mcalc-monster");
    const select2 = document.getElementById("mcalc-monster-2");
    const select3 = document.getElementById("ideal-monster");
    
    if (select1 && select1.children.length === 0) {
      select1.innerHTML = "";
      state.monstersList.forEach(m => {
        select1.innerHTML += `<option value="${m.name}">${m.name} (HP: ${m.hp})</option>`;
      });
    }
    if (select2 && select2.children.length === 0) {
      select2.innerHTML = "";
      state.monstersList.forEach(m => {
        select2.innerHTML += `<option value="${m.name}">${m.name} (HP: ${m.hp})</option>`;
      });
    }
    if (select3 && select3.children.length === 0) {
      select3.innerHTML = "";
      state.monstersList.forEach(m => {
        select3.innerHTML += `<option value="${m.name}">${m.name} (HP: ${m.hp})</option>`;
      });
    }
  }
}

function getWholeDaysDifference(dateStr) {
  if (!dateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const parts = dateStr.split("-");
  const target = new Date(parts[0], parts[1] - 1, parts[2]);
  target.setHours(0, 0, 0, 0);
  
  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function secondsToTimeStr(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) {
    return `${h} hours ${m} minutes`;
  } else {
    return `${m} minutes`;
  }
}

function formatDateObj(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}



// ==========================================
// LEADERBOARDS SECTION
// ==========================================
function initLeaderboardFilters() {
  // Leaderboard section removed — no-op
}

async function fetchOfficialHighscores(type) {
  let category = "experience";
  if (type.includes("melee")) category = "melee";
  else if (type.includes("distance")) category = "distance";
  else if (type.includes("magic")) category = "magic";
  else if (type.includes("defense")) category = "defense";

  const url = `https://www.rucoyonline.com/highscores/${category}`;
  const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`;
  
  try {
    const res = await fetch(proxyUrl);
    if (!res.ok) return null;
    const htmlText = await res.text();
    
    const tbodyStart = htmlText.indexOf('<tbody>');
    const tbodyEnd = htmlText.indexOf('</tbody>');
    if (tbodyStart === -1 || tbodyEnd === -1) return null;
    
    const tbody = htmlText.slice(tbodyStart, tbodyEnd);
    const trs = tbody.split(/<\/tr>/i);
    const list = [];
    
    for (let tr of trs) {
      if (!tr.includes('<tr') && !tr.includes('<td')) continue;
      
      const tdRegex = /<td>([\s\S]*?)<\/td>/gi;
      const tds = [];
      let match;
      while (match = tdRegex.exec(tr)) {
        tds.push(match[1].trim());
      }
      
      if (tds.length >= 3) {
        const rank = parseInt(tds[0].replace(/<[^>]+>/g, "").trim()) || 0;
        const nameHtml = tds[1];
        const nameMatch = nameHtml.match(/<a[^>]*>([^<]+)<\/a>/i);
        if (nameMatch) {
          const name = nameMatch[1].trim();
          
          if (tds.length === 4) {
            const level = parseInt(tds[2].replace(/<[^>]+>/g, "").trim()) || 0;
            const exp = parseInt(tds[3].replace(/<[^>]+>/g, "").replace(/,/g, "").trim()) || 0;
            list.push({
              position: rank,
              name: name,
              level: level,
              gainExperience: exp,
              guildName: "-"
            });
          } else {
            const skill = parseInt(tds[2].replace(/<[^>]+>/g, "").trim()) || 0;
            list.push({
              position: rank,
              name: name,
              level: skill,
              gainExperience: 0,
              guildName: "-"
            });
          }
        }
      }
    }
    return { data: list, count: list.length };
  } catch (err) {
    console.error("Failed fetching official highscores:", err);
    return null;
  }
}

async function loadLeaderboard() {
  const overlay = document.getElementById("lb-loading-overlay");
  overlay.classList.add("active");

  const headersTr = document.getElementById("leaderboard-headers");
  const tbody = document.getElementById("leaderboard-tbody");
  
  let endpoint = "";
  const params = {
    PlayerName: state.leaderboard.search,
    pageIndex: state.leaderboard.pageIndex,
    pageSize: state.leaderboard.pageSize,
    direction: 1 // default descending
  };

  if (state.leaderboard.minLevel) params.fromLevel = state.leaderboard.minLevel;
  if (state.leaderboard.maxLevel) params.toLevel = state.leaderboard.maxLevel;

  const isSkill = state.leaderboard.type.startsWith("skill/");
  
  if (state.leaderboard.type === "leaderboard") {
    // Daily/Weekly/Monthly Experience leaderboard
    endpoint = "leaderboard";
    params.previousDays = state.leaderboard.days;
    params.sort = "Experience";
  } else if (isSkill) {
    // Skill leaderboard
    endpoint = "leaderboard/skill";
    params.skill = state.leaderboard.type.split("/")[1]; // melee, distance, magic, defense
    params.previousDays = state.leaderboard.days;
  } else {
    // Records: exp-records, exp-monthly-records, worst-exp
    endpoint = state.leaderboard.type;
    params.sort = "GainExperience";
  }

  let response = await fetchAPI(endpoint, params);
  let isFallback = false;
  const banner = document.getElementById("leaderboard-fallback-banner");
  
  if (!response || !response.data || response.data.length === 0) {
    response = await fetchOfficialHighscores(state.leaderboard.type);
    if (response && response.data) {
      isFallback = true;
      if (banner) banner.classList.remove("hidden");
    }
  } else {
    if (banner) banner.classList.add("hidden");
  }

  overlay.classList.remove("active");

  if (!response || !response.data) {
    if (banner) banner.classList.add("hidden");
    tbody.innerHTML = `<tr><td colspan="10" class="text-center color-muted">No se encontraron resultados o error de conexión.</td></tr>`;
    updatePagination(0);
    return;
  }

  let rawData = response.data;
  let count = response.count;

  if (isFallback) {
    // 1. Filter by search query locally
    if (state.leaderboard.search) {
      const searchVal = state.leaderboard.search.toLowerCase();
      rawData = rawData.filter(p => p.name.toLowerCase().includes(searchVal));
      count = rawData.length;
    }
    // 2. Filter by level range locally
    if (state.leaderboard.minLevel || state.leaderboard.maxLevel) {
      const min = parseInt(state.leaderboard.minLevel) || 0;
      const max = parseInt(state.leaderboard.maxLevel) || 9999;
      rawData = rawData.filter(p => p.level >= min && p.level <= max);
      count = rawData.length;
    }
    // 3. Paginate locally
    const startIdx = (state.leaderboard.pageIndex - 1) * state.leaderboard.pageSize;
    const endIdx = startIdx + state.leaderboard.pageSize;
    rawData = rawData.slice(startIdx, endIdx);
  }

  // Setup headers dynamically
  if (state.leaderboard.type === "leaderboard") {
    headersTr.innerHTML = `
      <th>Rango</th>
      <th>Jugador</th>
      <th>Nivel Base</th>
      <th>Exp Ganada</th>
      <th>Clan</th>
    `;
  } else if (isSkill) {
    headersTr.innerHTML = `
      <th>Rango</th>
      <th>Jugador</th>
      <th>Nivel Habilidad</th>
      <th>Exp Ganada</th>
      <th>Fecha Registro</th>
    `;
  } else {
    headersTr.innerHTML = `
      <th>Rango</th>
      <th>Jugador</th>
      <th>Nivel</th>
      <th>Exp Ganada</th>
      <th>Racha / Fecha</th>
      <th>Clan</th>
    `;
  }

  // Setup tbody rows
  tbody.innerHTML = "";
  const data = rawData;
  
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center color-muted">No hay registros para mostrar.</td></tr>`;
  }

  data.forEach((p, index) => {
    const position = p.position || ((state.leaderboard.pageIndex - 1) * state.leaderboard.pageSize + index + 1);
    const pName = p.name || (p.player ? p.player.name : "-");
    const guild = p.guildName || (p.player ? p.player.guildName : "-");
    const lvl = p.level || p.mainLevel || "-";
    const gainXp = p.gainExperience || p.recordExpDaily || "-";
    const extraCol = p.atDay ? formatDate(p.atDay) : (p.born || "-");

    tbody.innerHTML += `
      <tr>
        <td><span class="position-badge">${position}</span></td>
        <td>
          <a href="#" class="player-name-link" onclick="viewPlayerProfile('${pName}'); return false;">
            <i class="fa-solid fa-user color-primary" style="font-size: 0.8rem;"></i> ${pName}
          </a>
        </td>
        <td style="font-weight: 600;">${lvl}</td>
        <td class="${gainXp > 0 ? 'text-success' : 'color-muted'}">${gainXp > 0 ? '+' : ''}${formatNum(gainXp)}</td>
        <td>${extraCol}</td>
        <td><span class="badge ${guild !== '-' ? 'badge-info' : ''}">${guild}</span></td>
      </tr>
    `;
  });

  updatePagination(count);
}

function updatePagination(totalCount) {
  const prevBtn = document.getElementById("lb-prev-btn");
  const nextBtn = document.getElementById("lb-next-btn");
  const infoEl = document.getElementById("lb-pagination-info");
  const countBadge = document.getElementById("lb-records-count");

  countBadge.textContent = `${formatNum(totalCount)} Jugadores`;

  const totalPages = Math.ceil(totalCount / state.leaderboard.pageSize) || 1;
  const startRow = totalCount === 0 ? 0 : (state.leaderboard.pageIndex - 1) * state.leaderboard.pageSize + 1;
  const endRow = Math.min(state.leaderboard.pageIndex * state.leaderboard.pageSize, totalCount);

  infoEl.textContent = `Página ${state.leaderboard.pageIndex} de ${totalPages} (Mostrando ${startRow}-${endRow} de ${formatNum(totalCount)})`;

  prevBtn.disabled = state.leaderboard.pageIndex === 1;
  nextBtn.disabled = state.leaderboard.pageIndex >= totalPages;
}

// ==========================================
// PLAYER PROFILE VIEWS
// ==========================================
function initGlobalSearch() {
  const searchInput = document.getElementById("global-player-search");
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const pName = searchInput.value.trim();
      if (pName) {
        viewPlayerProfile(pName);
        searchInput.value = "";
      }
    }
  });
}

async function viewPlayerProfile(playerName) {
  switchView("player-details");
  
  // Show a loading/reset state
  document.getElementById("player-card-name").textContent = playerName;
  document.getElementById("player-card-avatar").textContent = playerName.substring(0, 2).toUpperCase();
  document.getElementById("player-card-status").className = "badge";
  document.getElementById("player-card-status").textContent = "Cargando...";
  
  const currentDetails = await fetchAPI("player/current-details", { PlayerName: playerName });
  const details = await fetchAPI("player/details", { PlayerName: playerName });
  const progress = await fetchAPI("player/progress", { PlayerName: playerName });
  const names = await fetchAPI("player/previous-names", { playerName: playerName });
  
  if (!currentDetails || !currentDetails.playerMainInformation) {
    document.getElementById("player-card-status").className = "badge badge-danger";
    document.getElementById("player-card-status").textContent = "No encontrado";
    return;
  }

  // 1. Populate Main Info
  const mainInfo = currentDetails.playerMainInformation;
  document.getElementById("player-card-name").textContent = mainInfo.playerName;
  document.getElementById("player-card-avatar").textContent = mainInfo.playerName.substring(0, 2).toUpperCase();
  
  const onlineStatus = mainInfo.lastOnline === "currently online";
  const statusBadge = document.getElementById("player-card-status");
  statusBadge.className = `badge ${onlineStatus ? 'badge-success' : 'badge-danger'}`;
  statusBadge.textContent = onlineStatus ? "Online" : mainInfo.lastOnline || "Offline";
  
  // Avatar glow class
  const avatarEl = document.getElementById("player-card-avatar");
  if (onlineStatus) avatarEl.classList.add("online");
  else avatarEl.classList.remove("online");

  const guildEl = document.getElementById("player-card-guild");
  if (mainInfo.guild && mainInfo.guild !== "-") {
    guildEl.innerHTML = `<span style="color: #fbbf24; cursor: pointer; text-decoration: underline; font-weight: 600;" onclick="window.viewGuildProfile('${mainInfo.guild.replace(/'/g, "\\'")}')">${mainInfo.guild}</span>`;
  } else {
    guildEl.textContent = "-";
  }
  document.getElementById("player-card-level").textContent = mainInfo.currentLevel;
  document.getElementById("player-card-total-xp").textContent = formatNum(mainInfo.currentExp);
  
  if (mainInfo.experienceLeft && mainInfo.experienceNeed) {
    document.getElementById("player-card-xp-next-container").style.display = "flex";
    document.getElementById("player-card-xp-next").textContent = `${formatNum(mainInfo.experienceLeft)} / ${formatNum(mainInfo.experienceNeed)}`;
  } else {
    document.getElementById("player-card-xp-next-container").style.display = "none";
  }
  
  document.getElementById("player-card-rank").textContent = mainInfo.currentRank ? `#${formatNum(mainInfo.currentRank)}` : "-";

  // 2. Populate stats from details
  if (details && details.playerStats) {
    const stats = details.playerStats;
    document.getElementById("player-card-hp").textContent = formatNum(stats.hitPoints);
    document.getElementById("player-card-mp").textContent = formatNum(stats.manaPoints);
    document.getElementById("player-card-speed").textContent = stats.speed;
    document.getElementById("player-card-gold").textContent = stats.bsCash ? `${formatNum(stats.bsCash)} gold` : "-";
  } else {
    // Fill in default placeholders
    document.getElementById("player-card-hp").textContent = "-";
    document.getElementById("player-card-mp").textContent = "-";
    document.getElementById("player-card-speed").textContent = "-";
    document.getElementById("player-card-gold").textContent = "-";
  }

  // 3. Name history
  if (names && names.length > 0) {
    document.getElementById("player-card-prev-names").textContent = names.join(", ");
  } else {
    document.getElementById("player-card-prev-names").textContent = "Ninguno";
  }

  // 4. Skills Information
  const skills = currentDetails.playerSkillInformation;
  const renderSkill = (name, currentLvl, ticks, time, rank) => {
    document.getElementById(`player-skill-${name}`).textContent = currentLvl || "-";
    document.getElementById(`player-skill-${name}-ticks`).textContent = ticks ? formatNum(ticks) : "-";
    document.getElementById(`player-skill-${name}-time`).textContent = time || "-";
    document.getElementById(`player-skill-${name}-rank`).textContent = rank ? `#${formatNum(rank)}` : "-";
    
    // Skill progress bar percentage estimate
    const progressEl = document.getElementById(`player-skill-${name}-progress`);
    if (ticks && ticks > 0) {
      // Calculate a rough percentage based on ticks required for next level (skills are usually logarithmic)
      // For simplicity we just slide it to an active look, or calculate progress.
      // If we don't have currentExp, we show a default active state
      progressEl.style.width = "40%";
    } else {
      progressEl.style.width = "0%";
    }
  };

  if (skills) {
    renderSkill("melee", skills.currentLevelMelee, skills.takeTickMelee, skills.takeTimeMelee, skills.rankMelee);
    renderSkill("dist", skills.currentLevelDist, skills.takeTickDist, skills.takeTimeDist, skills.rankDist);
    renderSkill("magic", skills.currentLevelMagic, skills.takeTickMagic, skills.takeTimeMagic, skills.rankMagic);
    renderSkill("defense", skills.currentLevelDefense, skills.takeTickDefense, skills.takeTimeDefense, skills.rankDefense);
  }

  // 5. Progression History Table & Chart
  const tableTbody = document.getElementById("player-history-tbody");
  tableTbody.innerHTML = "";
  
  if (progress && progress.data && progress.data.length > 0) {
    progress.data.forEach(row => {
      tableTbody.innerHTML += `
        <tr>
          <td>${formatDate(row.atDay)}</td>
          <td style="font-weight: 600;">${row.mainLevel} ${row.gainLevel ? `<span class="text-success">(+${row.gainLevel})</span>` : ''}</td>
          <td class="text-success">+${formatNum(row.gainExp)}</td>
          <td>${row.meleeLevel || '-'} ${row.gainMelee ? `<span class="text-success">(+${row.gainMelee})</span>` : ''}</td>
          <td>${row.distLevel || '-'} ${row.gainDist ? `<span class="text-success">(+${row.gainDist})</span>` : ''}</td>
          <td>${row.defenseLevel || '-'} ${row.gainDefense ? `<span class="text-success">(+${row.gainDefense})</span>` : ''}</td>
        </tr>
      `;
    });

    // Render chart
    renderPlayerChart(progress.data);
  } else {
    tableTbody.innerHTML = `<tr><td colspan="6" class="text-center color-muted">No hay historial registrado para este jugador.</td></tr>`;
    if (state.playerChart) {
      state.playerChart.destroy();
      state.playerChart = null;
    }
  }
}

function renderPlayerChart(historyData) {
  // Extract dates and levels
  const sorted = [...historyData].reverse(); // oldest first
  const categories = sorted.map(row => formatDate(row.atDay));
  const levels = sorted.map(row => row.mainLevel);
  const melee = sorted.map(row => row.meleeLevel || 0);
  const dist = sorted.map(row => row.distLevel || 0);
  const def = sorted.map(row => row.defenseLevel || 0);

  const options = {
    series: [{
      name: 'Nivel Base',
      data: levels
    }],
    chart: {
      height: 320,
      type: 'area',
      background: 'transparent',
      foreColor: '#9ca3af',
      toolbar: { show: false }
    },
    colors: ['#10b981'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    xaxis: {
      categories: categories,
      labels: { rotate: -45, style: { fontSize: '10px' } }
    },
    yaxis: {
      labels: {
        formatter: function (val) { return Math.round(val); }
      }
    },
    tooltip: { theme: 'dark' }
  };

  const chartEl = document.getElementById("player-progress-chart");
  chartEl.innerHTML = "";
  
  if (state.playerChart) {
    state.playerChart.destroy();
  }
  
  state.playerChart = new ApexCharts(chartEl, options);
  state.playerChart.render();

  // Handle Chart sub-tabs
  const lvlBtn = document.getElementById("player-chart-lvl-btn");
  const skillsBtn = document.getElementById("player-chart-skills-btn");
  
  lvlBtn.onclick = () => {
    lvlBtn.classList.add("active");
    skillsBtn.classList.remove("active");
    state.playerChart.updateOptions({
      series: [{ name: 'Nivel Base', data: levels }],
      colors: ['#10b981']
    });
  };
  
  skillsBtn.onclick = () => {
    skillsBtn.classList.add("active");
    lvlBtn.classList.remove("active");
    state.playerChart.updateOptions({
      series: [
        { name: 'Melee', data: melee },
        { name: 'Distance', data: dist },
        { name: 'Defense', data: def }
      ],
      colors: ['#ef4444', '#10b981', '#fbbf24']
    });
  };
}

// ==========================================
// CALCULATORS SECTION
// ==========================================
async function initCalculators() {
  // Tabs switcher
  document.querySelectorAll("#view-calculators .tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#view-calculators .tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll("#view-calculators .tab-content").forEach(c => c.classList.remove("active"));
      
      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      document.getElementById(targetTab).classList.add("active");
    });
  });

  // Handle quick picks click to set tickrate
  document.querySelectorAll(".quick-pick").forEach(pick => {
    pick.addEventListener("click", () => {
      const val = pick.getAttribute("data-val");
      const input = pick.closest(".form-group").querySelector("input");
      if (input) {
        input.value = val;
      }
    });
  });

  // Set default dates for planners (minimum tomorrow, max 5 years forward)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 1826); // ~5 years
  const maxDateStr = maxDate.toISOString().split("T")[0];

  // Set all date inputs
  const dateInputIds = ["ecalc-date", "ecalc-date-4", "scalc-date-2", "scalc-date-4"];
  dateInputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.value = tomorrowStr;
      el.min = tomorrowStr;
      el.max = maxDateStr;
    }
  });

  // ==========================================
  // MONSTERS CALCULATORS
  // ==========================================
  setupFormSubmit("calc-monsters-form-1", "mcalc-result-1", "mcalc-result-val-1", async () => {
    await ensureTablesLoaded();
    const from = parseInt(document.getElementById("mcalc-from").value) || 1;
    const to = parseInt(document.getElementById("mcalc-to").value) || 2;
    const monsterName = document.getElementById("mcalc-monster").value;
    const part = parseInt(document.getElementById("mcalc-part").value) || 1;

    const fromItem = state.experiencesList.find(x => x.level === from);
    const toItem = state.experiencesList.find(x => x.level === to);
    const monster = state.monstersList.find(x => x.name === monsterName);

    if (!fromItem || !toItem) return "Level out of bounds";
    if (!monster) return "Monster not found";

    const expNeeded = Math.max(0, toItem.exp - fromItem.exp);
    if (expNeeded === 0) return "Kill: 0";

    let expPerMonster = monster.expSolo;
    if (part === 2) expPerMonster = monster.expTwo;
    else if (part === 3) expPerMonster = monster.expThree;
    else if (part === 4) expPerMonster = monster.expFour;
    else if (part >= 5) expPerMonster = monster.expFive;

    const killCount = Math.ceil(expNeeded / expPerMonster);
    return `Kill: ${formatNum(killCount)}`;
  });

  setupFormSubmit("calc-monsters-form-2", "mcalc-result-2", "mcalc-result-val-2", async () => {
    await ensureTablesLoaded();
    const from = parseInt(document.getElementById("mcalc-from-2").value) || 1;
    const amount = parseInt(document.getElementById("mcalc-amount").value) || 1;
    const monsterName = document.getElementById("mcalc-monster-2").value;
    const part = parseInt(document.getElementById("mcalc-part-2").value) || 1;

    const fromItem = state.experiencesList.find(x => x.level === from);
    const monster = state.monstersList.find(x => x.name === monsterName);

    if (!fromItem) return "Level out of bounds";
    if (!monster) return "Monster not found";

    let expPerMonster = monster.expSolo;
    if (part === 2) expPerMonster = monster.expTwo;
    else if (part === 3) expPerMonster = monster.expThree;
    else if (part === 4) expPerMonster = monster.expFour;
    else if (part >= 5) expPerMonster = monster.expFive;

    const expGained = amount * expPerMonster;
    const finalExp = fromItem.exp + expGained;

    const targetItem = state.experiencesList.filter(x => x.exp <= finalExp).pop();
    const resultingLevel = targetItem ? targetItem.level : 1;
    return `Finish level: ${formatNum(resultingLevel)}`;
  });

  // ==========================================
  // EXPERIENCE CALCULATORS
  // ==========================================
  setupFormSubmit("calc-exp-form-1", "ecalc-result-1", "ecalc-result-val-1", async () => {
    await ensureTablesLoaded();
    const fromVal = parseFloat(document.getElementById("ecalc-from").value) || 1;
    const toLvl = parseInt(document.getElementById("ecalc-to").value) || 2;

    let currentExp = fromVal;
    if (fromVal < 100000) {
      const item = state.experiencesList.find(x => x.level === Math.round(fromVal));
      currentExp = item ? item.exp : 1;
    }

    const targetItem = state.experiencesList.find(x => x.level === toLvl);
    if (!targetItem) return "Level out of bounds";

    const diffExp = targetItem.exp - currentExp;
    return `Need exp: ${formatNum(Math.max(0, diffExp))}`;
  });

  setupFormSubmit("calc-exp-form-2", "ecalc-result-2", "ecalc-result-val-2", async () => {
    await ensureTablesLoaded();
    const fromLvl = parseInt(document.getElementById("ecalc-from-2").value) || 1;
    const daily = parseFloat(document.getElementById("ecalc-daily").value) || 1;
    const dateStr = document.getElementById("ecalc-date").value;

    let dailyVal = daily;
    if (dailyVal > 2000) dailyVal = 2000;
    
    const fromItem = state.experiencesList.find(x => x.level === fromLvl);
    if (!fromItem) return "Level out of bounds";

    const days = getWholeDaysDifference(dateStr);
    const expGained = days * dailyVal * 1000000;
    const finalExp = fromItem.exp + expGained;

    const targetItem = state.experiencesList.filter(x => x.exp <= finalExp).pop();
    const resultingLevel = targetItem ? targetItem.level : 1;
    return `Level: ${formatNum(resultingLevel)}`;
  });

  setupFormSubmit("calc-exp-form-3", "ecalc-result-3", "ecalc-result-val-3", async () => {
    await ensureTablesLoaded();
    const fromLvl = parseInt(document.getElementById("ecalc-from-3").value) || 1;
    const daily = parseFloat(document.getElementById("ecalc-daily-3").value) || 1;
    const toLvl = parseInt(document.getElementById("ecalc-to-3").value) || 2;

    let dailyVal = daily;
    if (dailyVal > 2000) dailyVal = 2000;

    const fromItem = state.experiencesList.find(x => x.level === fromLvl);
    const toItem = state.experiencesList.find(x => x.level === toLvl);

    if (!fromItem || !toItem) return "Level out of bounds";

    const diffExp = toItem.exp - fromItem.exp;
    if (diffExp <= 0) return `Date: ${formatDateObj(new Date())}`;

    const daysNeeded = diffExp / (dailyVal * 1000000);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + Math.ceil(daysNeeded));

    return `Date: ${formatDateObj(targetDate)}`;
  });

  setupFormSubmit("calc-exp-form-4", "ecalc-result-4", "ecalc-result-val-4", async () => {
    await ensureTablesLoaded();
    const fromVal = parseFloat(document.getElementById("ecalc-from-4").value) || 1;
    const toLvl = parseInt(document.getElementById("ecalc-to-4").value) || 2;
    const dateStr = document.getElementById("ecalc-date-4").value;

    let currentExp = fromVal;
    if (fromVal < 100000) {
      const item = state.experiencesList.find(x => x.level === Math.round(fromVal));
      currentExp = item ? item.exp : 1;
    }

    const targetItem = state.experiencesList.find(x => x.level === toLvl);
    if (!targetItem) return "Level out of bounds";

    const diffExp = targetItem.exp - currentExp;
    const days = getWholeDaysDifference(dateStr);

    if (diffExp <= 0) return "Daily exp: 0";
    if (days <= 0) return "Daily exp: infinite";

    const dailyExpNeeded = Math.round(diffExp / days);
    return `Daily exp: ${formatNum(dailyExpNeeded)}`;
  });

  // ==========================================
  // SKILLS CALCULATORS
  // ==========================================

  // SKILL CALC 0: Tickrate per hour (local calculation - no API)
  setupFormSubmit("calc-skills-form-tickrate", "scalc-result-tickrate", "scalc-result-val-tickrate", async () => {
    let regStam = parseFloat(document.getElementById("scalc-regstam").value) || 0;
    let grStam = parseFloat(document.getElementById("scalc-grstam").value) || 0;
    let bonStam = parseFloat(document.getElementById("scalc-bonstam").value) || 0;
    let tickrate = parseFloat(document.getElementById("scalc-tickrate-input").value) || 3600;

    // Clamp values
    if (regStam > 16) regStam = 16;
    if (regStam < 0) regStam = 0;
    if (grStam > 120) grStam = 120;
    if (grStam < 0) grStam = 0;
    if (bonStam > 2) bonStam = 2;
    if (bonStam < 0) bonStam = 0;
    if (tickrate > 14400) tickrate = 14400;
    if (tickrate < 2500) tickrate = 2500;

    // Validate: green stamina in minutes can't exceed reg stamina in hours * 60
    if (grStam / 60 > regStam) grStam = regStam * 60;
    // Bonus stamina can't exceed reg stamina
    if (bonStam > regStam) bonStam = regStam;

    // Calculate offline ticks
    let offlineFactor = 0;
    if (regStam <= 6) {
      offlineFactor = 3 * regStam;
    } else {
      offlineFactor = 24 - regStam;
    }

    let regTicks = regStam * tickrate;
    let greenTicks = 0.5 * grStam * (tickrate / 60);
    let bonusTicks = bonStam * tickrate;
    let offlineTicks = 600 * offlineFactor;

    let tickratePerH = 0;
    if (regStam > 0) {
      tickratePerH = (regTicks + greenTicks + bonusTicks + offlineTicks) / regStam;
      tickratePerH = Math.round(tickratePerH);
    }

    return `Tickrate / h: ${formatNum(tickratePerH)}`;
  });

  // SKILL CALC 1: Time from skill to skill
  setupFormSubmit("calc-skills-form-1", "scalc-result-1", "scalc-result-val-1", async () => {
    await ensureTablesLoaded();
    let from = parseInt(document.getElementById("scalc-from").value) || 55;
    let to = parseInt(document.getElementById("scalc-to").value) || 110;
    let tickrate = parseInt(document.getElementById("scalc-tickrate-1").value) || 3600;
    
    // Clamp
    if (tickrate > 50400) tickrate = 50400;
    if (tickrate < 200) tickrate = 200;
    if (from < 55) from = 55;
    if (to < 56) to = 56;

    const fromItem = state.skillsList.find(x => x.stat === from);
    const toItem = state.skillsList.find(x => x.stat === to);
    if (!fromItem || !toItem) return "Level out of bounds";
    
    const diffTicks = toItem.totalTicks - fromItem.totalTicks;
    if (diffTicks <= 0) return "Take time: 0 minutes";
    
    const totalSeconds = Math.round((diffTicks / tickrate) * 3600);
    return `Take time: ${secondsToTimeStr(totalSeconds)}`;
  });

  // SKILL CALC 2: Skill level at date
  setupFormSubmit("calc-skills-form-2", "scalc-result-2", "scalc-result-val-2", async () => {
    await ensureTablesLoaded();
    let from = parseInt(document.getElementById("scalc-from-2").value) || 55;
    let tickrate = parseInt(document.getElementById("scalc-tickrate-2").value) || 3600;
    let hours = parseInt(document.getElementById("scalc-hours-2").value) || 2;
    const dateStr = document.getElementById("scalc-date-2").value;

    // Clamp
    if (tickrate > 50400) tickrate = 50400;
    if (tickrate < 200) tickrate = 200;
    if (hours > 24) hours = 24;
    if (hours < 1) hours = 1;
    if (from < 55) from = 55;

    const fromItem = state.skillsList.find(x => x.stat === from);
    if (!fromItem) return "Level out of bounds";

    const days = getWholeDaysDifference(dateStr);
    if (days <= 0) return `Level: ${from}`;

    const totalTicks = days * hours * tickrate;
    const targetTicks = fromItem.totalTicks + totalTicks;

    const targetItem = state.skillsList.filter(x => x.totalTicks <= targetTicks).pop();
    const level = targetItem ? targetItem.stat : 1000;
    return `Level: ${level}`;
  });

  // SKILL CALC 3: Date for skill level
  setupFormSubmit("calc-skills-form-3", "scalc-result-3", "scalc-result-val-3", async () => {
    await ensureTablesLoaded();
    let from = parseInt(document.getElementById("scalc-from-3").value) || 55;
    let tickrate = parseInt(document.getElementById("scalc-tickrate-3").value) || 3600;
    let hours = parseInt(document.getElementById("scalc-hours-3").value) || 2;
    let to = parseInt(document.getElementById("scalc-to-3").value) || 110;

    // Clamp
    if (tickrate > 50400) tickrate = 50400;
    if (tickrate < 200) tickrate = 200;
    if (hours > 24) hours = 24;
    if (hours < 1) hours = 1;
    if (from < 55) from = 55;
    if (to < 56) to = 56;

    const fromItem = state.skillsList.find(x => x.stat === from);
    const toItem = state.skillsList.find(x => x.stat === to);
    if (!fromItem || !toItem) return "Level out of bounds";

    const diffTicks = toItem.totalTicks - fromItem.totalTicks;
    if (diffTicks <= 0) return `Date: ${formatDateObj(new Date())}`;

    const hoursNeeded = diffTicks / tickrate;
    const daysNeeded = hoursNeeded / hours;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + Math.ceil(daysNeeded));
    return `Date: ${formatDateObj(targetDate)}`;
  });

  // SKILL CALC 4: Daily hour for skill
  setupFormSubmit("calc-skills-form-4", "scalc-result-4", "scalc-result-val-4", async () => {
    await ensureTablesLoaded();
    let from = parseInt(document.getElementById("scalc-from-4").value) || 55;
    let tickrate = parseInt(document.getElementById("scalc-tickrate-4").value) || 3600;
    let to = parseInt(document.getElementById("scalc-to-4").value) || 110;
    const dateStr = document.getElementById("scalc-date-4").value;

    // Clamp
    if (tickrate > 50400) tickrate = 50400;
    if (tickrate < 200) tickrate = 200;
    if (from < 55) from = 55;
    if (to < 56) to = 56;

    const fromItem = state.skillsList.find(x => x.stat === from);
    const toItem = state.skillsList.find(x => x.stat === to);
    if (!fromItem || !toItem) return "Level out of bounds";

    const diffTicks = toItem.totalTicks - fromItem.totalTicks;
    const days = getWholeDaysDifference(dateStr);

    if (diffTicks <= 0) return "Daily hour: 0 minutes";
    if (days <= 0) return "Daily hour: 24 hours (mission impossible)";

    const totalHoursNeeded = diffTicks / tickrate;
    const dailyHoursNeeded = totalHoursNeeded / days;

    const totalSeconds = Math.round(dailyHoursNeeded * 3600);
    let result = secondsToTimeStr(totalSeconds);

    if (dailyHoursNeeded > 20) {
      result += " (mission impossible)";
    }
    return `Daily hour: ${result}`;
  });

  }

// Format skill time from "H:mm:ss" or "D:HH:mm" format to readable string
function formatSkillTime(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return timeStr;
  const parts = timeStr.split(":");
  if (parts.length === 3) {
    // Could be D:HH:mm or H:mm:ss
    const first = parseInt(parts[0]) || 0;
    const second = parseInt(parts[1]) || 0;
    const third = parseInt(parts[2]) || 0;
    // If first number is large (days * 24 + hours), convert
    const totalHours = first * 24 + second;
    return `${totalHours} hours ${third} minutes`;
  } else if (parts.length === 2) {
    return `${parseInt(parts[0])} hours ${parseInt(parts[1])} minutes`;
  } else if (parts.length === 1) {
    return `${parseInt(parts[0])} minutes`;
  }
  return timeStr;
}

function setupFormSubmit(formId, resultBoxId, resultValId, calculateFn) {
  const form = document.getElementById(formId);
  const resultBox = document.getElementById(resultBoxId);
  const resultVal = document.getElementById(resultValId);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultBox.classList.add("hidden");
    
    const value = await calculateFn();
    if (value) {
      if (value.toString().includes("wrong") || value.toString().includes("Error")) {
        resultBox.className = "calc-result-box error";
        resultBox.querySelector("i").className = "fa-solid fa-circle-exclamation";
      } else {
        resultBox.className = "calc-result-box";
        resultBox.querySelector("i").className = "fa-solid fa-circle-check";
      }
      resultVal.textContent = value;
      resultBox.classList.remove("hidden");
    }
  });
}

// ==========================================
// GAME TABLES VIEW
// ==========================================
async function loadTablesView() {
  // Game Tables view was removed to optimize performance and prevent browser lag.
}

// ==========================================
// ITEMS DATABASE VIEW
// ==========================================
// Helper function to map monster/boss names to local assets
function getMonsterImg(mobName) {
  if (!mobName) return "rucoy2.ico";
  const name = mobName.toLowerCase();
  const BASE = "https://migueljeronimo.github.io/rucoydata/Rucoy_Monsters_Amplificados/";

  // === BOSSES - unique GIFs from official rucoydata ===
  if (name === "goblin lord") return BASE + "Goblin_Lord.gif";
  if (name === "kamon the cursed") return BASE + "Kamon_The_Cursed.gif";
  if (name === "slime lord") return BASE + "Slime_Lord.gif";
  if (name === "vampire king") return BASE + "Vampire_King.gif";
  if (name === "drow queen") return BASE + "Drow_Queen.gif";
  if (name === "general krinok") return BASE + "General_Krinok.gif";
  if (name === "goliath") return BASE + "Goliath.gif";
  if (name === "zarron bravehorn") return BASE + "Zarron_Bravehorn.gif";
  if (name === "cerberus") return BASE + "Cerberus.gif";
  // Event bosses
  if (name === "wicked pumpkin") return BASE + "Wicked_Pumpkin.gif";
  if (name === "la calaca") return BASE + "La_Calaca.gif";
  if (name === "haunted willow") return BASE + "Haunted_Willow.gif";
  if (name === "evil snowman") return BASE + "Evil_Snowman.gif";
  if (name === "evil santa") return BASE + "Evil_Santa.gif";
  // Event bosses not in rucoydata yet — use closest available
  if (name === "bonnie rabbit") return BASE + "Rat_2.gif";
  if (name === "clyde rabbit") return BASE + "Rat_2.gif";
  if (name.includes("drakon")) return BASE + "Dragon.gif";
  if (name === "rat king") return BASE + "Rat_1.gif";

  // === REGULAR TRAINING MOBS - local assets ===
  if (name.includes("rat")) return "assets/monsters/Movingrat.gif";
  if (name.includes("crow")) return BASE + "Crow.gif";
  if (name.includes("wolf")) return BASE + "Wolf.gif";
  if (name.includes("scorpion")) return BASE + "Scorpion.gif";
  if (name.includes("cobra")) return BASE + "Cobra.gif";
  if (name.includes("worm")) return BASE + "Worm.gif";
  if (name.includes("goblin")) return BASE + "Goblin.gif";
  if (name.includes("mummy")) return BASE + "Mummy.gif";
  if (name.includes("pharaoh")) return BASE + "Pharaoh.gif";
  if (name.includes("zombie")) return BASE + "Zombie.gif";
  if (name.includes("assassin") && name.includes("ninja")) return "assets/monsters/assasin_ninja.gif";
  if (name.includes("assassin") && name.includes("45")) return "assets/monsters/45assassin.gif";
  if (name.includes("assassin") && name.includes("50")) return "assets/monsters/Yellow_Assassin_Gif.gif";
  if (name.includes("skeleton archer")) return BASE + "Skeleton_Archer.gif";
  if (name.includes("skeleton warrior")) return BASE + "Skeleton_Warrior.gif";
  if (name.includes("skeleton")) return BASE + "Skeleton.gif";
  if (name.includes("vampire")) return BASE + "Vampire.gif";
  if (name.includes("red vampire")) return BASE + "Red_Vampire.gif";
  if (name.includes("drow ranger")) return BASE + "Drow_Ranger.gif";
  if (name.includes("drow mage")) return BASE + "Drow_Mage.gif";
  if (name.includes("drow assassin")) return BASE + "Drow_Assassin.gif";
  if (name.includes("drow sorceress")) return BASE + "Drow_Sorceress.gif";
  if (name.includes("drow fighter")) return BASE + "Drow_Fighter.gif";
  if (name.includes("lizard archer")) return BASE + "Lizard_Archer.gif";
  if (name.includes("lizard high shaman")) return BASE + "Lizard_High_Shaman.gif";
  if (name.includes("lizard shaman")) return BASE + "Lizard_Shaman.gif";
  if (name.includes("lizard warrior")) return BASE + "Lizard_Warrior.gif";
  if (name.includes("lizard captain")) return BASE + "Lizard_Captain.gif";
  if (name.includes("dead eyes")) return "assets/monsters/dead_eyes.gif";
  if (name.includes("djinn")) return "assets/monsters/djinn.gif";
  if (name.includes("gargoyle")) return BASE + "Gargoyle.gif";
  if (name.includes("dragon hatchling")) return BASE + "Dragon_Hatchling.gif";
  if (name.includes("dragon warden")) return BASE + "Dragon_Warden.gif";
  if (name.includes("ice dragon")) return BASE + "Ice_Dragon.gif";
  if (name.includes("dragon")) return BASE + "Dragon.gif";
  if (name.includes("minotaur") && name.includes("225")) return "assets/monsters/minotaur_225.gif";
  if (name.includes("minotaur") && name.includes("250")) return "assets/monsters/minotaur_250.gif";
  if (name.includes("minotaur") && name.includes("275")) return "assets/monsters/minotaur_275.gif";
  if (name.includes("ice elemental")) return BASE + "Ice_Elemental.gif";
  if (name.includes("yeti")) return BASE + "Yeti.gif";
  if (name.includes("lava golem") || name.includes("golem")) return BASE + "Lava_Golem.gif";
  if (name.includes("orthrus")) return BASE + "Orthrus.gif";
  if (name.includes("demon")) return BASE + "Demon.gif";
  
  // Default fallback icon
  return "rucoy2.ico";
}

async function loadItemsView() {
  const itemsTbody = document.getElementById("items-tbody");
  const bossItemsTbody = document.getElementById("boss-items-tbody");
  const qualityFilter = document.getElementById("item-filter-quality");
  const attrFilter = document.getElementById("item-filter-attribute");
  const searchFilter = document.getElementById("item-filter-search");
  const categoryFilter = document.getElementById("item-filter-category");
  const loadMoreBtn = document.getElementById("items-load-more-btn");

  let cachedRawItems = null;
  let allItems = [];
  let displayedCount = 0;
  const itemsPerPage = 40;

  const getQualityColor = (quality) => {
    switch (quality) {
      case "Mythic": return { color: "#c084fc", text: "Mítico", bg: "rgba(192, 132, 252, 0.15)", border: "#c084fc" };
      case "Legendary": return { color: "#fbbf24", text: "Legendario", bg: "rgba(251, 191, 36, 0.15)", border: "#fbbf24" };
      case "Ultra Rare": return { color: "#f472b6", text: "Ultra Raro", bg: "rgba(244, 114, 182, 0.15)", border: "#f472b6" };
      case "Green": return { color: "#4ade80", text: "Épico (Verde)", bg: "rgba(74, 222, 128, 0.15)", border: "#4ade80" };
      case "Blue":
      case "Rare": return { color: "#60a5fa", text: "Raro (Azul)", bg: "rgba(96, 165, 250, 0.15)", border: "#60a5fa" };
      case "CommonRed": return { color: "#f87171", text: "Común (Rojo)", bg: "rgba(248, 113, 113, 0.15)", border: "#f87171" };
      case "CommonOrange": return { color: "#fb923c", text: "Común (Naranja)", bg: "rgba(251, 146, 60, 0.15)", border: "#fb923c" };
      case "CommonYellow": return { color: "#fde047", text: "Común (Amarillo)", bg: "rgba(253, 224, 71, 0.15)", border: "#fde047" };
      case "Common":
      default: return { color: "#9ca3af", text: "Común (Gris)", bg: "rgba(156, 163, 175, 0.1)", border: "#9ca3af" };
    }
  };

  const renderMoreItems = () => {
    const nextBatch = allItems.slice(displayedCount, displayedCount + itemsPerPage);
    nextBatch.forEach(item => {
      const qStyle = getQualityColor(item.quality);
      
      let detailsHtml = "";
      const addDetailBadge = (label, val) => {
        if (!val) return "";
        let colorClass = "rgba(255,255,255,0.06)";
        if (label === "Attack") colorClass = "rgba(239, 68, 68, 0.15)";
        if (label === "Armor") colorClass = "rgba(59, 130, 246, 0.15)";
        if (label === "Level") colorClass = "rgba(16, 185, 129, 0.15)";
        return `<span style="display:inline-block; padding: 2px 6px; border-radius:4px; font-size:0.75rem; font-weight:600; background:${colorClass}; margin-right:4px; border:1px solid rgba(255,255,255,0.05);">${label}: ${val}</span>`;
      };

      detailsHtml += addDetailBadge("Level", item.levelReq);
      detailsHtml += addDetailBadge("Attack", item.attack);
      detailsHtml += addDetailBadge("Armor", item.armorVal);
      detailsHtml += addDetailBadge("Capacity", item.capacity);

      // Attributes details
      const attrBadges = [];
      if (item.meleeBuy) attrBadges.push(addDetailBadge("Melee", `+${item.meleeBuy}`));
      if (item.distanceBuy) attrBadges.push(addDetailBadge("Distance", `+${item.distanceBuy}`));
      if (item.magicBuy) attrBadges.push(addDetailBadge("Magic", `+${item.magicBuy}`));
      if (item.defenseBuy) attrBadges.push(addDetailBadge("Defense", `+${item.defenseBuy}`));
      if (item.speedBuy) attrBadges.push(addDetailBadge("Speed", `+${item.speedBuy}`));

      detailsHtml += attrBadges.join("");

      if (!detailsHtml) {
        detailsHtml = `<span style="color:var(--text-muted); font-size:0.8rem;">Sin atributos especiales</span>`;
      }

      itemsTbody.innerHTML += `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.02); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
          <td style="font-weight:600; color:${qStyle.color}; font-size: 0.9rem;">
            ${item.name}
          </td>
          <td style="font-size: 0.85rem; color: #cbd5e1;">${item.type}</td>
          <td>
            <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: ${qStyle.bg}; color: ${qStyle.color}; border: 1px solid ${qStyle.border};">
              ${qStyle.text}
            </span>
          </td>
          <td>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${detailsHtml}
            </div>
          </td>
        </tr>
      `;
    });
    displayedCount += nextBatch.length;
    
    if (displayedCount < allItems.length) {
      loadMoreBtn.style.display = "inline-block";
    } else {
      loadMoreBtn.style.display = "none";
    }
  };

  loadMoreBtn.onclick = renderMoreItems;

  const loadItems = async () => {
    // Show spinner in table
    itemsTbody.innerHTML = `<tr><td colspan="4" class="text-center color-muted"><i class="fa-solid fa-spinner fa-spin"></i> Filtrando y cargando objetos...</td></tr>`;
    loadMoreBtn.style.display = "none";
    
    // Fetch if not cached
    if (!cachedRawItems) {
      let apiData = await fetchAPI("Item/items");
      let raw = null;
      if (apiData && Array.isArray(apiData.items)) {
        raw = apiData.items;
      } else if (Array.isArray(apiData)) {
        raw = apiData;
      }
      
      if ((!raw || raw.length === 0) && typeof STATIC_ITEMS_DATA !== "undefined") {
        raw = STATIC_ITEMS_DATA;
      }
      cachedRawItems = raw || [];
    }

    // Apply client-side filters
    const searchVal = searchFilter.value.toLowerCase().trim();
    const categoryVal = categoryFilter.value;
    const qualityVal = qualityFilter.value;
    const attributeVal = attrFilter.value;

    const filtered = cachedRawItems.filter(item => {
      // 1. Text search
      if (searchVal && !item.itemName.toLowerCase().includes(searchVal)) {
        return false;
      }

      // 2. Category filter (partSetName)
      if (categoryVal) {
        if (!item.partSetName) return false;
        // Handle specific key or potion matching
        if (categoryVal === "Key") {
          if (!item.partSetName.includes("Key") && !item.itemName.toLowerCase().includes("key")) return false;
        } else if (categoryVal === "Potion") {
          if (!item.partSetName.includes("Potion") && !item.itemName.toLowerCase().includes("potion")) return false;
        } else {
          if (item.partSetName !== categoryVal) return false;
        }
      }

      // 3. Quality filter
      if (qualityVal) {
        if (qualityVal === "Rare" || qualityVal === "Blue") {
          if (item.qualityItemName !== "Rare" && item.qualityItemName !== "Blue") return false;
        } else {
          if (item.qualityItemName !== qualityVal) return false;
        }
      }

      // 4. Attribute presence filter
      if (attributeVal) {
        const hasAttr = item.itemAttribute && item.itemAttribute.some(attr => attr.attributeName === attributeVal);
        if (!hasAttr) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      itemsTbody.innerHTML = `<tr><td colspan="4" class="text-center color-muted">No se encontraron objetos con los filtros aplicados.</td></tr>`;
      return;
    }

    // Map to normalized items
    allItems = filtered.map(item => {
      const getAttr = (it, name) => {
        const a = (it.itemAttribute || []).find(x => x.attributeName === name);
        return a ? a.attributeValue : null;
      };
      
      return {
        name: item.itemName,
        type: item.partSetName || "Varios",
        quality: item.qualityItemName || "Common",
        levelReq: getAttr(item, "Level"),
        attack: getAttr(item, "Attack"),
        armorVal: getAttr(item, "Armor"),
        capacity: getAttr(item, "Capacity"),
        meleeBuy: getAttr(item, "Melee"),
        distanceBuy: getAttr(item, "Distance"),
        magicBuy: getAttr(item, "Magic"),
        defenseBuy: getAttr(item, "Defense"),
        speedBuy: getAttr(item, "Speed")
      };
    });

    itemsTbody.innerHTML = "";
    displayedCount = 0;
    renderMoreItems();
  };

  // Bind all filters
  qualityFilter.onchange = loadItems;
  attrFilter.onchange = loadItems;
  categoryFilter.onchange = loadItems;
  
  // Debounce text search to avoid UI lag while typing
  let searchTimeout;
  searchFilter.oninput = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(loadItems, 250);
  };

  // Initial load
  if (itemsTbody.children.length <= 1) {
    loadItems();
  }

  // Load Bosses list
  if (bossItemsTbody.children.length === 0) {
    let apiBosses = await fetchAPI("Item/boss-items");
    let rawBossesList = null;
    if (apiBosses && Array.isArray(apiBosses.bosses)) {
      rawBossesList = apiBosses.bosses;
    } else if (Array.isArray(apiBosses)) {
      rawBossesList = apiBosses;
    }

    let bossesMap = {};
    if (rawBossesList && rawBossesList.length > 0) {
      rawBossesList.forEach(boss => {
        const name = boss.monsterName;
        if (!bossesMap[name]) {
          bossesMap[name] = { bossName: name, drops: [], hp: boss.hitpoints || 0, exp: boss.experience || 0, description: boss.description || "" };
        }
        (boss.drop || []).forEach(d => {
          bossesMap[name].drops.push({
            itemName: d.itemName || d.name,
            quality: d.quality || "Rare"
          });
        });
      });
    } else if (typeof STATIC_BOSS_ITEMS_DATA !== "undefined") {
      STATIC_BOSS_ITEMS_DATA.forEach(boss => {
        const name = boss.monsterName;
        if (!bossesMap[name]) {
          bossesMap[name] = { bossName: name, drops: [], hp: 0, exp: 0 };
        }
        (boss.drop || []).forEach(d => {
          bossesMap[name].drops.push({
            itemName: d.itemName,
            quality: d.quality || "Rare"
          });
        });
      });
    }

    const groupedBosses = Object.values(bossesMap);

    if (groupedBosses.length > 0) {
      bossItemsTbody.innerHTML = "";
      groupedBosses.forEach(boss => {
        const imgPath = getMonsterImg(boss.bossName);
        
        let iconHtml = "";
        if (imgPath === "rucoy2.ico") {
          iconHtml = `
            <div style="width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-sm); color: #ef4444; font-size: 1.5rem;">
              <i class="fa-solid fa-skull-crossbones"></i>
            </div>
          `;
        } else {
          iconHtml = `
            <div style="width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm);">
              <img src="${imgPath}" style="width: 50px; height: 50px; object-fit: contain; image-rendering: pixelated;">
            </div>
          `;
        }

        const hpText = boss.hp > 0 ? `<span style="color:#f87171; font-size:0.7rem;"><i class="fa-solid fa-heart"></i> ${boss.hp.toLocaleString()}</span>` : "";
        const expText = boss.exp > 0 ? `<span style="color:#fbbf24; font-size:0.7rem;"><i class="fa-solid fa-star"></i> ${boss.exp.toLocaleString()} XP</span>` : "";
        const statsHtml = (hpText || expText) ? `<div style="display:flex; flex-direction:column; gap:2px; margin-top:3px;">${hpText}${expText}</div>` : "";
        
        let dropsHtml = `<div style="display: flex; flex-wrap: wrap; gap: 6px;">`;
        boss.drops.forEach(d => {
          const quality = d.quality || "Rare";
          let badgeClass = "";
          if (quality === "Mythic" || quality.includes("Red")) {
            badgeClass = "badge-danger";
          } else if (quality === "Legendary" || quality.includes("Yellow") || quality === "Ultra Rare") {
            badgeClass = "badge-warning";
          } else {
            badgeClass = "badge-info";
          }
          dropsHtml += `<span class="badge ${badgeClass}" style="font-size: 0.75rem; padding: 4px 8px;">${d.itemName}</span>`;
        });
        dropsHtml += `</div>`;

        bossItemsTbody.innerHTML += `
          <tr>
            <td style="font-weight:600; color:#fff; vertical-align: middle; min-width: 180px; padding: 12px 8px;">
              <div style="display:flex; align-items:center; gap:12px;">
                ${iconHtml}
                <div>
                  <div style="font-size:0.95rem;">${boss.bossName}</div>
                  ${statsHtml}
                </div>
              </div>
            </td>
            <td style="vertical-align: middle;">${dropsHtml}</td>
          </tr>
        `;
      });
    } else {
      bossItemsTbody.innerHTML = `<tr><td colspan="2" class="text-center color-muted">No se encontraron dropeos de jefes.</td></tr>`;
    }
  }
}

// ==========================================
// MAP LOCATIONS VIEW
// ==========================================
async function loadLocationsView() {
  const locTbody = document.getElementById("locations-tbody");
  
  if (locTbody.children.length === 0) {
    let locs = await fetchAPI("location/locations");
    if ((!locs || locs.length === 0) && typeof STATIC_LOCATIONS_DATA !== "undefined") {
      locs = STATIC_LOCATIONS_DATA.map(loc => ({
        name: loc.name
      }));
    }
    if (locs) {
      locTbody.innerHTML = "";
      locs.forEach(loc => {
        locTbody.innerHTML += `
          <tr>
            <td style="font-weight:600; color:#fff;">${loc.name}</td>
            <td>
              <button class="pagination-btn" style="padding: 4px 8px; font-size: 0.75rem;" onclick="viewLocationDetails('${loc.name}')">
                <i class="fa-solid fa-eye"></i> Ver
              </button>
            </td>
          </tr>
        `;
      });
      
      // Auto view first location
      if (locs.length > 0) {
        viewLocationDetails(locs[0].name);
      }
    }
  }
}

window.viewLocationDetails = async function(locationName) {
  const mTable = document.getElementById("location-monsters-table");
  const iTable = document.getElementById("location-items-table");
  const mTbody = document.getElementById("location-monsters-tbody");
  const iTbody = document.getElementById("location-items-tbody");

  mTbody.innerHTML = `<tr><td colspan="2" class="text-center color-muted">Cargando...</td></tr>`;
  iTbody.innerHTML = `<tr><td colspan="2" class="text-center color-muted">Cargando...</td></tr>`;

  // Fetch monsters in this location
  let monsters = await fetchAPI(`location/monster-location`, { locationName: locationName });
  if ((!monsters || monsters.length === 0) && typeof STATIC_LOCATIONS_DATA !== "undefined") {
    const loc = STATIC_LOCATIONS_DATA.find(x => x.name === locationName);
    if (loc) {
      monsters = (loc.monsters || []).map(m => {
        const match = m.name.match(/Lv\.(\d+)/) || m.name.match(/(\d+)lv/);
        const level = match ? match[1] : "?";
        return {
          monsterName: m.name,
          level: level
        };
      });
    }
  }
  if (monsters && monsters.length > 0) {
    mTbody.innerHTML = "";
    monsters.forEach(m => {
      mTbody.innerHTML += `
        <tr>
          <td style="font-weight:600; color:#fff;">${m.monsterName}</td>
          <td>Lvl ${m.level}</td>
        </tr>
      `;
    });
  } else {
    mTbody.innerHTML = `<tr><td colspan="2" class="text-center color-muted">No hay monstruos registrados</td></tr>`;
  }

  // Fetch drops in this location
  let items = await fetchAPI(`location/item-location`, { locationName: locationName });
  if ((!items || items.length === 0) && typeof STATIC_LOCATIONS_DATA !== "undefined") {
    const loc = STATIC_LOCATIONS_DATA.find(x => x.name === locationName);
    if (loc) {
      items = (loc.items || []).map(i => {
        const colorPrefix = i.color && i.color !== "No color" ? `[${i.color}] ` : "";
        const itemName = colorPrefix + i.item;
        return {
          itemName: itemName,
          monsterName: "Monstruo de la zona"
        };
      });
    }
  }
  if (items && items.length > 0) {
    iTbody.innerHTML = "";
    items.forEach(item => {
      iTbody.innerHTML += `
        <tr>
          <td style="font-weight:600; color:#fff;">${item.itemName}</td>
          <td>${item.monsterName}</td>
        </tr>
      `;
    });
  } else {
    iTbody.innerHTML = `<tr><td colspan="2" class="text-center color-muted">No hay drops registrados</td></tr>`;
  }
};

// ==========================================
// GUILD WARS VIEW
// ==========================================
async function loadWarsView() {
  const nextTbody = document.getElementById("next-wars-tbody");
  const archiveTbody = document.getElementById("archive-wars-tbody");

  if (nextTbody.children.length === 0) {
    const nextWars = await fetchAPI("war/next-wars");
    if (nextWars && nextWars.length > 0) {
      nextTbody.innerHTML = "";
      nextWars.forEach(war => {
        nextTbody.innerHTML += `
          <tr>
            <td style="font-weight:600; color:#fff;">${war.guildName1}</td>
            <td>${war.guildName2}</td>
            <td>${formatDate(war.warDate)}</td>
          </tr>
        `;
      });
    } else {
      nextTbody.innerHTML = `<tr><td colspan="3" class="text-center color-muted">No hay batallas programadas</td></tr>`;
    }
  }

  if (archiveTbody.children.length === 0) {
    const archiveWars = await fetchAPI("war/archive-wars");
    if (archiveWars && archiveWars.length > 0) {
      archiveTbody.innerHTML = "";
      archiveWars.forEach(war => {
        const winner = war.winnerGuildName || "Empate";
        archiveTbody.innerHTML += `
          <tr>
            <td style="font-weight:600; color:#fff;">Guerra #${war.id}</td>
            <td>${war.guildName1} vs ${war.guildName2}</td>
            <td><span class="badge ${winner !== 'Empate' ? 'badge-success' : 'badge-warning'}">${winner}</span></td>
          </tr>
        `;
      });
    } else {
      archiveTbody.innerHTML = `<tr><td colspan="3" class="text-center color-muted">No hay registro de guerras anteriores</td></tr>`;
    }
  }
}

// ==========================================
// COMPARERS
// ==========================================
// Helper to parse official character profile
function parseRucoyCharacterHTML(htmlText) {
  if (htmlText.includes("Character not found")) {
    return null;
  }
  
  const getValue = (label) => {
    const regex = new RegExp(`<td>${label}</td>\\s*<td>\\s*([\\s\\S]*?)\\s*</td>`, "i");
    const m = htmlText.match(regex);
    if (!m) return null;
    
    let val = m[1].trim();
    val = val.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return val;
  };
  
  const name = getValue("Name");
  if (!name) return null;
  
  const level = parseInt(getValue("Level")) || 0;
  const guild = getValue("Guild") || "-";
  const title = getValue("Title") || "-";
  const lastOnline = getValue("Last online") || "-";
  const born = getValue("Born") || "-";
  
  const pvpActivity = [];
  const pvpBlockStart = htmlText.indexOf("Recent character kills and deaths");
  if (pvpBlockStart !== -1) {
    const pvpBlockEnd = htmlText.indexOf("</table>", pvpBlockStart);
    const pvpBlock = htmlText.slice(pvpBlockStart, pvpBlockEnd);
    
    const rowRegex = /<td>\s*([\s\S]*?)\s*<\/td>/g;
    let rMatch;
    while (rMatch = rowRegex.exec(pvpBlock)) {
      let text = rMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (text && !text.includes("Recent character kills")) {
        pvpActivity.push(text);
      }
    }
  }
  
  return {
    name,
    level,
    guild,
    title,
    lastOnline,
    born,
    pvpActivity
  };
}

function findStatsInHighscoreHTML(htmlText, targetName) {
  const normTarget = targetName.toLowerCase().replace(/%20|\+/g, " ").trim();
  
  const tbodyStart = htmlText.indexOf('<tbody>');
  const tbodyEnd = htmlText.indexOf('</tbody>');
  if (tbodyStart === -1 || tbodyEnd === -1) return null;
  
  const tbody = htmlText.slice(tbodyStart, tbodyEnd);
  const trs = tbody.split(/<\/tr>/i);
  for (let tr of trs) {
    if (!tr.includes('<tr') && !tr.includes('<td')) continue;
    
    const tdRegex = /<td>([\s\S]*?)<\/td>/gi;
    const tds = [];
    let match;
    while (match = tdRegex.exec(tr)) {
      tds.push(match[1].trim());
    }
    
    if (tds.length >= 3) {
      const rank = tds[0].replace(/<[^>]+>/g, "").trim();
      const nameHtml = tds[1];
      const nameMatch = nameHtml.match(/<a[^>]*>([^<]+)<\/a>/i);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        if (name.toLowerCase() === normTarget) {
          if (tds.length === 4) {
            const level = tds[2].replace(/<[^>]+>/g, "").trim();
            const exp = tds[3].replace(/<[^>]+>/g, "").trim();
            return { rank, name, level, exp };
          } else {
            const skill = tds[2].replace(/<[^>]+>/g, "").trim();
            return { rank, name, skill };
          }
        }
      }
    }
  }
  return null;
}

function parseBornDate(bornStr) {
  if (!bornStr || bornStr === "-") return null;
  const clean = bornStr.trim().replace(/\s+/g, " ");
  const months = {
    jan: 1, january: 1,
    feb: 2, february: 2,
    mar: 3, march: 3,
    apr: 4, april: 4,
    may: 5,
    jun: 6, june: 6,
    jul: 7, july: 7,
    aug: 8, august: 8,
    sep: 9, september: 9, sept: 9,
    oct: 10, october: 10,
    nov: 11, november: 11,
    dec: 12, december: 12
  };
  
  const monthRegex = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/i;
  const yearRegex = /\b(20\d{2})\b/;
  
  const mMatch = clean.match(monthRegex);
  const yMatch = clean.match(yearRegex);
  
  if (mMatch && yMatch) {
    const monthName = mMatch[0].toLowerCase();
    const year = parseInt(yMatch[1]);
    let monthNum = null;
    for (let key in months) {
      if (monthName.startsWith(key) || key.startsWith(monthName)) {
        monthNum = months[key];
        break;
      }
    }
    if (monthNum && year) {
      return { year, month: monthNum, monthStr: mMatch[0] };
    }
  }
  return null;
}

function initComparers() {
  // Global helper for interactive player name clicks in PvP
  window.navigateToPlayerProfile = function(playerName) {
    const input = document.getElementById("search-play-name");
    if (input) {
      input.value = playerName;
      const sForm = document.getElementById("search-player-form");
      if (sForm) {
        sForm.dispatchEvent(new Event("submit"));
      }
    }
  };

  // Parser helper to turn player names in PvP logs into click links
  function makeInteractivePvpText(activity, targetPlayerName) {
    if (!activity.includes(" killed ")) return activity;
    
    // Strip trailing timestamp — Rucoy formats: "- about X hours/minutes/days ago" or "at Month Day"
    // We need to do this BEFORE splitting on " killed " so the victim name is clean
    const timestampRegex = /\s*[-–]\s*(about\s+.+?\s+ago|just now|\d+\s+\w+\s+ago)$/i;
    const atRegex = /\s+at\s+\w+\s+\d+.*/i;
    
    let cleanActivity = activity;
    let timeLabel = "";
    
    const tsMdash = cleanActivity.match(timestampRegex);
    if (tsMdash) {
      timeLabel = tsMdash[0].replace(/^\s*[-–]\s*/, "").trim();
      cleanActivity = cleanActivity.replace(timestampRegex, "").trim();
    } else {
      const tsAt = cleanActivity.match(atRegex);
      if (tsAt) {
        timeLabel = tsAt[0].trim();
        cleanActivity = cleanActivity.replace(atRegex, "").trim();
      }
    }
    
    const parts = cleanActivity.split(" killed ");
    const attackersRaw = parts[0];
    const victimRaw = parts[1] ? parts[1].trim() : "";
    
    const makeLink = (name) => {
      const cleanName = name.trim();
      if (!cleanName) return name;
      // Use different highlighting for target vs other players
      const isTarget = cleanName.toLowerCase() === targetPlayerName.toLowerCase();
      const color = isTarget ? "#a855f7" : "#fbbf24"; // Purple for target, yellow for other players
      const hoverEffect = `this.style.color='#f59e0b'; this.style.textDecoration='underline';`;
      const leaveEffect = `this.style.color='${color}'; this.style.textDecoration='none';`;
      
      return '<span class="clickable-player" style="color: ' + color + '; font-weight: 600; cursor: pointer; transition: color 0.15s;" onmouseover="' + hoverEffect + '" onmouseout="' + leaveEffect + '" onclick="window.navigateToPlayerProfile(\'' + cleanName.replace(/'/g, "\\'") + '\')">' + cleanName + '</span>';
    };
    
    // Parse attackers list (separated by " and ", and ", ")
    let attackersHtml = attackersRaw.split(" and ").map(partAnd => {
      return partAnd.split(", ").map(name => makeLink(name)).join(", ");
    }).join(" and ");
    
    let victimHtml = makeLink(victimRaw);
    
    const timeBadge = timeLabel
      ? `<span style="color:#6b7280; font-size:0.78rem; margin-left: 8px; font-style: italic;">${timeLabel}</span>`
      : "";
    
    return `${attackersHtml} <span style="color:#9ca3af; font-weight: 500;">killed</span> ${victimHtml}${timeBadge}`;
  }

  const sForm = document.getElementById("search-player-form");
  if (!sForm) return;

  sForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pName = document.getElementById("search-play-name").value.trim();
    if (!pName) return;

    const nameEl = document.getElementById("search-name");
    const avatarEl = document.getElementById("search-avatar");
    const statusEl = document.getElementById("search-status");
    const profileCard = document.getElementById("search-profile-card");
    const dbStatsCard = document.getElementById("search-db-stats-card");
    const offStatsCard = document.getElementById("search-official-stats-card");
    const pvpCard = document.getElementById("search-pvp-card");

    profileCard.classList.remove("hidden");
    dbStatsCard.classList.add("hidden");
    if (offStatsCard) offStatsCard.classList.add("hidden");
    pvpCard.classList.add("hidden");

    nameEl.textContent = pName;
    avatarEl.textContent = pName.substring(0, 2).toUpperCase();
    statusEl.className = "badge";
    statusEl.textContent = "Buscando...";

    const charUrl = `https://www.rucoyonline.com/characters/${encodeURIComponent(pName)}`;
    const scrapeProxies = [
      `https://corsproxy.io/?${encodeURIComponent(charUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(charUrl)}`,
      `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(charUrl)}`
    ];

    let htmlText = "";
    let fetchOk = false;
    for (const proxy of scrapeProxies) {
      try {
        const res = await fetch(proxy);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        htmlText = await res.text();
        fetchOk = true;
        break;
      } catch (err) {
        console.warn(`Player search proxy failed [${proxy.split('?')[0]}]:`, err.message);
      }
    }
    if (!fetchOk) {
      statusEl.className = "badge badge-danger";
      statusEl.textContent = "Error de conexión";
      return;
    }

    try {
      const charData = parseRucoyCharacterHTML(htmlText);
      if (!charData) {
        statusEl.className = "badge badge-danger";
        statusEl.textContent = "No encontrado";
        return;
      }

      nameEl.textContent = charData.name;
      avatarEl.textContent = charData.name.substring(0, 2).toUpperCase();
      
      const isOnline = charData.lastOnline.toLowerCase().includes("currently online") || charData.lastOnline.toLowerCase() === "online";
      statusEl.className = `badge ${isOnline ? 'badge-success' : 'badge-danger'}`;
      statusEl.textContent = isOnline ? "Online" : charData.lastOnline;
      
      if (isOnline) avatarEl.classList.add("online");
      else avatarEl.classList.remove("online");

      document.getElementById("search-title").textContent = charData.title;
      
      const guildEl = document.getElementById("search-guild");
      if (charData.guild && charData.guild !== "-") {
        guildEl.innerHTML = `<span style="color: #fbbf24; cursor: pointer; text-decoration: underline; font-weight: 600;" onclick="window.viewGuildProfile('${charData.guild.replace(/'/g, "\\'")}')">${charData.guild}</span>`;
      } else {
        guildEl.textContent = "-";
      }
      
      document.getElementById("search-level").textContent = charData.level;
      document.getElementById("search-born").textContent = charData.born;
      document.getElementById("search-last-online").textContent = charData.lastOnline;

      const pvpList = document.getElementById("search-pvp-list");
      pvpList.innerHTML = "";
      if (charData.pvpActivity && charData.pvpActivity.length > 0) {
        pvpCard.classList.remove("hidden");
        charData.pvpActivity.forEach(activity => {
          let badge = "";
          let textClass = "";
          if (activity.toLowerCase().includes(" killed ")) {
            const playerIndex = activity.toLowerCase().indexOf(charData.name.toLowerCase());
            const killedIndex = activity.toLowerCase().indexOf(" killed ");
            
            // If the player name is positioned before the word "killed", it's a KILL
            if (playerIndex !== -1 && playerIndex < killedIndex) {
              badge = `<span class="badge badge-success" style="font-size: 0.65rem; padding: 2px 6px; margin-right: 8px;"><i class="fa-solid fa-skull"></i> KILL</span>`;
              textClass = "text-success";
            } else {
              badge = `<span class="badge badge-danger" style="font-size: 0.65rem; padding: 2px 6px; margin-right: 8px;"><i class="fa-solid fa-tombstone"></i> DEATH</span>`;
              textClass = "text-danger";
            }
          }
          const interactiveHtml = makeInteractivePvpText(activity, charData.name);
          pvpList.innerHTML += `
            <li style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.85rem; display: flex; align-items: center; line-height: 1.4;">
              ${badge}
              <span style="color: #fff; width: 100%;">${interactiveHtml}</span>
            </li>
          `;
        });
      }

      // Check database stats
      const dbDetails = await fetchAPI("player/current-details", { PlayerName: charData.name });
      if (dbDetails && dbDetails.playerSkillInformation) {
        const skills = dbDetails.playerSkillInformation;
        document.getElementById("search-skill-melee").textContent = skills.currentLevelMelee || "-";
        document.getElementById("search-skill-dist").textContent = skills.currentLevelDist || "-";
        document.getElementById("search-skill-magic").textContent = skills.currentLevelMagic || "-";
        document.getElementById("search-skill-defense").textContent = skills.currentLevelDefense || "-";
        dbStatsCard.classList.remove("hidden");
      }

      // Check official birth month highscores
      const bornParsed = parseBornDate(charData.born);
      if (bornParsed) {
        const { year, month, monthStr } = bornParsed;
        const labelEl = document.getElementById("search-official-date-label");
        if (labelEl) labelEl.textContent = `${monthStr} ${year}`;
        if (offStatsCard) offStatsCard.classList.remove("hidden");

        // Set loading/placeholder status
        document.getElementById("search-off-rank-exp").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
        document.getElementById("search-off-val-exp").textContent = "Buscando...";
        document.getElementById("search-off-rank-melee").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
        document.getElementById("search-off-val-melee").textContent = "Buscando...";
        document.getElementById("search-off-rank-dist").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
        document.getElementById("search-off-val-dist").textContent = "Buscando...";
        document.getElementById("search-off-rank-magic").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
        document.getElementById("search-off-val-magic").textContent = "Buscando...";
        document.getElementById("search-off-rank-defense").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
        document.getElementById("search-off-val-defense").textContent = "Buscando...";

        const searchMonthStat = async (category) => {
          const mUrl = `https://www.rucoyonline.com/highscores/${category}/${year}/${month}`;
          const primaryProxy = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(mUrl)}`;
          const fallbackProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(mUrl)}`;
          
          let mHtml = "";
          try {
            const mRes = await fetch(primaryProxy);
            if (!mRes.ok) throw new Error("Codetabs highscore fetch failed");
            mHtml = await mRes.text();
          } catch (e) {
            console.warn(`Primary proxy failed for official stats ${category}, trying fallback:`, e);
            try {
              const mRes = await fetch(fallbackProxy);
              if (!mRes.ok) throw new Error("AllOrigins highscore fetch failed");
              mHtml = await mRes.text();
            } catch (err) {
              console.error(`Both proxies failed for official stats ${category}:`, err);
              return null;
            }
          }
          return findStatsInHighscoreHTML(mHtml, charData.name);
        };

        const categories = ["experience", "melee", "distance", "magic", "defense"];
        Promise.all(categories.map(cat => searchMonthStat(cat))).then(results => {
          const [expRes, meleeRes, distRes, magicRes, defRes] = results;
          
          if (expRes) {
            document.getElementById("search-off-rank-exp").textContent = `#${expRes.rank}`;
            document.getElementById("search-off-val-exp").textContent = `Lvl ${expRes.level} (${expRes.exp})`;
          } else {
            document.getElementById("search-off-rank-exp").textContent = "No en Top 100";
            document.getElementById("search-off-val-exp").textContent = "-";
          }

          if (meleeRes) {
            document.getElementById("search-off-rank-melee").textContent = `#${meleeRes.rank}`;
            document.getElementById("search-off-val-melee").textContent = meleeRes.skill;
          } else {
            document.getElementById("search-off-rank-melee").textContent = "No en Top 100";
            document.getElementById("search-off-val-melee").textContent = "-";
          }

          if (distRes) {
            document.getElementById("search-off-rank-dist").textContent = `#${distRes.rank}`;
            document.getElementById("search-off-val-dist").textContent = distRes.skill;
          } else {
            document.getElementById("search-off-rank-dist").textContent = "No en Top 100";
            document.getElementById("search-off-val-dist").textContent = "-";
          }

          if (magicRes) {
            document.getElementById("search-off-rank-magic").textContent = `#${magicRes.rank}`;
            document.getElementById("search-off-val-magic").textContent = magicRes.skill;
          } else {
            document.getElementById("search-off-rank-magic").textContent = "No en Top 100";
            document.getElementById("search-off-val-magic").textContent = "-";
          }

          if (defRes) {
            document.getElementById("search-off-rank-defense").textContent = `#${defRes.rank}`;
            document.getElementById("search-off-val-defense").textContent = defRes.skill;
          } else {
            document.getElementById("search-off-rank-defense").textContent = "No en Top 100";
            document.getElementById("search-off-val-defense").textContent = "-";
          }
        });
      }

    } catch (err) {
      console.error(err);
      statusEl.className = "badge badge-danger";
      statusEl.textContent = "Error de conexión";
    }
  });
}



// ==========================================
// GUILD PROFILE SECTION
// ==========================================
function parseRucoyGuildHTML(htmlText) {
  console.log("Iniciando parseRucoyGuildHTML. Longitud HTML:", htmlText ? htmlText.length : 0);
  window.logDebug(`parseRucoyGuildHTML: Iniciando con HTML largo: ${htmlText ? htmlText.length : 0}`);
  try {
    // If the HTML indicates redirect/not found, return null immediately
    if (htmlText.includes("<h2>Guilds</h2>") && !htmlText.includes("<h3>")) {
      console.log("parseRucoyGuildHTML: Gremio no encontrado (redireccionó a la lista general)");
      window.logDebug("parseRucoyGuildHTML: Redireccionó a lista general, gremio no existe");
      return null;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    
    // Guild general information
    let guildName = "";
    let createdOn = "";
    let description = "Sin descripción";
    
    const nameEl = doc.querySelector(".guild-box h3") || doc.querySelector("h3");
    if (nameEl) {
      guildName = nameEl.textContent.trim();
    }
    
    // Find founded on date
    const iEls = doc.querySelectorAll(".guild-box i, i");
    iEls.forEach(el => {
      const txt = el.textContent.trim();
      if (txt.toLowerCase().includes("founded on")) {
        createdOn = txt.replace(/founded on/i, "").trim();
      }
    });
    
    // Description: paragraph inside guild-box before the table that doesn't have Founded on or is empty
    const pEls = doc.querySelectorAll(".guild-box > p, .guild-box p, p");
    for (let el of pEls) {
      if (el.querySelector("i")) continue;
      const txt = el.textContent.trim();
      if (!txt) continue;
      // Skip common page texts
      if (el.closest("nav") || el.closest(".banner") || el.closest(".footer")) continue;
      if (txt.includes("Members:") || txt.includes("Welcome") || txt.includes("Privacy Policy") || txt.includes("Founded on")) continue;
      description = txt;
      break;
    }

    console.log("Datos básicos del gremio parseados:", { guildName, createdOn, description });
    window.logDebug(`Nombre: "${guildName}", Creado: "${createdOn}"`);
    
    // Members list: the only table on the page
    const members = [];
    const membersTable = doc.querySelector("table.table, table");
    if (membersTable) {
      const memberRows = membersTable.querySelectorAll("tbody tr, tr");
      console.log("Filas de miembros encontradas en la tabla:", memberRows.length);
      window.logDebug(`Filas de tabla de miembros: ${memberRows.length}`);
      
      memberRows.forEach((row, rIdx) => {
        try {
          const tds = row.querySelectorAll("td");
          if (tds.length >= 2) {
            const nameTd = tds[0];
            const nameLink = nameTd.querySelector("a");
            if (!nameLink) return; // Skip header row
            
            const nameVal = nameLink.textContent.trim();
            
            // Extract role (Leader, or Member)
            let roleVal = "Member";
            const textContent = nameTd.textContent.replace(nameVal, "").trim();
            if (textContent.includes("Leader")) {
              roleVal = "Leader";
            } else if (textContent.includes("Vice Leader")) {
              roleVal = "Vice Leader";
            }
            
            // Extract whether the player is currently online
            const isOnline = nameTd.querySelector(".label-success") !== null || textContent.includes("Online");
            
            const levelVal = tds[1] ? (parseInt(tds[1].textContent.replace(/,/g, "")) || 0) : 0;
            const joinVal = tds[2] ? tds[2].textContent.trim() : "";
            
            members.push({
              name: nameVal,
              role: roleVal,
              level: levelVal,
              joinDate: joinVal,
              isOnline: isOnline
            });
          }
        } catch (rowErr) {
          console.warn(`Error parseando la fila de miembro #${rIdx}:`, rowErr);
        }
      });
    }
    
    console.log("Miembros parseados exitosamente:", members.length);
    window.logDebug(`Miembros parseados exitosamente: ${members.length}`);
    
    return {
      name: guildName || "Desconocido",
      createdOn: createdOn || "Fecha desconocida",
      description: description,
      members: members
    };
  } catch (err) {
    console.error("Error crítico en parseRucoyGuildHTML:", err);
    window.logDebug(`Error crítico parseo: ${err.message}`);
    return null;
  }
}

async function viewGuildProfile(guildName) {
  if (!guildName || guildName === "-" || guildName.trim() === "") {
    console.warn("viewGuildProfile abortado: nombre de gremio inválido");
    return;
  }
  
  const errorBanner = document.getElementById("search-guild-error-banner");
  if (errorBanner) {
    errorBanner.classList.add("hidden");
  }
  
  console.log(`viewGuildProfile invocado para gremio: "${guildName}"`);
  
  // Save previous active section to support back navigation
  const currentSection = document.querySelector(".view-section:not(.hidden)");
  const previousView = currentSection ? currentSection.id.replace("view-", "") : "player-details";
  
  // Switch to guild section
  switchView("guild-details");
  
  // Configure back button dynamically
  const backBtn = document.querySelector("#view-guild-details button");
  if (backBtn) {
    backBtn.setAttribute("onclick", `switchView('${previousView}')`);
    let backText = "Volver a Personaje";
    if (previousView === "guilds") {
      backText = "Volver a Buscar Guild";
    } else if (previousView === "comparers") {
      backText = "Volver a Comparador";
    }
    backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> ${backText}`;
  }

  // Set loading placeholder states
  document.getElementById("guild-name-main").textContent = guildName;
  document.getElementById("guild-title-header").textContent = `Perfil de Gremio: ${guildName}`;
  document.getElementById("guild-avatar").textContent = guildName.substring(0, 2).toUpperCase();
  document.getElementById("guild-created-date").textContent = "Cargando...";
  document.getElementById("guild-description-val").textContent = "...";
  document.getElementById("guild-members-count").textContent = "0";
  document.getElementById("guild-average-level").textContent = "0";
  
  const tbody = document.getElementById("guild-members-tbody");
  tbody.innerHTML = `<tr><td colspan="5" class="text-center color-muted"><i class="fa-solid fa-spinner fa-spin"></i> Cargando miembros del clan...</td></tr>`;

  try {
    // 1. Resolve exact spelling (capitalization) via API first to handle case-sensitivity
    let resolvedGuildName = guildName;
    try {
      window.logDebug("Corrigiendo ortografía/mayúsculas del clan...");
      const apiRes = await fetchAPI("guild", { guildName: guildName });
      if (apiRes && apiRes.data && apiRes.data.length > 0) {
        const exactMatch = apiRes.data.find(g => g.guildName.toLowerCase() === guildName.toLowerCase());
        if (exactMatch) {
          resolvedGuildName = exactMatch.guildName;
          console.log(`Nombre resuelto por API: "${guildName}" -> "${resolvedGuildName}"`);
          window.logDebug(`Nombre correcto encontrado: "${resolvedGuildName}"`);
        }
      }
    } catch (apiErr) {
      console.warn("Falla resolviendo nombre en API, usando original:", apiErr);
      window.logDebug("API desconectada, usando nombre original...");
    }

    // Update UI name placeholders with corrected spelling
    document.getElementById("guild-name-main").textContent = resolvedGuildName;
    document.getElementById("guild-title-header").textContent = `Perfil de Gremio: ${resolvedGuildName}`;
    document.getElementById("guild-avatar").textContent = resolvedGuildName.substring(0, 2).toUpperCase();

    // 2. Fetch official guild page with case-sensitive URL
    const guildUrl = `https://www.rucoyonline.com/guild/${encodeURIComponent(resolvedGuildName)}`;
    const guildScrapeProxies = [
      `https://corsproxy.io/?${encodeURIComponent(guildUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(guildUrl)}`,
      `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(guildUrl)}`
    ];

    let htmlText = "";
    let guildFetchOk = false;
    for (const proxy of guildScrapeProxies) {
      try {
        console.log("Intentando proxy guild:", proxy.split('?')[0]);
        window.logDebug(`Intentando proxy: ${proxy.split('?')[0]}`);
        const res = await fetch(proxy);
        console.log("Respuesta proxy. Status:", res.status);
        window.logDebug(`Proxy responde con status: ${res.status}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        htmlText = await res.text();
        guildFetchOk = true;
        break;
      } catch (err) {
        console.warn(`Guild proxy failed [${proxy.split('?')[0]}]:`, err.message);
        window.logDebug(`Proxy falló: ${err.message}`);
      }
    }
    if (!guildFetchOk) {
      window.logDebug(`ERROR: Todos los proxies fallaron.`);
      throw new Error("No se pudo obtener conexión con los servidores de Rucoy.");
    }
    
    window.logDebug(`Datos HTML recibidos (Largo: ${htmlText.length}). Parseando...`);
    
    const guildData = parseRucoyGuildHTML(htmlText);
    if (!guildData || !guildData.name) {
      console.error("El parser de Guild retornó datos nulos o inválidos");
      const errorBanner = document.getElementById("search-guild-error-banner");
      if (errorBanner) {
        errorBanner.classList.remove("hidden");
      }
      switchView("guilds");
      return;
    }

    console.log("Pintando datos de la Guild en el DOM:", guildData.name);
    // Populate guild summary details
    document.getElementById("guild-name-main").textContent = guildData.name;
    document.getElementById("guild-created-date").textContent = `Creado el: ${guildData.createdOn}`;
    document.getElementById("guild-description-val").textContent = guildData.description;
    document.getElementById("guild-members-count").textContent = guildData.members.length;
    
    // 3. Fetch player skills for the guild from the stats API (graceful fallback)
    let guildSkills = [];
    try {
      window.logDebug("Obteniendo habilidades de los miembros...");
      const skillsRes = await fetchAPI("Guild/guild-player-skills=" + encodeURIComponent(guildData.name));
      if (skillsRes) {
        guildSkills = typeof skillsRes === "string" ? JSON.parse(skillsRes) : skillsRes;
        console.log(`Habilidades obtenidas para ${guildSkills.length} jugadores`);
        window.logDebug(`Habilidades de miembros cargadas: ${guildSkills.length}`);
      }
    } catch (skillsErr) {
      console.warn("Falla obteniendo habilidades de la guild:", skillsErr);
      window.logDebug("No se pudieron cargar las habilidades (API fuera de línea o 500)");
    }

    // Merge skills with the scraped members list
    const hasSkills = Array.isArray(guildSkills) && guildSkills.length > 0;
    if (hasSkills) {
      guildData.members.forEach(m => {
        const pSkill = guildSkills.find(s => s.playerName.toLowerCase() === m.name.toLowerCase());
        if (pSkill) {
          m.melee = pSkill.currentLevelMelee;
          m.gainMelee = pSkill.gainMelee;
          m.dist = pSkill.currentLevelDist;
          m.gainDist = pSkill.gainDist;
          m.magic = pSkill.currentLevelMagic;
          m.gainMagic = pSkill.gainMagic;
          m.defense = pSkill.currentLevelDefense;
          m.gainDefense = pSkill.gainDefense;
        }
      });
    }

    // Calculate sum statistics & online count
    let totalLvl = 0;
    let onlineCount = 0;
    guildData.members.forEach(m => {
      totalLvl += m.level;
      if (m.isOnline) {
        onlineCount++;
      }
    });
    
    document.getElementById("guild-online-count").textContent = onlineCount;
    
    const avgLvl = guildData.members.length > 0 ? Math.round(totalLvl / guildData.members.length) : 0;
    document.getElementById("guild-average-level").textContent = avgLvl;

    // Save for live member filtering
    const membersList = guildData.members;

    // Target the headers row in the DOM
    const theadTr = document.querySelector("#view-guild-details table thead tr");

    const renderHeaders = (showSkills) => {
      if (!theadTr) return;
      if (showSkills) {
        theadTr.innerHTML = `
          <th style="width: 40px; text-align: center;">#</th>
          <th>Nombre</th>
          <th>Rango</th>
          <th style="text-align: right;">Nivel</th>
          <th style="text-align: right; color: #f87171;"><i class="fa-solid fa-hand-fist"></i> Melee</th>
          <th style="text-align: right; color: #4ade80;"><i class="fa-solid fa-crosshairs"></i> Dist</th>
          <th style="text-align: right; color: #60a5fa;"><i class="fa-solid fa-wand-magic-sparkles"></i> Magia</th>
          <th style="text-align: right; color: #fbbf24;"><i class="fa-solid fa-shield-halved"></i> Def</th>
          <th style="text-align: right;">Fecha Ingreso</th>
        `;
      } else {
        theadTr.innerHTML = `
          <th style="width: 40px; text-align: center;">#</th>
          <th>Nombre</th>
          <th>Rango</th>
          <th style="text-align: right;">Nivel</th>
          <th style="text-align: right;">Fecha Ingreso</th>
        `;
      }
    };

    const renderMembers = (list) => {
      if (list.length === 0) {
        const colSpan = hasSkills ? 9 : 5;
        tbody.innerHTML = `<tr><td colspan="${colSpan}" class="text-center color-muted">No se encontraron miembros.</td></tr>`;
        return;
      }
      
      // Sort members descending by level
      list.sort((a, b) => b.level - a.level);

      renderHeaders(hasSkills);

      // Build entire HTML as a string array and assign once — avoids repeated DOM re-parsing
      const rows = [];

      list.forEach((m, idx) => {
        let badgeColor = "rgba(255,255,255,0.05)";
        let badgeText = m.role || "Member";
        let badgeTextColor = "#fff";
        
        if (m.role === "Leader") {
          badgeColor = "rgba(239, 68, 68, 0.15)";
          badgeTextColor = "#ef4444";
          badgeText = `<i class="fa-solid fa-crown"></i> Líder`;
        } else if (m.role === "Vice Leader") {
          badgeColor = "rgba(251, 191, 36, 0.15)";
          badgeTextColor = "#fbbf24";
          badgeText = `<i class="fa-solid fa-star"></i> Vice Líder`;
        }
        
        // Dynamic Player Name with Online Glow Circle indicator
        const safeName = m.name.replace(/'/g, "\\'");
        let nameHtml = "";
        if (m.isOnline) {
          nameHtml = `<div style="display:inline-flex;align-items:center;gap:8px;"><span class="clickable-player" style="color:#60a5fa;cursor:pointer;text-decoration:underline;font-weight:700;" onclick="switchView('comparers');window.navigateToPlayerProfile('${safeName}')">${m.name}</span><span style="display:inline-block;width:8px;height:8px;background:#10b981;border-radius:50%;box-shadow:0 0 8px #10b981;" title="Online"></span></div>`;
        } else {
          nameHtml = `<span class="clickable-player" style="color:#cbd5e1;cursor:pointer;text-decoration:underline;" onclick="switchView('comparers');window.navigateToPlayerProfile('${safeName}')">${m.name}</span>`;
        }

        // Skills columns if skills data is available
        let skillsColsHtml = "";
        if (hasSkills) {
          const formatSkill = (lvl, gain) => {
            if (!lvl) return `<td style="text-align:right;color:var(--text-muted);font-size:0.85rem;">-</td>`;
            const gainText = gain > 0 ? ` <span style="color:#4ade80;font-size:0.75rem;font-weight:700;">(+${gain})</span>` : "";
            return `<td style="text-align:right;color:#fff;font-weight:600;font-size:0.85rem;">${lvl}${gainText}</td>`;
          };
          skillsColsHtml = formatSkill(m.melee, m.gainMelee) + formatSkill(m.dist, m.gainDist) + formatSkill(m.magic, m.gainMagic) + formatSkill(m.defense, m.gainDefense);
        }
        
        rows.push(`<tr class="guild-member-row"><td style="text-align:center;color:var(--text-muted);font-size:0.85rem;vertical-align:middle;">${idx + 1}</td><td style="font-weight:600;vertical-align:middle;">${nameHtml}</td><td style="vertical-align:middle;"><span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:0.75rem;font-weight:700;background:${badgeColor};color:${badgeTextColor};">${badgeText}</span></td><td style="text-align:right;font-weight:700;color:#fff;vertical-align:middle;">${m.level}</td>${skillsColsHtml}<td style="text-align:right;color:#a3a3a3;font-size:0.85rem;vertical-align:middle;">${m.joinDate || "-"}</td></tr>`);
      });

      // Single DOM write — dramatically faster than innerHTML += in a loop
      tbody.innerHTML = rows.join("");
    };

    renderMembers(membersList);

    // Filter members in real-time
    const searchInput = document.getElementById("guild-members-search");
    searchInput.value = "";
    searchInput.oninput = () => {
      const q = searchInput.value.toLowerCase().trim();
      const filtered = membersList.filter(m => m.name.toLowerCase().includes(q) || (m.role && m.role.toLowerCase().includes(q)));
      renderMembers(filtered);
    };

  } catch (err) {
    console.error("Error capturado en viewGuildProfile:", err);
    window.logDebug(`ERROR viewGuildProfile: ${err.message}`);
    tbody.innerHTML = `<tr><td colspan="5" class="text-center color-muted">Error de conexión al obtener el gremio.</td></tr>`;
    const errorBanner = document.getElementById("search-guild-error-banner");
    if (errorBanner) {
      errorBanner.classList.remove("hidden");
    }
    switchView("guilds");
  }
}

// Global logger helper
window.logDebug = function(msg) {
  const el = document.getElementById("debug-logger");
  if (el) {
    el.innerHTML += `<div style="margin-top: 4px; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 2px;">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    el.scrollTop = el.scrollHeight;
  }
};

function initGuildSearch() {
  console.log("initGuildSearch: Inicializando formulario de búsqueda de gremios");
  window.logDebug("initGuildSearch() invocado");
  const gForm = document.getElementById("search-guild-form");
  if (!gForm) {
    window.logDebug("search-guild-form no se encontró en el HTML");
    return;
  }
  
  gForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const gInput = document.getElementById("search-guild-input-name");
    const gName = gInput ? gInput.value.trim() : "";
    const errorBanner = document.getElementById("search-guild-error-banner");
    
    if (errorBanner) errorBanner.classList.add("hidden");
    
    console.log(`Formulario Guild enviado. Nombre buscado: "${gName}"`);
    window.logDebug(`Buscando gremio: "${gName}"`);
    if (gName) {
      viewGuildProfile(gName);
    }
  });
}

// Expose guild profile globally
window.viewGuildProfile = viewGuildProfile;

// ==========================================
// NAVIGATION PUZZLE SOLVER
// ==========================================
function initPuzzleSolver() {
  const connections = {
    21: [5, 12], 22: [15, 17], 23: [1, 9], 24: [14, 17], 25: [2, 15],
    16: [15, 10], 17: [15, 22], 18: [9, 4], 19: [25, 17], 20: [9, 3],
    11: [20, 7], 12: [7, 18], 13: [16, 12], 14: [21, 15], 15: [1, 22],
    6: [9, 7], 7: [9, 6], 8: [19, 22], 9: [7, 21], 10: [22, 24],
    1: [16, 8], 2: [17, 13], 3: [6, 13], 4: [7, 23], 5: [11, 6],
  };

  const gridLayout = [
    [21, 22, 23, 24, 25],
    [16, 17, 18, 19, 20],
    [11, 12, 13, 14, 15],
    [6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5],
  ];

  let origin = null;
  let destination = null;

  const gridContainer = document.getElementById("puzzle-grid");
  const instructionEl = document.getElementById("puzzle-instruction");
  const errorBox = document.getElementById("puzzle-error-box");
  const directionsBox = document.getElementById("puzzle-directions-box");
  const arrowsContainer = document.getElementById("puzzle-arrows-container");
  const pathTextEl = document.getElementById("puzzle-path-text");
  const resetBtn = document.getElementById("puzzle-reset-btn");

  if (!gridContainer) return;

  // Render grid cells
  function renderGrid() {
    gridContainer.innerHTML = "";
    
    // Flatten and render grid layout
    gridLayout.flat().forEach(nodeId => {
      const cell = document.createElement("button");
      cell.className = "puzzle-cell";
      cell.setAttribute("data-node-id", nodeId);
      
      const idSpan = document.createElement("span");
      idSpan.className = "puzzle-cell-id";
      idSpan.textContent = nodeId;
      cell.appendChild(idSpan);
      
      const targetsDiv = document.createElement("div");
      targetsDiv.className = "puzzle-cell-targets";
      connections[nodeId].forEach(target => {
        const targetSpan = document.createElement("span");
        targetSpan.textContent = target;
        targetsDiv.appendChild(targetSpan);
      });
      cell.appendChild(targetsDiv);

      cell.addEventListener("click", () => handleCellClick(nodeId));
      gridContainer.appendChild(cell);
    });
  }

  function handleCellClick(nodeId) {
    if (origin === null) {
      origin = nodeId;
      updateUI();
    } else if (destination === null && nodeId !== origin) {
      destination = nodeId;
      updateUI();
    }
  }

  function handleReset() {
    origin = null;
    destination = null;
    updateUI();
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", handleReset);
  }

  // BFS Algorithm to find shortest path
  function findPath(start, end) {
    if (start === end) return [start];
    
    const queue = [[start]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];
      const neighbors = connections[current];
      
      if (!neighbors) continue;
      
      for (const neighbor of neighbors) {
        if (neighbor === end) {
          return [...path, neighbor];
        }
        
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
    
    return null;
  }

  // Get direction (left or right)
  function getDirection(current, next) {
    const options = connections[current];
    if (!options) return null;
    if (options[0] === next) return "left";
    if (options[1] === next) return "right";
    return null;
  }

  function updateUI() {
    // Reset classes on all grid cells
    document.querySelectorAll(".puzzle-cell").forEach(cell => {
      const nodeId = parseInt(cell.getAttribute("data-node-id"));
      cell.className = "puzzle-cell";
      cell.disabled = (origin !== null && destination !== null);
      
      if (nodeId === origin) {
        cell.classList.add("origin");
      } else if (nodeId === destination) {
        cell.classList.add("destination");
      }
    });

    // Reset feedback boxes
    if (errorBox) errorBox.classList.add("hidden");
    if (directionsBox) directionsBox.classList.add("hidden");

    if (origin === null) {
      if (instructionEl) instructionEl.textContent = "Selecciona el nodo de origen";
    } else if (destination === null) {
      if (instructionEl) instructionEl.textContent = "Selecciona el nodo de destino";
    } else {
      // Both selected, calculate path
      const path = findPath(origin, destination);
      if (path) {
        // Highlight path cells (excluding origin/destination for distinct styling)
        const pathSet = new Set(path);
        document.querySelectorAll(".puzzle-cell").forEach(cell => {
          const nodeId = parseInt(cell.getAttribute("data-node-id"));
          if (pathSet.has(nodeId) && nodeId !== origin && nodeId !== destination) {
            cell.classList.add("path-highlight");
          }
        });

        // Generate directions list
        const directions = [];
        for (let i = 0; i < path.length - 1; i++) {
          const dir = getDirection(path[i], path[i + 1]);
          if (dir) directions.push(dir);
        }

        if (instructionEl) {
          instructionEl.textContent = `${directions.length} movimientos necesarios`;
        }

        // Render direction arrows
        if (arrowsContainer) {
          arrowsContainer.innerHTML = "";
          directions.forEach(dir => {
            const arrow = document.createElement("div");
            if (dir === "left") {
              arrow.className = "puzzle-arrow left-arrow";
              arrow.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
              arrow.title = "Izquierda";
            } else {
              arrow.className = "puzzle-arrow right-arrow";
              arrow.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
              arrow.title = "Derecha";
            }
            arrowsContainer.appendChild(arrow);
          });
        }

        if (pathTextEl) {
          pathTextEl.textContent = path.join(" → ");
        }
        if (directionsBox) {
          directionsBox.classList.remove("hidden");
        }
      } else {
        if (instructionEl) {
          instructionEl.textContent = "Sin ruta encontrada";
        }
        if (errorBox) {
          errorBox.classList.remove("hidden");
        }
      }
    }
  }

  renderGrid();
  updateUI();
}

