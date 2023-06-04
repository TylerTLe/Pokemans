class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
      this.position = position;
      this.image = image;
      this.frames = frames;
  
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
      }
    }
  
    draw() {
      c.drawImage(
        this.image,
        0,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      );
    }
  }

class Boundary {
    static height = 48;
    static width = 48;
    constructor({ position }) {
      this.position = position;
      this.height = 48;
      this.width = 48;
    }
  
    draw() {
      c.fillStyle = "rgba(255,0,0,0)";
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }