class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.angle = p5.Vector.fromAngle(angle);
  }

  setAngle(angle) {
    this.angle = p5.Vector.fromAngle(angle);
  }

  show() {
    stroke(255, 100);
    strokeWeight(1);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.angle.x,
      this.pos.y + this.angle.y
    );
  }

  pointAt(x, y) {
    this.angle.x = x - this.pos.x;
    this.angle.y = y - this.pos.y;
    this.angle.normalize();
  }

  castTo(wall) {
    let x1 = wall.pointA.x;
    let y1 = wall.pointA.y;
    let x2 = wall.pointB.x;
    let y2 = wall.pointB.y;

    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.angle.x;
    let y4 = this.pos.y + this.angle.y;

    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den == 0) return;

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      let pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else return;
  }
}
