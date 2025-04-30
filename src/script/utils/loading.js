const loadingSpinner = document.createElement("div");
loadingSpinner.className = "loading";

const loadingContainer = document.createElement("div");
loadingContainer.className = "loading-container";
loadingContainer.appendChild(loadingSpinner);

function initLoading(container) {
  if (!container) {
    console.error("Container not found to insert loading");
    return;
  }
  document.body.insertBefore(loadingContainer, container);
}

function showLoading() {
  loadingSpinner.classList.add("active");
}

function hideLoading() {
  loadingSpinner.classList.remove("active");
}

export { initLoading, showLoading, hideLoading };
