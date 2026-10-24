// Кнопка меняет класс страницы, а цвета задаются в CSS.
const themeButtonEl = document.querySelector("#theme-button");

let isDawn = false;

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

themeButtonEl.addEventListener("click", changePalette);
