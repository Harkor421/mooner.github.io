class Button {
  constructor(x, y, width, height, colors, text, onClick) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colors = colors; // Array of colors for cycling
    this.text = text;
    this.onClick = onClick;
    this.colorIndex = 0; // Initial color index
    this.isClicked = false;
  }

  updateColor() {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
  }

  draw(ctx) {
    const currentColor = this.colors[this.colorIndex];
    ctx.fillStyle = currentColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    const textWidth = ctx.measureText(this.text).width;
    ctx.fillText(this.text, this.x + this.width / 2 - textWidth / 2, this.y + this.height / 2 + 7);
  }

  checkClick(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    ) {
      if (this.onClick) {
        this.onClick();
      }
    }
  }
}
