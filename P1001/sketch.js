// https://editor.p5js.org/generative-design/sketches/P_1_0_01

let myShader;

function preload(){
  myShader = loadShader('./vert.vert', './frag.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(myShader);
  myShader.setUniform('resolution', [width, height]);
  myShader.setUniform('mouse', [map(mouseX, 0, width, 0, 1), map(mouseY, 0, height, 0, 1)]);
  myShader.setUniform('time', frameCount * 0.01);
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}