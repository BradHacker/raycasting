const walls = [];
let particle;
let windowSize = 400;

function setup() {
  createCanvas(windowSize * 2, windowSize);
  for (let i = 0; i < 5; i++) {
    walls.push(
      new Wall(
        random(0, windowSize),
        random(0, windowSize),
        random(0, windowSize),
        random(0, windowSize)
      )
    );
  }
  walls.push(new Wall(0, 0, 0, windowSize));
  walls.push(new Wall(0, 0, windowSize, 0));
  walls.push(new Wall(windowSize, 0, windowSize, windowSize));
  walls.push(new Wall(0, windowSize, windowSize, windowSize));

  particle = new Particle(windowSize / 2, windowSize / 2);
}

function draw() {
  background(0);
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) particle.addHeading(-0.01);
    if (keyCode == RIGHT_ARROW) particle.addHeading(0.01);
  }
  for (let i = 0; i < walls.length; i++) {
    walls[i].show();
  }
  particle.show();
  let rects = particle.lookAround(walls);
  if (mouseX > 0 && mouseX < windowSize && mouseY > 0 && mouseY < windowSize) {
    particle.pos.x = mouseX;
    particle.pos.y = mouseY;
  }
  push();
  translate(windowSize, 0);
  rectMode(CENTER);
  let rectWidth = windowSize / rects.length;
  for (let i = 0; i < rects.length; i++) {
    let c = map(rects[i], 0, windowSize, 255, 0);
    fill(c);
    stroke(c);
    rect(
      rectWidth / 2 + i * rectWidth,
      height / 2,
      rectWidth,
      windowSize - rects[i]
    );
  }
  pop();
}
