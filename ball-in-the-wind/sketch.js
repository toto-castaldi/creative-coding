const W = 600;
const H = 600;
const edgeEnergy = 0.9;
let ball;
let blowSound; 
let windPowerStart = 0;
let blowSoundStart = 0;
let blowSoundLen = 0;

function preload() {
  blowSound = loadSound('/assets/692093__wastefield__blowing-into-a-big-glass-bottle-low.wav');
}

function setup() {
  let cnv = createCanvas(W, H);
  x = (windowWidth - W) / 2;
  y = (windowHeight - H) / 2;
  cnv.position(x, y);

  ball = new Ball(W/2, H/2);
 
}

function draw() {
  
  background(0);

  let gravity = createVector(0,0.2);

  ball.applyForce(gravity);

  ball.update();
  ball.edges();
  ball.show();

  //arrow wind
  if (windPowerStart > 0) {
    let ballPos = ball.pos.copy();
    let mouse = createVector  (mouseX, mouseY);
    let arrow = p5.Vector.sub(ballPos, mouse);
    translate(mouse.x, mouse.y);
  
    let wp = windPower();
    strokeWeight(wp);
    stroke(map(wp, 0, 10, 80, 255),0,0);
    arrow.setMag(wp * 3);
    line(0,0,arrow.x, arrow.y);
  }

  if (blowSoundStart > 0) {
    if ((millis() - blowSoundStart) / 500 > blowSoundLen) {
      blowSound.stop();
      blowSoundStart = 0;
      blowSoundLen = 0;
    }
  }
  
}

function windPower() {
  let res = (millis() - windPowerStart) * 0.005;
  return res > 10 ? 10 : res; 
}

function mousePressed() {
  windPowerStart = millis();
}

function mouseReleased() {

  let ballPos = ball.pos.copy();
  let mouse = createVector  (mouseX, mouseY);
  let wind = p5.Vector.sub(ballPos, mouse);
  let wp = windPower();
  wind.setMag(wp);
  console.log(wp);
  blowSound.play();
  blowSoundStart = millis();
  blowSoundLen = wp;
  ball.applyForce(wind);

  windPowerStart = 0;
}