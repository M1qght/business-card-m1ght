// Кнопка меняет класс страницы, а цвета задаются в CSS.
const themeButtonEl = document.querySelector("#theme-button");
const aboutButtonEl = document.querySelector("#about-button");
const aboutTextEl = document.querySelector("#about-text");

let isDawn = false;
let isAboutOpen = false;

function changePalette() {
   if (isDawn === false) {
      document.body.classList.add("theme-dawn");
      themeButtonEl.textContent = "Палитра: рассвет";
      isDawn = true;
   } else {
      document.body.classList.remove("theme-dawn");
      themeButtonEl.textContent = "Палитра: ночь";
      isDawn = false;
   }
}

function showAbout() {
   if (isAboutOpen === false) {
      aboutTextEl.classList.remove("hidden");
      aboutButtonEl.textContent = "Скрыть описание";
      isAboutOpen = true;
   } else {
      aboutTextEl.classList.add("hidden");
      aboutButtonEl.textContent = "Что я изучаю?";
      isAboutOpen = false;
   }
}

themeButtonEl.addEventListener("click", changePalette);
aboutButtonEl.addEventListener("click", showAbout);
