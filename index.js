const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const aimingSensitivity = 0.1; // Adjust the value as needed

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
}



const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
        })
      )
    }
  })
})

gravity = 0.1

const player = new Player({
  position: {
    x: 100,
    y: 15850,
  },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: './img/pepe/idlegame.png',
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: './img/pepe/idlegame.png',
      frameRate: 8,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: './img/pepe/rungame.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: './img/pepe/saltogame.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: './img/pepe/saltogame.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: './img/pepe/saltogameleft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    RunLeft: {
      imageSrc: './img/pepe/rungameleft.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    IdleLeft: {
      imageSrc: './img/pepe/idlegameleft.png',
      frameRate: 8,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: './img/pepe/saltogameleft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
  },
})



const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  f:{
    pressed: false,
  },
}

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/verticalPlatformer.png',
})

const background2 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/gameover.png',
})



const backgroundImageHeight = 16000

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
}

const cohete1 = new Cohete({
  position: { x: 9000, y: 15900 },
  width: 50,
  height: 100,
  imageSrc: "./img/cohete.png",
  // Other properties for the game object...
});



const doge = new SuperJump({
  position: { x: 200, y: 15900 },
  width: 25,
  height: 25,
  imageSrc: "./img/dogecoin.png",
  // Other properties for the game object...
});

const flamethrower = new Flamethrower({
  position: { x: 300, y: 15900 },
  width: 35,
  height: 15,
  imageSrc: "./img/flamethrower.png",

});



const enemy1 = new Enemy({
  position: { x: 300, y: 15800 },
  width: 40,
  height: 40,
  imageSrc: "./img/drone.gif",
  moveRadius: 300,
  triggerdistance: 40,
  health: 20,
});

const uganda1 = new Uganda({
  position: { x: 300, y: 14850 },
  width: 80,
  height: 80,
  imageSrc: "./img/uganda.png",
  moveRadius: 400,
  triggerdistance: 80,
  health: 100,
});


const startButtonColors = ['black', 'purple', 'navi']; // Colors for the button to cycle through
const startButton = new Button(
  450,
  500,
  120,
  40,
  startButtonColors,
  'Play Again',
  () => {
    gamestate = 0; // Change the game state to start playing again
    maxheight = 1;
    resetgame();
  }
);






gamestate = 0;

maxheight = 1;
hideDogecoinImage();

