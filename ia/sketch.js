/** For P5.js reference use: https://p5js.org/reference/ **/
var HEIGHT = 400,
    WIDTH = 600;

const TOTAL = 250;
var birds = [];
let savedBirds = [];
var pipes = [];

function setup () {
  createCanvas(WIDTH, HEIGHT);

  for( let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  
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

    for ( let j = birds.length-1; j >= 0; j--) {
      if (pipes[i].hits(birds[j])) {
        savedBirds.push(birds.splice(j, 1));
      }
    }
  }

  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.draw();
  }

  if(birds.length == 0) {
    nextGeneration();
  }

  if (frameCount % 125 == 0) {
    pipes.push(new Pipe());
  }
}

//function keyPressed() {
//  if (key == ' ') {
//    bird.up();
//  }
//}
