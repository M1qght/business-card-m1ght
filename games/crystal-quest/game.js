// Данные похода хранятся в объектах. Кнопки меняют их,
// а renderGame выводит здоровье, счётчики и доступные действия на страницу.
const heroHealthEl = document.querySelector("#hero-health");
const enemyHealthEl = document.querySelector("#enemy-health");
const heroBarEl = document.querySelector("#hero-bar");
const enemyBarEl = document.querySelector("#enemy-bar");
const enemyNameEl = document.querySelector("#enemy-name");
const enemyHintEl = document.querySelector("#enemy-hint");
const turnEl = document.querySelector("#turn");
const crystalsEl = document.querySelector("#crystals");
const potionsEl = document.querySelector("#potions");
const messageEl = document.querySelector("#message");
const attackButtonEl = document.querySelector("#attack-button");
const shieldButtonEl = document.querySelector("#shield-button");
const potionButtonEl = document.querySelector("#potion-button");
const restartButtonEl = document.querySelector("#restart-button");

const hero = {
   health: 100,
   potions: 2,
   crystals: 0,
};

const enemy = {
   health: 40,
   maxHealth: 40,
   number: 1,
   attacks: 0,
};

const game = {
   turn: 1,
   finished: false,
};

function getEnemyDamage() {
   if ((enemy.attacks + 1) % 3 === 0) {
      return 30;
   } else {
      return 16;
   }
}

function renderGame() {
   heroHealthEl.textContent = hero.health + " / 100";
   enemyHealthEl.textContent = enemy.health + " / " + enemy.maxHealth;
   enemyNameEl.textContent = "Слизень " + enemy.number + " / 3";
   turnEl.textContent = game.turn;
   crystalsEl.textContent = hero.crystals + " / 5";
   potionsEl.textContent = hero.potions;

   // Ширина полоски зависит от оставшегося здоровья в процентах.
   heroBarEl.style.width = hero.health + "%";
   enemyBarEl.style.width = enemy.health / enemy.maxHealth * 100 + "%";

   attackButtonEl.disabled = game.finished;
   shieldButtonEl.disabled = game.finished;
   potionButtonEl.disabled = game.finished || hero.potions === 0 || hero.health === 100;

   if (game.finished === true) {
      enemyHintEl.textContent = "Поход завершён. Можно попробовать ещё раз.";
   } else if (getEnemyDamage() === 30) {
      enemyHintEl.textContent = "Осторожно! Слизень готовит сильный удар: 30 урона.";
   } else {
      enemyHintEl.textContent = "Следующая атака слизня: 16 урона.";
   }
}

function finishTurn(isShield, actionText) {
   if (enemy.health <= 0) {
      enemy.health = 0;

      if (enemy.number === 1) {
         hero.crystals += 1;
      } else {
         hero.crystals += 2;
      }

      if (enemy.number === 3) {
         game.finished = true;
         messageEl.textContent = "Победа! Ты собрал все пять кристаллов и вернулся домой.";
      } else {
         enemy.number += 1;
         enemy.maxHealth += 30;
         enemy.health = enemy.maxHealth;
         enemy.attacks = 0;
         hero.health += 20;
         if (hero.health > 100) {
            hero.health = 100;
         }
         messageEl.textContent = "Слизень побеждён! Кристаллы собраны, здоровье +20 (до 100). Впереди следующий противник.";
      }
   } else {
      let damage = getEnemyDamage();
      if (isShield === true) {
         damage = 3;
      }

      hero.health -= damage;
      enemy.attacks += 1;
      messageEl.textContent = actionText + " В ответ слизень нанёс " + damage + " урона.";

      if (hero.health <= 0) {
         hero.health = 0;
         game.finished = true;
         messageEl.textContent = "Поход окончен: здоровье закончилось. Попробуй защищаться перед сильными ударами!";
      }
   }

   game.turn += 1;
   renderGame();
}

function attack() {
   if (game.finished === true) {
      return;
   }
   enemy.health -= 20;
   finishTurn(false, "Ты нанёс 20 урона.");
}

function useShield() {
   if (game.finished === true) {
      return;
   }
   enemy.health -= 8;
   finishTurn(true, "Ты выставил щит и нанёс 8 урона.");
}

function drinkPotion() {
   if (game.finished === true || hero.potions === 0 || hero.health === 100) {
      return;
   }
   hero.health += 30;
   if (hero.health > 100) {
      hero.health = 100;
   }
   hero.potions -= 1;
   finishTurn(false, "Ты выпил зелье и восстановил до 30 здоровья.");
}

function restartGame() {
   hero.health = 100;
   hero.potions = 2;
   hero.crystals = 0;
   enemy.health = 40;
   enemy.maxHealth = 40;
   enemy.number = 1;
   enemy.attacks = 0;
   game.turn = 1;
   game.finished = false;
   messageEl.textContent = "Ты у входа в пещеру. Первый слизень уже ждёт!";
   renderGame();
}

attackButtonEl.addEventListener("click", attack);
shieldButtonEl.addEventListener("click", useShield);
potionButtonEl.addEventListener("click", drinkPotion);
restartButtonEl.addEventListener("click", restartGame);

renderGame();
