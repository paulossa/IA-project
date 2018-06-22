/** For P5.js reference use: https://p5js.org/reference/ **/
var HEIGHT = 400,
    WIDTH = 600;

var bird;
var pipes = [];

function setup () {
  createCanvas(WIDTH, HEIGHT);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (var i = pipes.length-1 ; i >= 0 ; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if (pipes[i].hits(bird)) {
      console.log("bateu");
    }
  }

  bird.update();
  bird.draw();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}
