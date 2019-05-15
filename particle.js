class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.heading = 0;
    this.rays = [];
    for (let a = -FOV / 2; a < FOV / 2; a += RAY_STEP) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  addHeading(angle) {
    this.heading += angle;
    let a = -FOV / 2;
    for (let ray of this.rays) {
      ray.setAngle(radians(a) + this.heading);
      a += RAY_STEP;
    }
  }

  move(dir) {
    let tempPos = this.pos.copy();
    if (dir > 0) tempPos.add(p5.Vector.fromAngle(this.heading).mult(2));
    if (dir < 0) tempPos.sub(p5.Vector.fromAngle(this.heading).mult(2));
    if (
      tempPos.x > 0 &&
      tempPos.x < windowSize &&
      tempPos.y > 0 &&
      tempPos.y < windowSize
    ) {
      if (dir > 0) this.pos.add(p5.Vector.fromAngle(this.heading).mult(2));
      if (dir < 0) this.pos.sub(p5.Vector.fromAngle(this.heading).mult(2));
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
          dist *= cos(ray.angle.heading() - this.heading);
          if (dist < record) {
            record = dist;
            recordPoint = {
              point: point,
              color: wall.color
            };
          }
        }
      }
      if (recordPoint) {
        let c = color(recordPoint.color.toString());
        c.setAlpha(10);
        stroke(c);
        line(this.pos.x, this.pos.y, recordPoint.point.x, recordPoint.point.y);
        rects[i] = {
          dist: record,
          height: 1 / record,
          colorString: recordPoint.color.toString()
        };
      }
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
