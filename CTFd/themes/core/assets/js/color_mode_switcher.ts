type ColorTheme = "dark" | "light";

/** The user's past choice, falling back to the browser preference. */
function getPreferredTheme(): ColorTheme {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }
  // Firefox with 'resistFingerprint' activated always returns light
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Update navbar icon to match the given theme. */
function showActiveTheme(theme: ColorTheme) {
  const activeThemeIcon = document.querySelector(".theme-switch i.fas");
  activeThemeIcon?.classList.toggle("fa-moon", theme === "dark");
  activeThemeIcon?.classList.toggle("fa-sun", theme !== "dark");
}

function applyTheme(theme: ColorTheme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
}

// Change body theme early to prevent flash
let currentTheme = getPreferredTheme();
applyTheme(currentTheme);

// On browser color-scheme change, update
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  currentTheme = getPreferredTheme();
  applyTheme(currentTheme);
  showActiveTheme(currentTheme);
});

window.addEventListener("load", () => {
  showActiveTheme(currentTheme);

  // On button click, switch
  document.querySelectorAll(".theme-switch").forEach(element => {
    element.addEventListener("click", event => {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(currentTheme);
      localStorage.setItem("theme", currentTheme);
      showActiveTheme(currentTheme);
      event.preventDefault();
    });
  });
});
