class Particle {
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.rays = [];
    for(let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  lookAround(walls) {
    for(let ray of this.rays) {
      let record = Infinity;
      let recordPoint = null;
      for(let wall of walls) {
        let point = ray.castTo(wall);
        if (point) {
          let dist = p5.Vector.dist(this.pos, point);
          if(dist < record) {
            record = dist;
            recordPoint = point;
          }
        }
      }
      if(recordPoint) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, recordPoint.x, recordPoint.y);
      }
    }
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