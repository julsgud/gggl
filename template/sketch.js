// by aferriss https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/2_texture-coordinates/2-3_gradient

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
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}