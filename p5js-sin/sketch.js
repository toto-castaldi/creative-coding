const W = 600;
const H = 600;
const START_LIFE = 20;

let tailLength;
let speed;
let tail = [];
let life = START_LIFE;
let x;
let y;

function setup() {
  let cnv = createCanvas(W, H);
  x = (windowWidth - W) / 2;
  y = (windowHeight - H) / 2;
  cnv.position(x, y);
  
  speed = createSlider(0, 10, 5, 0);
  speed.position(x + W*0.1, 10);
  speed.size(W*0.8);
  speed.input(() => {
    tail = [];
  });
  
  tailLength = createSlider(50, 210, 130, 0);
  tailLength.position(x + W*0.1, 30);
  tailLength.size(W*0.8);

  strokeWeight(life);
}

function draw() {
  background(0, 0, map(life, 0, START_LIFE, 0, 220));
  
  let y = W/2 + sin(frameCount * speed.value() / 180) * (W/3);
  
  while (tail.length > tailLength.value()) {
    tail.shift();
  }
  tail.push({y, special: random(0, 100) > 95});

  tail.slice().reverse().forEach((t, index) => {
    if (t.special) {
      if (index == tail.length - 1) {
       life -= 0.3;
       ouchCount = 2;
      }
      stroke('rgb(179, 54, 179)');
    } else {
      stroke('rgb(221,139,221)');
    }
    point(H/2 - map(index, 0, tail.length, 0, H/2 - START_LIFE), t.y);
  });

  stroke('purple');
  strokeWeight(life);
  point(H/2, y);

  if (life <= 0) {
    noLoop();
    let button = createButton("reborn");
    button.size(100);
    button.position(x + W/2 - 50 , H/2);
    button.mousePressed(() => {
      life = START_LIFE;
      button.remove();
      tail = [];
      loop();
    });
  }
}