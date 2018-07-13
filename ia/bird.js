airResistance = .95;

function Bird(brain) {
  this.y = height/2;
  this.x = 70;

  this.gravity = .4;
  this.velocity = 0;
  this.lift = -10;


  this.score = 0;
  this.fitness = 0;

  if(brain) {
    this.brain = brain.copy();
  } else {
    this.brain = new NeuralNetwork(4, 4, 2);
  } 

  this.draw = function() {
    stroke(255);
    fill(255, 50);
    ellipse(this.x, this.y, 32, 32);
  }

  this.think = function(pipes) {

    // Find de closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d =  pipes[i].x - this.x;
      if(d < closestD && d > 0){
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;

    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.up();
    }

  }

  this.update = function() {

    this.score++;

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

  this.mutate = function() {
    //this.brain.mutate(0.1);
  }
}
