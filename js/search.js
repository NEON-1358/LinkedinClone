const searchInput = document.getElementById("searchInput");
const searchDropdown = document.getElementById("searchDropdown");
const activeSearch = document.getElementById("activeSearch");

// Open dropdown
function openSearchDropdown() {
  document.body.classList.add("dimmed");
  searchDropdown.classList.remove("hidden");
  activeSearch.focus();
}

// Close dropdown
function closeSearchDropdown() {
  document.body.classList.remove("dimmed");
  searchDropdown.classList.add("hidden");
  activeSearch.value = "";
}

// When clicking the search bar
searchInput.addEventListener("click", openSearchDropdown);

// Click outside to close
document.addEventListener("click", (e) => {
  const isClickInside = searchDropdown.contains(e.target) || searchInput.contains(e.target);
  if (!isClickInside) closeSearchDropdown();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSearchDropdown();
});
