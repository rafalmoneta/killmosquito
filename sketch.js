let gates = [];
let gatesTexture;
let gatesNum = 1;
let mosquitoTexture;
let mosquitos = [];
let mosquitoNumber = 3;
let addNewMosq = 1;
let score = 0;
let timer;
let game = true;

function preload(){
  gatesTexture = loadImage('img/gates.png');
  mosquitoTexture = loadImage('img/mosquito.png');
}

function setup() {
  // put setup code here
  createCanvas(window.innerWidth, window.innerHeight);
  for(let i = 0; i < mosquitoNumber; i++) {
    mosquitos[i] = new Mosquito();
  }
  for(let i = 0; i < gatesNum; i++) {
    gates[i] = new Gates();
  }
  addNewMosquitos();
}

function draw() {
  // put drawing code here
  background(255);
  for(let i = 0; i < mosquitos.length; i++) {
    mosquitos[i].move();
    mosquitos[i].show();
  }
  for(let i = 0; i < gates.length; i++) {
    gates[i].move();
    gates[i].show();
  }
  textSize(16);
  textAlign(RIGHT, TOP);
  text(`You score: ${score}!`, width-50, 50);

  textSize(16);
  textAlign(LEFT, TOP);
  text('You lose when mosquito > 15!', 50, 50);
  text('or when you click on Gates!', 50, 70);

  if(mosquitos.length > 15) endGame();
}

function addNewMosquitos() {
  for(let i=0; i< addNewMosq; i++) {
    mosquitos.push(new Mosquito());
  }
  timer = setTimeout(addNewMosquitos, random(500, 1000 * addNewMosq));
}

function mouseClicked() {
  for(let i = mosquitos.length-1; i >= 0; i--) {
    if(mosquitos[i].contains(mouseX, mouseY) && game) {
      mosquitos.splice(i,1);
      score++;
      if (score % 10 === 0) addNewMosq++;
      if (score % 100 === 0) addNewMosq = 10;
    }
  }
  for(let i = 0; i < gates.length; i++){
    if(gates[i].contains(mouseX, mouseY)) {
      endGame();
    }
  }
  if(!game) {
    clear();
    textSize(32);
    textAlign(CENTER);
    text('Refresh to play again!', width/2, height/2);
    text(`You score: ${score}!`, width/2, height/2 - 30)
  }
}

function endGame() {
  noLoop();
  clearTimeout(timer);
  game = false;
}
class Gates{
  constructor() {
    this.positionX = random(width-100);
    this.positionY = random(height-100);
    this.speedX = 3;
    this.speedY = 3;
  } 
  contains(mx,my) {
    let d = dist(mx,my, this.positionX, this.positionY);
    return d < 70 ? true : false;
  }
  move() {
    if(this.positionX > width-100 || this.positionX < 0) this.speedX *= -1;
    if(this.positionY > height-100 || this.positionY < 0) this.speedY *= -1;
    this.positionX += this.speedX;
    this.positionY -= this.speedY;
  }
  show() {
    image(gatesTexture, this.positionX, this.positionY, 100, 100);
  }
}

class Mosquito {
  constructor(){
    this.x = random(0, width-100);
    this.y = random(0, height-100);
  }

  contains(mx,my) {
    let d = dist(mx,my, this.x, this.y);
    return d < 85 ? true : false;
  }

  move(){
    this.x = this.x + random(-3, 3);
    this.y = this.y + random(-3, 3);
  }

  show() {
    image(mosquitoTexture, this.x, this.y, 70, 70);
  }
}