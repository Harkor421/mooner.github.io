

function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}

function platformCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <=
      object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}

function playSound(audioName){
  let audio = new Audio(audioName)
  audio.play();
  return audio;
}

function drawBoldText(text, x, y, fontSize, fontFamily, ctx) {
  ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
  ctx.fillText(text, x, y);
}

function getRandomTrueWithProbability(probabilityPercentage) {
  // Check if the probability percentage is valid (between 0 and 100)
  if (probabilityPercentage < 0 || probabilityPercentage > 100) {
    throw new Error('Invalid probability percentage. It should be between 0 and 100.');
  }

  // Generate a random number between 0 and 100
  const randomNumber = Math.random() * 100;

  // Return true if the random number is less than the probability percentage
  return randomNumber < probabilityPercentage;
}
     // Function to draw multiple letters on the canvas
     function drawText(text, x, y, fontSize, ctx) {
      ctx.font = fontSize + 'px Arial';
      ctx.fillText(text, x, y);
    }



// Define an array to store enemy objects
const enemies = [];

// Function to spawn an enemy at a specific Y position
function spawnEnemyAtY(yPosition) {
  const randomX = Math.random() * canvas.width;
  const enemy = new Enemy({
    position: { x: randomX, y: yPosition },
    width: 40,
    height: 40,
    imageSrc: "./img/drone.gif",
    moveRadius: 300,
    triggerdistance: 40,
    health: 20,
  });
  enemies.push(enemy);
}


// ...

// ...

// Specify the Y position decrement (every -50 pixels)
const yDecrement = -50; // Changed to negative value

// Define the starting Y position
let currentY = 16000; // Starting at Y = 16000

// Define the probability of spawning an enemy (adjust as needed)
const spawnProbability = 0.2; // Adjust this value (0.0 - 1.0) to control the probability

// Function to determine if an enemy should be spawned based on probability
function shouldSpawnEnemy() {
  return Math.random() < spawnProbability;
}

// Function to fill the world with enemies with reduced probability
function fillWorldWithEnemies() {
  while (currentY >= 1) { // Continue until Y reaches 1
    if (shouldSpawnEnemy()) { // Check probability before spawning
      spawnEnemyAtY(currentY);
    }
    currentY += yDecrement; // Decrement Y with a negative value (move upwards)
  }
}


// Function to update and draw all enemies in the array
function updateEnemies(ctx) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.updateHitbox();
    enemy.draw(ctx);
    enemy.move(player);
    enemy.shootProjectile(player);
    enemy.checkProjectileCollisionsWithPlayer(player);

    // Remove enemies that are out of bounds or have no health
    if (enemy.position.x < -enemy.width || enemy.position.y < -enemy.height || enemy.health <= 0) {
      enemies.splice(i, 1);
      i--;
    }
  }
}


