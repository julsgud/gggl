// by aferriss https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/2_texture-coordinates/2-3_gradient

let myShader;

function preload(){
  myShader = loadShader('./vert.vert', './frag.frag');
}

const scaler = .90

function setup() {
  createCanvas(windowHeight * scaler, windowHeight * scaler, WEBGL);
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