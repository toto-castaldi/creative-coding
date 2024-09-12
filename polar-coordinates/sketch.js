const WIDTH = 600;
const HEIGHT = 600;
const MAX_RADIUS = WIDTH * 2 / 5;
const BACKGROUND = 255;
let theta = 45; //degrees
let radius = 0;
let direction = 1; //1 -> INWARDS, 0 -> OUTWARDS  
let speed;
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

  speed = createSlider(1, 9, 5, 0);
  speed.position((windowWidth - WIDTH) / 2 + WIDTH*0.1, 10);
  speed.size(WIDTH*0.8);
  speed.input(restart);

  paletteSelector = palette.createSelector({
    positionX : (windowWidth - WIDTH) / 2 + WIDTH*0.1,
    positionY : 30,
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

  let c = palette.mapColor(radius, 0, MAX_RADIUS);
  
  fill(c);
  circle(x,y,20,20); 

  theta += speed.value();

  if (direction == 1) {
    if (radius > 0) {
      radius --
    } else {
      direction = 0;
    }
  } else {
    if (radius < MAX_RADIUS) {
      radius ++;
    } else {
      direction = 1;
    }
  }

  if (theta >= 360) {
    theta = 1;
  }
  
}