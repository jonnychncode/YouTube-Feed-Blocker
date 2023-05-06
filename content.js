// Add a new variable to store the blocking state
let isBlocked = true;

// Use this function to apply the blocking or unblocking of elements
function applyBlockingState() {
  const feed = document.querySelector("#contents");
  if (feed) {
    feed.style.display = isBlocked ? "none" : "block";
  }

  const recommendations = document.querySelectorAll(".ytd-compact-video-renderer");
  recommendations.forEach(recommendation => {
    recommendation.style.display = isBlocked ? "none" : "block";
  });
}

// Run the applyBlockingState function initially to block content
applyBlockingState();

// Reapply the blocking state when the page content changes
const observer = new MutationObserver(function () {
  applyBlockingState();
});

observer.observe(document.body, { childList: true, subtree: true });

// Modify the message listener to update the isBlocked variable
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.unblock) {
    isBlocked = false;
    applyBlockingState();
  }
});
