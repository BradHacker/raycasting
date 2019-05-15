class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.heading = 0;
    this.rays = [];
    for (let a = -FOV/2; a < FOV/2; a += FOV / NUM_RAYS) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  addHeading(angle) {
    this.heading += angle;
    let a = -FOV/2;
    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].setAngle(radians(a) + this.heading);
      a += FOV / NUM_RAYS;
    }
  }

  move(dir) {
    let tempPos = this.pos.copy();
    tempPos.add(p5.Vector.fromAngle(this.heading).mult(2));
    if (tempPos.x > 0 && tempPos.x < windowSize && tempPos.y > 0 && tempPos.y < windowSize) {
      if (dir > 0) this.pos.add(p5.Vector.fromAngle(this.heading).mult(2));
      if (dir < 0) this.pos.subtract(p5.Vector.fromAngle(this.heading).mult(2));
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
            recordPoint = {
              point: point,
              color: wall.color
            }
          }
        }
      }
      if (recordPoint) {
        stroke(recordPoint.color, 100);
        line(this.pos.x, this.pos.y, recordPoint.point.x, recordPoint.point.y);
        rects[i] = {
          dist: record * cos(ray.angle.heading() - this.heading),
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
