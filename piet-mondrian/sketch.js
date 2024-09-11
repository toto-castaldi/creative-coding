const W = 600;
const H = 600;
const START_LIFE = 20;

let paletteSlider;
let paletteCount = -1;
let continueDraw = false;
const palette = new Palette().values;

function setup() {
  let cnv = createCanvas(W, H);
  x = (windowWidth - W) / 2;
  y = (windowHeight - H) / 2;
  cnv.position(x, y);

  paletteSlider = createSelect();
  paletteSlider.position(x + W*0.1, 10);
  paletteSlider.size(W*0.8);
  for (let i = 0; i < palette.length; i++) {
    paletteSlider.option(`PALETTE ${i}`, i);
  }
  paletteSlider.input(() => {
    background(255);  
  });

  let button = createButton("play");
  button.size(100);
  button.position(x + W/2 - 50 , 40);
  button.mousePressed(() => {
    continueDraw = !continueDraw;
    button.elt.innerHTML = continueDraw ? "pause" : "play";
  });

  
  background(255);

  strokeWeight(3);
}

function draw() {
  if (random(0,100) > 90 && continueDraw) {
    let p = palette[Math.floor(paletteSlider.value())];
    let c = color("#" + p[(++paletteCount) % p.length]);
    fill(c);
    let x = random(0, W);
    let y = random(0, H);
    let w = random(1, W - x);
    let h = random(1, H - y); 
    square(x,y,min(w,h));
  }
  
}