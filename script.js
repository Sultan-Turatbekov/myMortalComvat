// Создать class Него с полями name, hp, mana, attack, armor.
// Создать class Knight который унаследован от Него
// B Knight создать функцию в heal которая увеличивает р на 100 при этом не может быть увелиена больше максимального.
// B Knight создать функцио shield которая увеличивает броню на 30.
// B Knight создать функцио ultimate которая увеличивает attack в 3 раза при этом расходует ману на 50.
// Создать class Boss который унаследован от Hero
// B Boss создать функцию rage которая увеличивает attack в 2 раза.
// Создать экземпляр класса Knight с характеристиками hp = 1000, mana = 200, attack = 100,armor = 5
// Создать экземпляр класса Boss с характеристиками hp = 5000, mana = 0, attack = 50, armor = 0
// B html должен быть отписованы все характеристики Knight и Boss 2 колонки
class Hero {
  constructor(name, hp, mana, attack, armor) {
    this.name = name;
    this.maxhp = hp;
    this.hp = this.maxhp;
    this.mana = mana;
    this.attack = attack;
    this.armor = armor;
  }

  render(element) {
    const heroInfo = document.querySelector(element);
    heroInfo.innerHTML = `
      <p>name: ${this.name}</p>
      <p>name: ${this.health}</p>
      <p>name: ${this.energy}</p>
      <p>name: ${this.armor}</p>
    `;
  }
}

class Knight extends Hero {
  constructor(name, hp, mana, attack, armor) {
    super(name, hp, mana, attack, armor);
    this.ultimateCount = 0;
  }

  heal() {
    this.hp += 100;
    if (this.hp > this.maxhp) {
      this.hp = 1000;
    }
  }

  shield() {
    this.armor += 30;
  }

  ultimate() {
    if (this.mana >= 50) {
      this.attack *= 3;
      this.mana -= 50;
    } else {
      console.log("You don't have mana");
    }
  }
}

class Boss extends Hero {
  constructor(name, hp, mana, attack, armor) {
    super(name, hp, mana, attack, armor);
  }

  rage() {
    this.attack *= 2;
  }
}

const knight = new Knight("Adil Prince", 1000, 200, 100, 5);
const boss = new Boss("Sula Boss", 5000, 0, 50, 0);

function show(elementId, character) {
  const element = document.getElementById(elementId);
  element.innerHTML = `<h2 class="name">${character.name}</h2>
                      <p class="HP-Mana">HP: ${character.hp} | Mana: ${character.mana}</p>
                      <p class="AttackArmor">Attack: ${character.attack} | armor: ${character.armor}</p>`;
}

show("knightStats", knight);
show("bossStats", boss);
let healUsedGlobal = false;

const dmg = document.querySelector(".damageBTN");
const attackSound = document.getElementById("attackSound");
const ultradmg = document.querySelector(".ultraDamageBTN");
const shieldSound = document.getElementById("shieldSound");
const shield = document.querySelector(".shieldBTN");
const healdSound = document.getElementById("healSound");
const heal = document.querySelector(".healBTN");
const restart = document.querySelector(".restart");

const erorSound = document.getElementById("erorSound");
const winSound = document.getElementById("winSound");
const lostSound = document.getElementById("lostSound");


// Функция для обновления характеристик на странице
function updateStats() {
  show("knightStats", knight);
  show("bossStats", boss);
  console.log(`Knight HP: ${knight.hp} | Boss HP: ${boss.hp}`);

  // Проверяем условие на конец игры (например, когда здоровье одного из персонажей становится меньше или равно 0)
  if (knight.hp <= 0) {
    playLostSound()
    alert("Game Over! Boss Wins!");
    
  } else if (boss.hp <= 0) {
    playWinSound()
    alert("Congratulations! You defeated the Boss!");
    
  }
}

// Обработчик события для кнопки атаки
dmg.addEventListener("click", () => {
  knight.attackBoss(boss);
  boss.attackKnight(knight);
  updateStats();
  playAttackSound();
});

// Добавляем методы атаки для Knight и Boss
Knight.prototype.attackBoss = function (enemy) {
  const damageDealt = this.attack - enemy.armor;
  enemy.hp -= damageDealt;
};

function playAttackSound() {
  attackSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  attackSound.play();
}

