  class Cohete {
    constructor({ position, width, height, imageSrc }) {
      this.position = position;
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.displacement = 0;
      this.image.src = imageSrc;
      this.hitbox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        width: this.width,
        height: this.height,
      };
    }
    
    shouldPanCameraUp({ canvas, camera }) {
      if (
        player.camerabox.position.y + player.camerabox.height + player.velocity.y >=
        432
      )
        return

      const scaledCanvasHeight = canvas.height / 4

      if (
        player.camerabox.position.y + player.camerabox.height >=
        Math.abs(camera.position.y) + scaledCanvasHeight
      ) {
        camera.position.y -= player.velocity.y
      }
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

      if(player.ignite == true){
        if(this.displacement < 5000){
        this.displacement += 2;
        this.position.y -= 2;
        player.position.y = this.position.y
        camera.position.y += 2.1;
        console.log(this.position.y)
        console.log("booooom")
        }
        else{
          player.ignite = false;
          player.position.y = this.position.y
          player.isjumping = false;
        }
      }

    }

    draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    
    }

    checkCollisionWithPlayer(player) {
          // Check if the player's hitbox overlaps with this object's hitbox
          if (
            player.hitbox.position.x < this.hitbox.position.x + this.hitbox.width &&
            player.hitbox.position.x + player.hitbox.width > this.hitbox.position.x &&
            player.hitbox.position.y < this.hitbox.position.y + this.hitbox.height &&
            player.hitbox.position.y + player.hitbox.height > this.hitbox.position.y
          ) {
            // Collision detected with the player

            console.log('Collision with the player!');
            player.position.x = 2000
            player.position.y = 2000
            player.ignite = true

            // You can add further logic here, such as handling what happens when the player collides with this object.
            // For example, you can call a method on the player to handle the collision, change the game state, etc.
            // player.handleCollisionWithObject(this);
          }
    }
  }