function animate() { //MAIN LOOP

  switch (gamestate){

    case 0: 
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.save()
    c.scale(4, 4)
    c.translate(camera.position.x, camera.position.y)
  
    background.update()
    updateHealthBar(player.health, 100); //Updates GUI for healthbar
    updateAltitudeCounter(player.position.y - 15898); //Updates GUI for altitude
    // In your game loop or update function:
    // First, update the hitbox for the game object
  
   ctx = canvas.getContext("2d");
  
  
  

    player.checkForHorizontalCanvasCollision()
    player.update(ctx)
    player.update2(ctx)
    player.checkProjectileCollisionsWithEnemy(uganda1)
    player.checkProjectileCollisionsWithEnemy(enemy1)
    enemy1.updateHitbox()
    enemy1.draw(ctx)
    enemy1.move(player)
    enemy1.shootProjectile(player)
    enemy1.checkProjectileCollisionsWithPlayer(player)
  
    if(uganda1.dead != true){
    uganda1.updateHitbox()
    uganda1.draw(ctx)
    uganda1.move(player)
    uganda1.shootProjectile(player)
    uganda1.drawHealthBar(ctx)
    uganda1.checkProjectileCollisionsWithPlayer(player)
    console.log("VIDA: " + uganda1.health)
    }
  
    cohete1.updateHitbox();
    doge.updateHitbox();
    cohete1.draw(ctx);
    doge.draw(ctx);
    cohete1.checkCollisionWithPlayer(player);
  
  
  
      // Update projectiles
      for (let i = 0; i < player.projectiles.length; i++) {
        const projectile = player.projectiles[i];
        projectile.update();
        projectile.draw(ctx);
      }
      flamethrower.updateHitbox()
      flamethrower.draw(ctx);
      flamethrower.checkCollisionWithPlayer(player);
    
  
    height = (player.position.y - 15898) * -1;
    
    if (maxheight < height) {
      maxheight = height;
    }
  
      if(player.dead == true){
        const hiddenVarInput = document.getElementById("maxheight");
        hiddenVarInput.value = Math.floor(maxheight);;
        drawText("High Score: " + maxheight + " meters", player.position.x, player.position.y, 16, ctx)
        gamestate = 1;
      }  
  
    player.velocity.x = 0
    if (keys.d.pressed) {
      player.switchSprite('Run')
      player.velocity.x = 1
      if(player.isjumping == false){
        playSound("./audio/correr.mp3")
      }
      player.lastDirection = 'right'
      player.shouldPanCameraToTheLeft({ canvas, camera })
    } else if (keys.a.pressed) {
      player.switchSprite('RunLeft')
      if(player.isjumping == false){
        playSound("./audio/correr.mp3")
      }
      player.velocity.x = -1
      player.lastDirection = 'left'
      player.shouldPanCameraToTheRight({ canvas, camera })
    } else if (player.velocity.y === 0) {
      if (player.lastDirection === 'right') player.switchSprite('Idle')
      else player.switchSprite('IdleLeft')
    }
  
    if (player.velocity.y < 0) {
      player.shouldPanCameraDown({ camera, canvas })
      if (player.lastDirection === 'right') player.switchSprite('Jump')
      else player.switchSprite('JumpLeft')
    } else if (player.velocity.y > 0) {
      player.shouldPanCameraUp({ camera, canvas })
      if (player.lastDirection === 'right') player.switchSprite('Fall')
      else player.switchSprite('FallLeft')
    }
  
    if(keys.f.pressed){
      player.shootProjectile();
    }
  
    c.restore()
    break;

    case 1:
      window.requestAnimationFrame(animate);
      ctx = canvas.getContext("2d");
      c.fillStyle = 'white';
      c.fillRect(0, 0, canvas.width, canvas.height);
      c.save();
      background2.update()
      const integerPart = Math.floor(maxheight);
      const text =  integerPart + " meters";
      const textWidth = ctx.measureText(text).width;

         // Show the game-over container and input field
        const gameoverContainer = document.querySelector('.game-over-container');
        gameoverContainer.classList.remove('hidden');

        // Handle playing again
        const playAgainButton = document.getElementById('playAgainButton');
        playAgainButton.addEventListener('click', () => {
          gameoverContainer.classList.add('hidden');
          location.reload();
        });

      // Draw the text in the middle of the screen
      drawBoldText(text, 470, 250, 16, "Arial", ctx);
      c.restore();

    break;
  
}

}


animate()



function resetgame(){
  player.dead = false;
  player.health = 100;
  player.position.x = 100
  player.position.y = 350;
}


canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const dx = mouseX - player.position.x;
  const dy = mouseY - player.position.y*0.012;

  player.shootingDirection = Math.atan2(dy, dx);
}); 




window.addEventListener('keydown', (event) => {
 if(player.dead == false){
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'f':
      keys.f.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 'w': // Check if the player is not already jumping
    if(player.isjumping == false){
      playSound("./audio/saltar.mp3")
      if(player.superjump == false){
      player.velocity.y = -4;
      }
      else{
      player.velocity.y = -4;
      timer.start()
      }
      player.audiocaer = false
      player.isjumping = true
    }
    break
  }
}
else{
  switch (event.key) {
    case 'e':
      resetgame()
      break
  }
}
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'f':
      keys.f.pressed = false
      break
  }
})


const timer = new Timer(10, {
  onStart: (duration) => {
    console.log(`Gravity set`);
    gravity = 0.08
  },
  onTick: (remainingTime) => {
    console.log(`Time remaining: ${remainingTime} seconds.`);
    updatedogecounter(`${remainingTime} seconds left`);
  },
  onComplete: () => {
    console.log('');
    timer.reset()
    player.superjump = false;
    gravity = 0.1
    hideDogecoinImage();
    updatedogecounter(" ");
  },
});

