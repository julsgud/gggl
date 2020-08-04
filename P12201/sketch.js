let myShader;
let img;

function preload(){
  myShader = loadShader('./vert.vert', './frag.frag');
  img = loadImage('./yls.jpg')
}

function setup() {
  createCanvas(windowHeight, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(myShader);
  myShader.setUniform('mouse', [map(mouseX, 0, width, 0, 1), map(mouseY, 0, height, 0, 1)]);
  myShader.setUniform('tex', img)
  rect(0,0,width, height);
}
