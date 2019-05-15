const walls = [];
let particle;
const FOV = 60;
let windowSize = 400;
const RAY_STEP = FOV / windowSize;

function setup() {
  createCanvas(windowSize * 2, windowSize);
  // for (let i = 0; i < 5; i++) {
  //   walls.push(
  //     new Wall(
  //       random(0, windowSize),
  //       random(0, windowSize),
  //       random(0, windowSize),
  //       random(0, windowSize),
  //       color(random(255), random(255), random(255))
  //     )
  //   );
  // }
  walls.push(new Wall(0, 0, 0, windowSize, color(255, 255, 255)));
  walls.push(new Wall(0, 0, windowSize, 0, color(255, 255, 255)));
  walls.push(
    new Wall(windowSize, 0, windowSize, windowSize, color(255, 255, 255))
  );
  walls.push(
    new Wall(0, windowSize, windowSize, windowSize, color(255, 255, 255))
  );

  particle = new Particle(windowSize / 2, windowSize / 2);
}

function draw() {
  background(0);
  if (keyIsDown(LEFT_ARROW)) particle.addHeading(-0.02);
  if (keyIsDown(RIGHT_ARROW)) particle.addHeading(0.02);
  if (keyIsDown(UP_ARROW)) particle.move(1);
  if (keyIsDown(DOWN_ARROW)) particle.move(-1);
  for (let i = 0; i < walls.length; i++) {
    walls[i].show();
  }
  particle.show();
  let rects = particle.lookAround(walls);

  push();
  translate(windowSize, 0);
  rectMode(CENTER);
  let rectWidth = windowSize / rects.length;
  for (let i = 0; i < rects.length; i++) {
    let alpha = map(rects[i].dist, 0, windowSize, 255, 100);
    let c = color(rects[i].colorString);
    c.setAlpha(alpha);
    //console.log(`Dist: ${rects[i].dist} | Alpha: ${alpha}`)
    fill(c);
    noStroke();
    rect(
      rectWidth / 2 + i * rectWidth,
      height / 2,
      rectWidth,
      30 / (rects[i].dist / windowSize)
    );
  }
  pop();
}

let wallColor;

function mousePressed() {
  if (mouseX > 0 && mouseX < windowSize && mouseY > 0 && mouseY < windowSize) {
    wallColor = color(random(255), random(255), random(255));
    walls.push(new Wall(mouseX, mouseY, mouseX, mouseY, wallColor, true));
  }
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < windowSize && mouseY > 0 && mouseY < windowSize)
    walls[walls.length - 1].setPointB(mouseX, mouseY);
}

function mouseReleased() {
  walls[walls.length - 1].editing = false;
}
