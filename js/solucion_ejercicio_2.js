//Ejercicio de practica Javascript

// Objeto base para los personajes
class Character {
  constructor(name, health, damage) {
    // Atributos
    this.name = name;
    this.health = health;
    this.maxhealth = health;
    this.damage = damage;
  }
  // Verifica si el personaje esta vivo
  isAlive() {
    return this.health > 0;
  }

  // Ataca a otro personaje seleccionado
  attack(target) {
    const damage = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    document.getElementById( this.name ).innerHTML += `${this.name} deals ${damage} DMG to ${target.name} <br>`;
    console.log(`${this.name} deals ${damage} DMG to ${target.name}`);
    target.health -= damage;
    this.getHealthPercentage();
    this.updateHealthBar();
    target.getHealthPercentage();
    target.updateHealthBar();
  }

  // Retorna la información actual del personaje
  status() {
    return `${this.name} - HP ${this.health}/${this.maxhealth}`;
  }
  
  // Calcula la vida como un porcentaje del caracter 
  getHealthPercentage(){
   return ( this.health / this.maxhealth ) * 100;
  }

  // Actualiza la barra de vida del personaje
  updateHealthBar(){
    const healthBar = document.getElementById(`${this.name}-health`);
    if (this.health < 0) {
      this.health = 0;
      healthBar.style.backgroundColor = "red";
    }
    healthBar.style.width = `${(this.health / this.maxhealth) * 100}%`;  }
}

//Creación de personajes
const hero =  new Character("Heroe", 100, 110);
const enemy = new Character("Limo", 500, 40);

let gameOver = false; 

//Función que inicializa el juego 
const gameLoop = () => {
  window.alert("La pelea empieza!!! Presiona x para atacar al enemigo, presiona n para que el enemigo ataque")
  
  document.addEventListener("keydown", function(event) {

    if( gameOver ) {
      alert("The game is over. Refresh the page to play again")
      return;
    }

    if (event.key === "x") {
      hero.attack(enemy);
      checkGameStatus();
    } else if (event.key === "n") {
      enemy.attack(hero);
      checkGameStatus();
    }
  });
}

// Comprueba el estado del juego para determinar si el juego ha terminado
const checkGameStatus = () => {
  if (!enemy.isAlive()) {
    alert("You win!");
    gameOver = true;
  } else {
    if (!hero.isAlive()) {
      alert("You lose! Game Over!");
      gameOver = true;
    }
  }
}


// Se lanza el juego
gameLoop();