// by aferriss https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/2_texture-coordinates/2-3_gradient

let myShader;
let segments = 6;

function preload(){
  myShader = loadShader('./vert.vert', './frag.frag');
}

function setup() {
  createCanvas(windowHeight, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(myShader);
  myShader.setUniform('resolution', [width, height]);
  myShader.setUniform('mouse', [map(mouseX, 0, width, 0, 1), map(mouseY, 0, height, 0, 1)]);
  myShader.setUniform('time', frameCount * 0.01);
  myShader.setUniform('segments', segments)
  rect(0,0,width, height);
}

function keyPressed() {
  switch (key) {
    case '1':
      segments = 360;
      break;
    case '2':
      segments = 45;
      break;
    case '3':
      segments = 24;
      break;
    case '4':
      segments = 12;
      break;
    case '5':
      segments = 6;
      break;
  }
}