const walls = [];
let particle;
const FOV = 60;
const NUM_RAYS = FOV * 2;
let windowSize ;

function setup() {
  windowSize = 400 + 120 - (400 - NUM_RAYS * floor(400 / NUM_RAYS))
  createCanvas(windowSize * 2, windowSize);
  for (let i = 0; i < 5; i++) {
    walls.push(
      new Wall(
        random(0, windowSize),
        random(0, windowSize),
        random(0, windowSize),
        random(0, windowSize),
        color(random(255), random(255), random(255))
      )
    );
  }
  walls.push(new Wall(0, 0, 0, windowSize, color(255,255,255)));
  walls.push(new Wall(0, 0, windowSize, 0, color(255, 255, 255)));
  walls.push(new Wall(windowSize, 0, windowSize, windowSize, color(255, 255, 255)));
  walls.push(new Wall(0, windowSize, windowSize, windowSize, color(255, 255, 255)));

  particle = new Particle(windowSize / 2, windowSize / 2);
}

function draw() {
  background(0);
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) particle.addHeading(-0.01);
    if (keyCode == RIGHT_ARROW) particle.addHeading(0.01);
    if (keyCode == UP_ARROW) particle.move(1);
    if (keyCode == DOWN_ARROW) particle.move(-1);
  }
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
    c.setAlpha(alpha)
    //console.log(`Dist: ${rects[i].dist} | Alpha: ${alpha}`)
    fill(c);
    noStroke();
    rect(
      rectWidth / 2 + i * rectWidth,
      height / 2,
      floor(rectWidth),
      windowSize - rects[i].dist
    );
  }
  pop();
}
