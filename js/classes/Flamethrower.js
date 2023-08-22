class Flamethrower {
    constructor({ position, width, height, imageSrc }) {
      this.position = position;
      this.width = width;
      this.height = height;
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
      hideFlame();
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
  
      this.checkCollisionWithPlayer(player)
  
    }
  

/*/
    drawonplayer(ctx){
        if(player.flamethrower == true){
            ctx.drawImage(this.image, player.position.x + 32, player.position.y + 33, 25, 10);
        }
    }
    /**/

    draw(ctx) {
      if (player.flamethrower == true) {
        showFlame();
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        const imageWidth = 25;
        const imageHeight = 10;
    
        tempCanvas.width = Math.abs(Math.cos(player.shootingDirection)) * imageWidth + Math.abs(Math.sin(player.shootingDirection)) * imageHeight;
        tempCanvas.height = Math.abs(Math.cos(player.shootingDirection)) * imageHeight + Math.abs(Math.sin(player.shootingDirection)) * imageWidth;
    
        // Translate to the center of the temporary canvas
        tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    
        // Rotate the temp context and draw the flamethrower image without scaling
        tempCtx.rotate(player.shootingDirection);
        tempCtx.drawImage(this.image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
    
        // Draw the rotated temp canvas onto the main canvas
        ctx.drawImage(tempCanvas, (player.position.x - tempCanvas.width / 2) + 44, player.position.y + 38- tempCanvas.height / 2, tempCanvas.width, tempCanvas.height);
      }
        else{
          ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
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
            this.position.x = 2000;
            this.position.y = 2000;
            player.flamethrower = true;

          }
        }
  }
  