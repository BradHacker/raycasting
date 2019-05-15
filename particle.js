class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.heading = 0;
    this.rays = [];
    for (let a = -30; a < 30; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  addHeading(angle) {
    this.heading += angle;
    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].setAngle(radians(i) + this.heading);
    }
  }

  lookAround(walls) {
    let rects = [];
    for (let i = 0; i < this.rays.length; i++) {
      let ray = this.rays[i];
      let record = Infinity;
      let recordPoint = null;
      for (let wall of walls) {
        let point = ray.castTo(wall);
        if (point) {
          let dist = p5.Vector.dist(this.pos, point);
          if (dist < record) {
            record = dist;
            recordPoint = point;
          }
        }
      }
      if (recordPoint) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, recordPoint.x, recordPoint.y);
        rects[i] = record * cos(ray.angle.heading());
      } else rects[i] = 0;
    }
    return rects;
  }

  show() {
    // for(let i = 0; i < this.rays.length; i++) {
    //   this.rays[i].show();
    // }
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 5);
  }
}
