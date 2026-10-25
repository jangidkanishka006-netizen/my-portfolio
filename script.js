// Keep the JavaScript small and focused on the interactive parts of the page.

// Theme button: change a class on the page and remember the choice in this browser.
const themeButton = document.querySelector("#theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

function updateThemeButton() {
  const darkModeIsOn = document.body.classList.contains("dark-mode");
  themeButton.textContent = darkModeIsOn ? "☀️" : "🌙";
  themeButton.setAttribute("aria-label", darkModeIsOn ? "Switch to light mode" : "Switch to dark mode");
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const chosenTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", chosenTheme);
  updateThemeButton();
});

// Project search: hide cards whose text does not contain the search words.
const searchInput = document.querySelector("#project-search");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.querySelector("#empty-state");

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.trim().toLowerCase();
  let visibleProjectCount = 0;

  projectCards.forEach((card) => {
    const searchableText = `${card.textContent} ${card.dataset.search}`.toLowerCase();
    const matches = searchableText.includes(searchText);
    card.hidden = !matches;
    if (matches) visibleProjectCount += 1;
  });

  emptyState.hidden = visibleProjectCount > 0;
});

// Mobile navigation: open or close the menu when its button is tapped.
const menuButton = document.querySelector("#menu-toggle");
const navigationLinks = document.querySelector("#nav-links");

menuButton.addEventListener("click", () => {
  const menuIsOpen = navigationLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(menuIsOpen));
  menuButton.setAttribute("aria-label", menuIsOpen ? "Close menu" : "Open menu");
  menuButton.textContent = menuIsOpen ? "×" : "☰";
});

navigationLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigationLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.textContent = "☰";
  });
});
