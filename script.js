const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwaSsuexs6ll05BQfEmoTiCqFWn_L-kyRx9XjtueCPvTovYcBkwysE-BLrMXR0jnI1e/exec"; //this won't let me in trouble right?.... right????

const loadingElement = document.getElementById("loading");
const leaderboardElement = document.getElementById("leaderboard");
const errorElement = document.getElementById("error-message");
const leaderboardBody = document.getElementById("leaderboard-body");
const lastUpdatedElement = document.getElementById("last-updated");

async function loadLeaderboard() {
  try {
    showLoading();

    const refreshIcon = document.querySelector(".refresh-btn i");
    refreshIcon.style.animation = "spin 1s linear infinite";

    let data;

    try {
      const response = await fetch(GOOGLE_SHEET_URL + "?v=" + Date.now());

      if (response.ok) {
        data = await response.json();
        console.log("Successfully loaded data from Google Sheets");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (corsError) {
      console.log(
        "Direct fetch failed due to CORS. This is normal for local development."
      );
      console.log(
        "💡 Solution: Open the website directly (double-click index.html) or deploy to a real server."
      );

      throw new Error("CORS blocked - using demo data");
    }

    // Filter out rows with blank/empty player names
    const filteredData = data.filter((player) => {
      return (
        player["Player Name"] && player["Player Name"].toString().trim() !== ""
      );
    });

    const sortedData = filteredData.sort((a, b) => {
      if (b.Points !== a.Points) {
        return b.Points - a.Points;
      }
      return b.Wins - a.Wins;
    });

    populateLeaderboard(sortedData);

    updateLastUpdatedTime();

    showLeaderboard();
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    console.log(
      "Don't worry! Loading demo data so you can see the design..."
    );
    console.log(
      "To fix this: Either open index.html directly or deploy to a web server"
    );

    loadDemoData();
  } finally {
    const refreshIcon = document.querySelector(".refresh-btn i");
    refreshIcon.style.animation = "";
  }
}

function fetchWithJSONP(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

    const script = document.createElement("script");
    script.src =
      url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;

    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    script.onerror = function () {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error("JSONP request failed"));
    };

    document.body.appendChild(script);

    setTimeout(() => {
      if (window[callbackName]) {
        delete window[callbackName];
        document.body.removeChild(script);
        reject(new Error("JSONP request timeout"));
      }
    }, 10000);
  });
}

function showLoading() {
  loadingElement.style.display = "flex";
  leaderboardElement.style.display = "none";
  errorElement.style.display = "none";
}

function showLeaderboard() {
  loadingElement.style.display = "none";
  leaderboardElement.style.display = "block";
  errorElement.style.display = "none";
}

function showError() {
  loadingElement.style.display = "none";
  leaderboardElement.style.display = "none";
  errorElement.style.display = "flex";
}

function populateLeaderboard(data) {
  leaderboardBody.innerHTML = "";

  let currentRank = 1;
  let previousPoints = null;
  let previousWins = null;
  let playersWithSameRank = 0;

  data.forEach((player, index) => {

    if (previousPoints !== null) {
      if (player.Points === previousPoints && player.Wins === previousWins) {
        
        playersWithSameRank++;
      } else {
        currentRank += playersWithSameRank + 1;
        playersWithSameRank = 0;
      }
    }

    const row = createPlayerRow(currentRank, player, index);
    leaderboardBody.appendChild(row);

    previousPoints = player.Points;
    previousWins = player.Wins;
  });
}