function playUltraDmgSound() {
  attackSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  attackSound.play();
}

function playShieldSound() {
  shieldSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  shieldSound.play();
}

function playHealSound() {
  healdSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  healdSound.play();
}

function playGameoverSound() {
  attackSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  attackSound.play();
}

function playShieldCrashSound() {
  attackSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  attackSound.play();
}

function playErorSound() {
  erorSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  erorSound.play();
}

function playWinSound() {
  winSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  winSound.play();
}

function playLostSound() {
  lostSound.currentTime = 0; // Сбрасываем время воспроизведения, чтобы возможно было проиграть звук снова
  lostSound.play();
}

Boss.prototype.attackKnight = function (enemy) {
  this.rage(); // Проверка критического удара перед атакой

  if (!enemy.skipTurn && !enemy.healUsed) {
    const damageDealt = this.attack - enemy.armor;
    enemy.hp -= damageDealt;
    enemy.checkArmorReduction(); // Проверка на уменьшение брони с шансом
    updateStats(); // Обновление характеристик после атаки
  } else if (enemy.healUsed) {
    console.log(`${enemy.name} used Heal! Boss skipped the turn!`);
    enemy.healUsed = false; // Снимаем флаг использования лечения
  } else {
    console.log(`${enemy.name} skipped the turn!`);
    enemy.skipTurn = false;
  }

  if (this.criticalHit) {
    this.attack /= 2; // Возвращаем урон к исходному после критического удара
    this.criticalHit = false; // Деактивируем критический удар
  }
};

Boss.prototype.rage = function () {
  if (Math.random() <= 0.1 && !this.criticalHit) { // Шанс критического удара 10%
    this.attack *= 2;
    this.criticalHit = true;
    console.log(`${this.name} used Rage! Critical Hit! Attack doubled.`);
  }
};

ultradmg.addEventListener("click", () => {
  knight.useUltimate();
  boss.attackKnight(knight);
  updateStats();
  playUltraDmgSound()
});

// Добавляем метод использования ультра-урона для рыцаря
Knight.prototype.useUltimate = function () {
  if (this.mana >= 50 && this.ultimateCount < 1) {
    this.attack *= 3;
    this.mana -= 50;
    this.ultimateCount++;
    console.log(`${this.name} used Ultimate! Attack increased threefold!`);

    this.skipTurn = true;
  } else if (this.ultimateCount >= 1) {
    console.log("Cannot use Ultimate. Already used three times.");
  } else {
    console.log("Not enough mana for Ultimate!");
  }
};

shield.addEventListener('click', () => {
  knight.useShield();
  boss.attackKnight(knight);
  updateStats();
});


// Добавляем метод использования щита для рыцаря
Knight.prototype.useShield = function () {
  if (!this.shieldUsed) {
    this.armor += 30;
    this.shieldUsed = true;
    console.log(`${this.name} used Shield! Armor increased by 30.`);
    playShieldSound()
  } else {
    console.log("Cannot use Shield. Already used.");
    playErorSound()
  }
};

// Добавляем метод проверки на уменьшение брони с шансом
Knight.prototype.checkArmorReduction = function () {
  if (Math.random() <= 0.09) { // Шанс уменьшения брони 10-15%
    this.armor -= 10;
    playShieldCrashSound()
    if(this.armor<0){
      this.armor=0
    }
    console.log(`${this.name}'s Shield weakened! Armor decreased by 10.`);
  }
};

heal.addEventListener('click', () => {
  knight.heal();
  boss.attackKnight(knight);
  updateStats();
  
});

// ... (ваш существующий код)

// Добавляем метод лечения для рыцаря
Knight.prototype.heal = function () {
  if (!this.healUsed && !healUsedGlobal) {
    const healingAmount = Math.floor(Math.random() * (500 - 100 + 1)) + 100; // Рандомное количество лечения от 100 до 500
    if(this.hp>=this.maxhp){
      this.hp=this.maxhp
    }else{
      this.hp+=healingAmount
    }
    healUsedGlobal = true;
    this.healUsed = true;
    console.log(`${this.name} used Heal! Restored ${healingAmount} HP.`);
    playHealSound()
    this.skipTurn = true; 
  } else {
    console.log("Cannot use Heal. Already used.");
    playErorSound()
  }
};
