class Wall {
  constructor(x1, y1, x2, y2, color) {
    this.pointA = createVector(x1, y1);
    this.pointB = createVector(x2, y2);
    this.color = color;
  }
  
  show() {
    stroke(this.color);
    strokeWeight(1);
    line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  }
}