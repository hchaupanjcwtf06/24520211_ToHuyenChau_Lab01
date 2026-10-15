const themeButton = document.querySelector("#theme-btn");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute(
    "aria-pressed",
    String(theme === "dark")
  );
}

const savedTheme = localStorage.getItem("theme");
const initialTheme =
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : "light";

applyTheme(initialTheme);

themeButton.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.dataset.theme;

  const nextTheme =
    currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});