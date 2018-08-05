let totalPopulation = 100;
let activeBirds = [];
let allBirds = [];
let pipes = [];
let counter = 0;
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;
let highScore = 0;
let currentHighScore = 0;
let runBest = false;
let runBestButton;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvascontainer');

  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);

  plotGraph = select('#fitness');
  plotGraph.mousePressed(plotGraphs);

  for (let i = 0; i < totalPopulation; i++) {
    let bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
}

function toggleState() {
  runBest = !runBest;
  if (runBest) {
    resetGame();
    runBestButton.html('Continue training generations');
  } else {
    nextGeneration();
    runBestButton.html('Run of the best bird so far');
  }
}

function plotGraphs() {

  var layout = {
    title:'Graph of the High Score of the better bird with the pass of the generations',
    xaxis: {
      title: '# of Generations',
    },
    yaxis: {
      title: 'High Scores',
    }
  };

  var trace1 = {
    x: generations, 
    y: fitness, 
    type: 'scatter'
  };
  var data = [trace1];
  Plotly.newPlot('graphHighScore', data, layout);

  var layout2 = {
    title:'Graph of the High Score of the better bird of the current generation with the pass of the generations',
    xaxis: {
      title: '# of Generations',
    },
    yaxis: {
      title: 'High Scores of Current Generation',
    }
  };

  var trace2 = {
    x: generations, 
    y: currentHighScores, 
    type: 'scatter'
  };
  var data2 = [trace2];
  Plotly.newPlot('graphCurrentHighScore', data2, layout2);
}

function draw() {
  background(0);

  let cycles = speedSlider.value();
  speedSpan.html(cycles);

  for (let n = 0; n < cycles; n++) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    if (runBest) {
      bestBird.think(pipes);
      bestBird.update();
      for (let j = 0; j < pipes.length; j++) {
        if (pipes[j].hits(bestBird)) {
          resetGame();
          break;
        }
      }

      if (bestBird.bottomTop()) {
        resetGame();
      }
    } else {
      for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        bird.think(pipes);
        bird.update();

        for (let j = 0; j < pipes.length; j++) {
          if (pipes[j].hits(activeBirds[i])) {
            activeBirds.splice(i, 1);
            break;
          }
        }

        if (bird.bottomTop()) {
          activeBirds.splice(i, 1);
        }

      }
    }

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  let tempHighScore = 0;
  if (!runBest) {

    let tempBestBird = null;
    for (let i = 0; i < activeBirds.length; i++) {
      let s = activeBirds[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        currentHighScore = s;
        tempBestBird = activeBirds[i];
      }
    }

    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  } else {
    currentHighScore = bestBird.score;
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

  if (runBest) {
    bestBird.show();
  } else {
    for (let i = 0; i < activeBirds.length; i++) {
      activeBirds[i].show();
    }

    if (activeBirds.length == 0) {
      nextGeneration();
    }
  }
}