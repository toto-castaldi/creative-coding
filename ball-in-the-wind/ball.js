class Ball {
    constructor(x, y) {
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.r = 16;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0,0);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(255,100);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }


    edges() {
        if (this.pos.y + this.r > H) {
            this.pos.y = H - this.r;
            this.vel.y *= -1 * edgeEnergy; 
        } else if (this.pos.y - this.r < 0) {
            this.pos.y = this.r;
            this.vel.y *= -1 * edgeEnergy;
        }
        if (this.pos.x - this.r < 0) {
            this.pos.x = this.r;
            this.vel.x *= -1 * edgeEnergy;
        } else if (this.pos.x + this.r > W) {
            this.pos.x = W - this.r;
            this.vel.x *= -1 * edgeEnergy;
        }
    }
}