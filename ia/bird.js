airResistance = .95;

function Bird() {
  this.y = height/2;
  this.x = 70;

  this.gravity = .4;
  this.velocity = 0;
  this.lift = -10;

  this.draw = function() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= airResistance;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  this.up = function ( ) {
    this.velocity += this.lift;
  }
}
