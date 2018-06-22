# IA-project
#### Artificial Intelligence Project - UFCG 2018.1
#### Professor: [Herman Martins Gomes.](http://www.dsc.ufcg.edu.br/~hmg/teaching.htm)
#### Alunos: 
  - [Paulo Santos](https://github.com/paulossa) :squirrel:
  - André Leite
  - Rafael 
  - ? 


This project will be a proof of concept that uses a [Artificial Neural Network](https://en.wikipedia.org/wiki/Artificial_neural_network)  combined with [Genetic Algortihms](https://en.wikipedia.org/wiki/Genetic_algorithm) to train birds in a 'game-like' environment that simulates a similar game to [Flappy Birds](http://flappybird.io/)

The project will be done Using: 
- Javascript (mostly) + [P5.js](https://p5js.org/)
- HTML 

To do the Objects I suggest using the [Constructor Function style](https://www.w3schools.com/js/js_object_constructors.asp) for objects. 

``` javascript 
function Bird() {
    this.x = 30;
    this.y = 150; 
    this.draw = function() {
      #drawAt(this.x, this.y)
    }
    return this;? 
}
``` 
