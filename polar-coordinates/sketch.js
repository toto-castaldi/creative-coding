const WIDTH = 600;
const HEIGHT = 600;
const MAX_RADIUS = WIDTH * 2 / 5;
const BACKGROUND = 255;
let theta = 45; //degrees
let radius = 0;
let direction = 1; //1 -> INWARDS, 0 -> OUTWARDS  
let speedTheta;
let speedRadius;
let speedCycleColor;
const palette = new Palette();

function setup() {
  createCanvas(WIDTH, HEIGHT);

  angleMode(DEGREES);

  let paletteSelector;

  const restart = () => {
    background(BACKGROUND);
    radius = 0;
    palette.use(paletteSelector.value());
  }

  speedTheta = createSlider(1, 9, 5, 0);
  speedTheta.position((windowWidth - WIDTH) / 2 + WIDTH*0.1, 10);
  speedTheta.size(WIDTH*0.8);
  speedTheta.input(restart);

  speedRadius = createSlider(1, 9, 5, 0);
  speedRadius.position((windowWidth - WIDTH) / 2 + WIDTH*0.1, 30);
  speedRadius.size(WIDTH*0.8);
  speedRadius.input(restart);

  speedCycleColor = createSlider(1, 9, 5, 0);
  speedCycleColor.position((windowWidth - WIDTH) / 2 + WIDTH*0.1, 50);
  speedCycleColor.size(WIDTH*0.8);
  speedCycleColor.input(restart);

  paletteSelector = palette.createSelector({
    positionX : (windowWidth - WIDTH) / 2 + WIDTH*0.1,
    positionY : 70,
    size : WIDTH*0.8,
    input : restart
  });
  
  noStroke();

  restart();
}

function draw() {
  translate(width / 2, height / 2);

  let x = cos(theta) * radius;
  let y = sin(theta) * radius;

  if (frameCount % (speedCycleColor.value() * 10) == 0) palette.cycleColor();
  let c = palette.currentColor();
  
  fill(c);
  circle(x,y,20,20); 

  theta += speedTheta.value();

  if (direction == 1) {
    if (radius > 0) {
      radius -= speedRadius.value();
    } else {
      direction = 0;
    }
  } else {
    if (radius < MAX_RADIUS) {
      radius += speedRadius.value();
    } else {
      direction = 1;
    }
  }

  if (theta >= 360) {
    theta = 1;
  }
  
}