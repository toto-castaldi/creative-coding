const W = 600;
const H = 600;
const S = 10;

let tailLength;
let speed;
let tail = [];


function setup() {
  createCanvas(W, H);
  
  speed = createSlider(1, 20, 10, 0);
  speed.position(W*0.1, 10);
  speed.size(W*0.8);
  
  tailLength = createSlider(0, 200, 10, 0);
  tailLength.position(W*0.1, 30);
  tailLength.size(W*0.8);
}

function draw() {
  background(220);
  
  stroke('purple');
  strokeWeight(S);
  
  let y = W/2 + sin(frameCount * speed.value() / 100) * (W/4);
  
  point(H/2, y);
  
  while (tail.length >= tailLength.value()) {
    tail.shift();
  }
  tail.push(y);
  
  stroke('rgb(221,139,221)');
  strokeWeight(S * 0.8);
  tail.forEach((y) => {
    point(H/2, y);
  });
}