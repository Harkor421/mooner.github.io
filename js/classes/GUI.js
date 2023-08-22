// Your main game code and logic here...

// Global variable for padding
let gameContainerPadding = 30;

// Function to update the altitude counter
function updateAltitudeCounter(altitude) {
  // Round down the altitude value to remove decimal points and get the absolute value
  const roundedAltitude = Math.abs(Math.floor(altitude));

  const altitudeCounter = document.querySelector('.altitude-counter');
  altitudeCounter.textContent = `Altitude: ${roundedAltitude} meters`;
}


// Get the image element by its class name
const dogecoinImage = document.querySelector('.dogecoin');

const flame = document.querySelector('.flame');

// Function to make the image appear
function showDogecoinImage() {
  dogecoinImage.classList.remove('hidden-image');
}

// Function to make the image disappear
function hideDogecoinImage() {
  dogecoinImage.classList.add('hidden-image');
}


function hideFlame() {
  flame.classList.add('hidden-image');
}

function showFlame() {
  flame.classList.remove('hidden-image');
}


// Function to update the altitude counter
function updatedogecounter(altitude) {
    // Round down the altitude value to remove decimal points and get the absolute value
    const roundedAltitude = Math.abs(Math.floor(altitude));
  
    const altitudeCounter = document.querySelector('.dogecounter');
    altitudeCounter.textContent = altitude;

    
  }

// Function to update the health bar with health percentage
function updateHealthBar(health, maxHealth) {
  // Calculate the health percentage
  const healthPercentage = (health / maxHealth) * 100;

  const healthBar = document.querySelector('.health-bar');

  // Set a shorter width for the health bar while maintaining proportions
  const shorterWidth = 30; // Adjust this value to make the health bar shorter
  const newWidth = (shorterWidth / 100) * healthPercentage;
  healthBar.style.width = `${newWidth}%`;

  // Set a fixed height for the health bar
  healthBar.style.height = '10px';

  // Change the color of the health bar based on the health percentage
  if (healthPercentage >= 70) {
    healthBar.style.backgroundColor = '#00ff00'; // Green color for health >= 70%
  } else if (healthPercentage >= 30) {
    healthBar.style.backgroundColor = '#ffff00'; // Yellow color for health >= 30% and < 70%
  } else {
    healthBar.style.backgroundColor = '#ff0000'; // Red color for health < 30%
  }
}



// Function to update the game container padding
function updateGameContainerPadding() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.style.padding = `${gameContainerPadding}px`;
}

// Example usage: Update the game container padding, altitude counter, and health bar
gameContainerPadding = 40; // Set a new value for padding
updateGameContainerPadding();

const initialAltitude = -123.456; // Example initial altitude value
updateAltitudeCounter(initialAltitude); // Call this function whenever the altitude changes in your game logic

const initialHealth = 100; // Example initial health value
const maxHealth = 100; // Example maximum health value
updateHealthBar(initialHealth, maxHealth); // Call this function whenever the health changes in your game logic
