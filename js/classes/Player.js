class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc,
    frameRate,    
    scale = 0.5,
    animations,
  }) {
    super({ imageSrc, frameRate, scale })
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    }
    this.isjumping = false
    this.health = 10000;
    this.projectiles = [];
    this.ignite = false;
    this.shootingDirection = 0; // Initialize shooting direction
    this.audiocaer = false;
    this.superjump = false;
    this.dead = false;
    this.collisionBlocks = collisionBlocks
    this.flamethrower = true;
    this.platformCollisionBlocks = platformCollisionBlocks
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    }

    this.animations = animations
    this.lastDirection = 'right'

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image
    }

    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }

  }


  
  shootProjectile() {
    if(this.flamethrower == true){
      const projectile = new ProjectilePlayer({
        position: { x: player.position.x + 44, y: player.position.y + 36.8 },
        radius: 1,
        color: 'orange',
        speed: 1,
        direction: this.shootingDirection,
      });
      this.projectiles.push(projectile);
    }
  }
  checkProjectileCollisionsWithEnemies(enemies) {
    this.projectiles = this.projectiles.filter((projectile) => {
      // Iterate over all enemies and check for collision with the projectile
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (
          projectile.position.x < enemy.hitbox.position.x + enemy.hitbox.width &&
          projectile.position.x + projectile.radius > enemy.hitbox.position.x &&
          projectile.position.y < enemy.hitbox.position.y + enemy.hitbox.height &&
          projectile.position.y + projectile.radius > enemy.hitbox.position.y
        ) {
          // Projectile collided with the enemy, remove it from the array
          console.log("Projectile impacted an enemy");
          enemy.health -= 0.2; // Adjust damage as needed
          playSound("./audio/damage.mp3");
          return false; // Remove the projectile
        }
      }
      return true; // Keep the projectile
    });
  }

  checkProjectileCollisionsWithEnemy(player) {
    this.projectiles = this.projectiles.filter((projectile) => {
      if (
        projectile.position.x < player.hitbox.position.x + player.hitbox.width &&
        projectile.position.x + projectile.radius > player.hitbox.position.x &&
        projectile.position.y < player.hitbox.position.y + player.hitbox.height &&
        projectile.position.y + projectile.radius > player.hitbox.position.y
      ) {
        // Projectile collided with the player, remove it from the array
        console.log("projectile impacted")
        player.health = player.health - 0.2
        playSound("./audio/damage.mp3")
        return false;
      } else {
        return true;
      }
    });
  }
  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return

    this.currentFrame = 0
    this.image = this.animations[key].image
    this.frameBuffer = this.animations[key].frameBuffer
    this.frameRate = this.animations[key].frameRate
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0
    }
  }

  shouldPanCameraToTheLeft({ canvas, camera }) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
    const scaledDownCanvasWidth = canvas.width / 4

    if (cameraboxRightSide >= 576) return

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraToTheRight({ canvas, camera }) {
    if (this.camerabox.position.x <= 0) return

    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraDown({ canvas, camera }) {
    if (this.camerabox.position.y + this.velocity.y <= 0) return

    if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldPanCameraUp({ canvas, camera }) {
    if (
      this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
      16000
    )
      return

    const scaledCanvasHeight = canvas.height / 4

    if (
      this.camerabox.position.y + this.camerabox.height >=
      Math.abs(camera.position.y) + scaledCanvasHeight
    ) {
      camera.position.y -= this.velocity.y
    }
  }





  update() {
    this.updateFrames()
    this.updateHitbox()
    this.updateCamerabox()


    this.draw()

    if(this.health < 1){
      this.dead = true
    }
    this.position.x += this.velocity.x
    this.updateHitbox()
    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.updateHitbox()
    this.checkForVerticalCollisions()


  }



  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 26,
      },
      width: 14,
      height: 27,
    }
    
  }

  update2(ctx) {
    // Update and draw projectiles
    this.projectiles = this.projectiles.filter((projectile) => {
      projectile.draw(ctx);
      projectile.update();
      const maxDistance = 150; // Adjust the maximum distance as needed
      const traveledDistance = Math.sqrt(
        (projectile.position.x - this.position.x) ** 2 +
        (projectile.position.y - this.position.y) ** 2
      );
  
      if (traveledDistance <= maxDistance) {
        return true; // Keep the projectile
      } else {
        return false; // Remove the projectile
      }
    });
  }
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width

          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0
          const offset = this.hitbox.position.x - this.position.x

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.isjumping = false
          if(this.audiocaer == false){
            playSound("./audio/caer.mp3")
            this.audiocaer = true
            }
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
    
  

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }

      }
    }

    // platform collision blocks
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = this.platformCollisionBlocks[i]

      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          if(this.audiocaer == false){
            if(getRandomTrueWithProbability(0.0000001) == true){
              this.health = 0;
              playSound("./audio/bomb.mp3")
            }
            playSound("./audio/caer.mp3")
            this.audiocaer = true
            }
          this.isjumping = false
          console.log('plataforma detectada')
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = platformCollisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}