function createPlayerRow(rank, player) {
  const row = document.createElement("tr");

  const winRate =
    player["Matches Played"] > 0
      ? Math.round((player.Wins / player["Matches Played"]) * 100)
      : 0;


  const killsPerMatch =
    player["Matches Played"] > 0
      ? (player.kills / player["Matches Played"]).toFixed(1)
      : 0;

  row.innerHTML = `
        <td class="rank-cell">
            ${getRankDisplay(rank)}
        </td>
        <td class="player-cell">
            <div class="player-info">
                <span class="player-name">${escapeHtml(
                  player["Player Name"]
                )}</span>
                <div class="mobile-stats">
                    <div class="stat-row">
                        <span class="stat-icon">⚔️</span>
                        <span class="stat-text">${player.kills} Kills</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">🎯</span>
                        <span class="stat-text">${player.Wins}W / ${
    player["Matches lost"]
  }L</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">📊</span>
                        <span class="stat-text">${winRate}% Win Rate</span>
                    </div>
                </div>
            </div>
        </td>
        <td class="desktop-only stats-cell">
            <span class="stat-value">${player.kills}</span>
            <span class="stat-label">${killsPerMatch}/match</span>
        </td>
        <td class="desktop-only">${player["Matches Played"]}</td>
        <td class="desktop-only wins-cell">
            <span class="stat-highlight">${player.Wins}</span>
        </td>
        <td class="desktop-only lost-cell">
            <span class="stat-lowlight">${player["Matches lost"]}</span>
        </td>
        <td class="desktop-only">
            <div class="win-rate-bar">
                <div class="win-rate-fill" style="width: ${winRate}%"></div>
                <span class="win-rate-text">${winRate}%</span>
            </div>
        </td>
        <td class="points-cell">
            <span class="points-value">${player.Points}</span>
            <span class="points-label">pts</span>
        </td>
    `;

  return row;
}

function getRankDisplay(rank) {
  switch (rank) {
    case 1:
      return '<i class="fas fa-crown" style="color: #ffd700;"></i> 1';
    case 2:
      return '<i class="fas fa-medal" style="color: #c0c0c0;"></i> 2';
    case 3:
      return '<i class="fas fa-medal" style="color: #cd7f32;"></i> 3';
    default:
      return rank;
  }
}


function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateLastUpdatedTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateString = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  lastUpdatedElement.textContent = `${dateString} at ${timeString}`;
}

function startAutoRefresh(intervalMinutes = 5) {
  setInterval(() => {
    loadLeaderboard();
  }, intervalMinutes * 60 * 1000);
}

//demo dataaaaa
function loadDemoData() {
  const demoData = [
    {
      Rank: 1,
      "Player Name": "Samaan",
      kills: 3,
      "Matches Played": 4,
      "Matches lost": 1,
      Wins: 2,
      Points: 26,
    },
    {
      Rank: 2,
      "Player Name": "Test subject",
      kills: 4,
      "Matches Played": 2,
      "Matches lost": 1,
      Wins: 1,
      Points: 17,
    },
    {
      Rank: 3,
      "Player Name": "sam",
      kills: 6,
      "Matches Played": 10,
      "Matches lost": 6,
      Wins: 4,
      Points: 69,
    },
    {
      Rank: 4,
      "Player Name": "saieel",
      kills: 10,
      "Matches Played": 4,
      "Matches lost": 1,
      Wins: 3,
      Points: 48,
    },
    {
      Rank: 5,
      "Player Name": "purab",
      kills: 13,
      "Matches Played": 10,
      "Matches lost": 5,
      Wins: 5,
      Points: 83,
    },
  ];

  const sortedData = demoData.sort((a, b) => {
    if (b.Points !== a.Points) {
      return b.Points - a.Points;
    }
    return b.Wins - a.Wins;
  });

  populateLeaderboard(sortedData);
  updateLastUpdatedTime();
  showLeaderboard();
}

document.addEventListener("DOMContentLoaded", function () {
  loadLeaderboard();

  startAutoRefresh(5);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    if (!event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      loadLeaderboard();
    }
  }
});


const goTopBtn = document.getElementById("goTopBtn");


window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    goTopBtn.classList.add("visible");
  } else {
    goTopBtn.classList.remove("visible");
  }
});


goTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const mobileStatsStyle = document.createElement("style");
mobileStatsStyle.textContent = `
    .player-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .player-name {
        font-weight: 600;
        color: #ffffff;
    }
    
    .mobile-stats {
        font-size: 0.8rem;
        color: #a0a9b8;
        font-weight: 400;
    }
    
    .win-rate {
        font-size: 0.8rem;
        color: #00f5d4;
        margin-left: 5px;
    }
    
    @media (min-width: 769px) {
        .mobile-stats {
            display: none;
        }
    }
    
    @media (max-width: 768px) {
        .player-info {
            gap: 2px;
        }
        
        .mobile-stats {
            display: block;
        }
    }
`;
document.head.appendChild(mobileStatsStyle);
