
function Pipe() {
  this.top = random(10, height/2);
  this.bottom = this.top + random(90, 180);

  this.x = width;
  this.w = 40;
  this.speed = 3;

  this.show = function () {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }

  this.update = function () {
    this.x -= this.speed;
  }

  this.offscreen = function () {
    return this.x < -this.w;
  }

  this.hits = function (bird) {
    return ((bird.y < this.top || bird.y > this.bottom) && (bird.x > this.x && this.x < this.x + this.w));
  }
}
