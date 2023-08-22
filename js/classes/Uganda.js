class Uganda {
  constructor({ position, width, height, imageSrc, moveRadius, triggerdistance, health}) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.inrange = false;
    this.image = new Image();
    this.image.src = imageSrc;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: this.width,
      height: this.height,
    };
    this.moveRadius = moveRadius;
    this.targetPosition = { x: position.x, y: position.y };
    this.interpolationFactor = 0.0012;
    this.randomSpeed = 20;
    this.projectiles = []; // Array to store projectiles
    this.shootingInterval = 1500; // Time interval for shooting in milliseconds
    this.lastShotTime = 0; // Time tracking for shooting interval]
    this.triggerdistance = triggerdistance;
    this.health = health;
    this.dead = false;
  }

  move(player) {
    const distanceToPlayer = Math.sqrt(
      (this.position.x - player.position.x) ** 2 + (this.position.y - player.position.y) ** 2
    );

    if (distanceToPlayer <= this.triggerdistance) {
      console.log("in range")
      this.inrange = true;
    }


    if (distanceToPlayer <= this.moveRadius) {
      // The player is within the moveRadius, so interpolate around the player randomly
      const dx = Math.random() * 2 - 1;
      const dy = Math.random() * 2 - 1;
      const length = Math.sqrt(dx * dx + dy * dy);
      if (length !== 0) {
        this.targetPosition.x = player.position.x + (dx / length) * this.moveRadius;
        this.targetPosition.y = player.position.y + (dy / length) * this.moveRadius;
      }
    } else {
      // The player is outside the moveRadius, so move randomly within the moveRadius
      const dx = Math.random() * 2 - 1;
      const dy = Math.random() * 2 - 1;
      const length = Math.sqrt(dx * dx + dy * dy);
      if (length !== 0) {
        this.targetPosition.x = this.position.x + (dx / length) * this.moveRadius;
        this.targetPosition.y = this.position.y + (dy / length) * this.moveRadius;
      }
    }

    // Interpolation for smooth movement
    this.position.x += (this.targetPosition.x - this.position.x) * this.interpolationFactor;
    this.position.y += (this.targetPosition.y - this.position.y) * this.interpolationFactor;
  
}


  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: this.width,
      height: this.height,
    };

    if(this.health < 1){
        this.dead = true;
        this.position.x = 2000;
    }

  }

  drawHealthBar(ctx) {
    const healthBarWidth = this.width;
    const healthBarHeight = 5;
    const healthBarX = this.position.x;
    const healthBarY = this.position.y - healthBarHeight - 5;

    ctx.fillStyle = 'red'; // Red color for health bar background
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    const healthPercentage = this.health / 100;
    ctx.fillStyle = 'green'; // Green color for remaining health
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth * healthPercentage, healthBarHeight);
  }


  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    // Draw projectiles
    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx);
      projectile.update()
    });


  }

  checkCollisionWithPlayer(player) {
    if (
      player.hitbox.position.x < this.hitbox.position.x + this.hitbox.width &&
      player.hitbox.position.x + player.hitbox.width > this.hitbox.position.x &&
      player.hitbox.position.y < this.hitbox.position.y + this.hitbox.height &&
      player.hitbox.position.y + player.hitbox.height > this.hitbox.position.y
    ) {
      console.log('Collision with the player!');
    }
  }
  
  checkProjectileCollisionsWithPlayer(player) {
    this.projectiles = this.projectiles.filter((projectile) => {
      if (
        projectile.position.x < player.hitbox.position.x + player.hitbox.width &&
        projectile.position.x + projectile.radius > player.hitbox.position.x &&
        projectile.position.y < player.hitbox.position.y + player.hitbox.height &&
        projectile.position.y + projectile.radius > player.hitbox.position.y
      ) {
        // Projectile collided with the player, remove it from the array
        console.log("projectile impacted")
        player.health = player.health - 10
        playSound("./audio/damage.mp3")
        return false;
      } else {
        return true;
      }
    });
  }


  
    shootProjectile(player) {
      if(this.inrange == true){
      if(this.health > 50){
      const currentTime = Date.now();
      if (currentTime - this.lastShotTime >= this.shootingInterval) {
        const numProjectiles = 8; // Number of projectiles to shoot
        const spreadAngle = (2 * Math.PI) / numProjectiles; // Angle between projectiles
  
        for (let i = 0; i < numProjectiles; i++) {
          const dx = player.position.x - this.position.x;
          const dy = player.position.y - this.position.y;
  
          // Calculate the direction with spread
          const direction = Math.atan2(dy, dx) + i * spreadAngle;
  
          // Create a new projectile and add it to the projectiles array
          const projectile = new Projectile({
            position: { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 },
            radius: 2.5, // Adjust radius as needed
            color: 'red', // Change color to red
            speed: 1.5, // Adjust speed as needed
            direction: direction,
          });
          playSound("./audio/shot.mp3")
          this.projectiles.push(projectile);
        }
  
        // Update the last shot time
        this.lastShotTime = currentTime;
      }
    }
    else{ //Segunda fase
      const currentTime = Date.now();
      this.shootingInterval = 500;
      if (currentTime - this.lastShotTime >= this.shootingInterval) {
        const numProjectiles = 24; // Number of projectiles to shoot
        const spreadAngle = (2 * Math.PI) / numProjectiles; // Angle between projectiles
  
        for (let i = 0; i < numProjectiles; i++) {
          const dx = player.position.x - this.position.x;
          const dy = player.position.y - this.position.y;
  
          // Calculate the direction with spread
          const direction = Math.atan2(dy, dx) + i * spreadAngle;
  
          // Create a new projectile and add it to the projectiles array
          const projectile = new Projectile({
            position: { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 },
            radius: 2.5, // Adjust radius as needed
            color: 'red', // Change color to red
            speed: 1.8, // Adjust speed as needed
            direction: direction,
          });
          playSound("./audio/shot.mp3")
          this.projectiles.push(projectile);
        }
  
        // Update the last shot time
        this.lastShotTime = currentTime;

    }
  }




  }
  
 }
}

