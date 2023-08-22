

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

    

