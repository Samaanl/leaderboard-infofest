// Configuration - Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxdqya2kM_CZ0GoEwNGTvnva3qdXPS7hBc81PKkfJ829-kdvNdrxa4EeET1TB0onBrM/exec";

// DOM elements
const loadingElement = document.getElementById("loading");
const leaderboardElement = document.getElementById("leaderboard");
const errorElement = document.getElementById("error-message");
const leaderboardBody = document.getElementById("leaderboard-body");
const lastUpdatedElement = document.getElementById("last-updated");

// Load leaderboard data
async function loadLeaderboard() {
  try {
    // Show loading state
    showLoading();

    // Add rotation animation to refresh button
    const refreshIcon = document.querySelector(".refresh-btn i");
    refreshIcon.style.animation = "spin 1s linear infinite";

    // Try different methods to fetch data
    let data;

    try {
      // Method 1: Simple fetch with cache busting
      const response = await fetch(GOOGLE_SHEET_URL + "?v=" + Date.now());

      if (response.ok) {
        data = await response.json();
        console.log("✅ Successfully loaded data from Google Sheets");
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

      // Show demo data instead
      throw new Error("CORS blocked - using demo data");
    }

    // Sort data by points (descending) and then by wins (descending)
    const sortedData = data.sort((a, b) => {
      if (b.Points !== a.Points) {
        return b.Points - a.Points;
      }
      return b.Wins - a.Wins;
    });

    // Populate the leaderboard
    populateLeaderboard(sortedData);

    // Update last updated time
    updateLastUpdatedTime();

    // Show success state
    showLeaderboard();
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    console.log(
      "🎮 Don't worry! Loading demo data so you can see the design..."
    );
    console.log(
      "📋 To fix this: Either open index.html directly or deploy to a web server"
    );

    // Fall back to demo data when Google Sheets fails
    loadDemoData();
  } finally {
    // Remove refresh button animation
    const refreshIcon = document.querySelector(".refresh-btn i");
    refreshIcon.style.animation = "";
  }
}

// JSONP fallback method
function fetchWithJSONP(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

    // Create script element
    const script = document.createElement("script");
    script.src =
      url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;

    // Set up callback
    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    // Handle errors
    script.onerror = function () {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error("JSONP request failed"));
    };

    // Add script to page
    document.body.appendChild(script);

    // Timeout after 10 seconds
    setTimeout(() => {
      if (window[callbackName]) {
        delete window[callbackName];
        document.body.removeChild(script);
        reject(new Error("JSONP request timeout"));
      }
    }, 10000);
  });
}

// Show loading state
function showLoading() {
  loadingElement.style.display = "flex";
  leaderboardElement.style.display = "none";
  errorElement.style.display = "none";
}

// Show leaderboard
function showLeaderboard() {
  loadingElement.style.display = "none";
  leaderboardElement.style.display = "block";
  errorElement.style.display = "none";
}

// Show error state
function showError() {
  loadingElement.style.display = "none";
  leaderboardElement.style.display = "none";
  errorElement.style.display = "flex";
}

// Populate leaderboard table
function populateLeaderboard(data) {
  leaderboardBody.innerHTML = "";

  data.forEach((player, index) => {
    const rank = index + 1;
    const row = createPlayerRow(rank, player);
    leaderboardBody.appendChild(row);
  });
}

// Create a player row
function createPlayerRow(rank, player) {
  const row = document.createElement("tr");

  // Calculate win rate
  const winRate =
    player["Matches Played"] > 0
      ? Math.round((player.Wins / player["Matches Played"]) * 100)
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
                <span class="mobile-stats">
                    ${player["Matches Played"]}M • ${player.Wins}W • ${winRate}%
                </span>
            </div>
        </td>
        <td class="desktop-only">${player["Matches Played"]}</td>
        <td class="desktop-only">
            ${player.Wins}
            <span class="win-rate">(${winRate}%)</span>
        </td>
        <td class="points-cell">${player.Points}</td>
    `;

  return row;
}

// Get rank display with medals for top 3
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

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Update last updated time
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

// Auto-refresh functionality
function startAutoRefresh(intervalMinutes = 5) {
  setInterval(() => {
    loadLeaderboard();
  }, intervalMinutes * 60 * 1000);
}

// Demo data for testing - using your actual data format
function loadDemoData() {
  const demoData = [
    {
      Rank: 1,
      "Player Name": "samaan",
      "Matches Played": 3,
      Wins: 3,
      Points: 100,
    },
    {
      Rank: 3,
      "Player Name": "vivek",
      "Matches Played": 3,
      Wins: 1,
      Points: 21,
    },
    {
      Rank: 2,
      "Player Name": "sanjeet",
      "Matches Played": 7,
      Wins: 0,
      Points: 12,
    },
  ];

  // Sort data by points (descending) and then by wins (descending)
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

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  // Always try to load from Google Sheet first, fall back to demo data on error
  loadLeaderboard();

  // Start auto-refresh every 5 minutes
  startAutoRefresh(5);
});

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  // Press 'R' to refresh
  if (event.key === "r" || event.key === "R") {
    if (!event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      loadLeaderboard();
    }
  }
});

// Add mobile stats styling
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
