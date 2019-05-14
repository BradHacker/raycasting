const walls = [];
let particle;

function setup() {
  createCanvas(400, 400);
  for(let i = 0; i < 5; i++) {
    walls.push(new Wall(random(0,width),random(0,height),random(0,width),random(0,height)));
  }
  walls.push(new Wall(0, 0, 0, height));
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(0, height, width, height));
  particle = new Particle();
}

function draw() {
  background(0);
  for(let i = 0; i < walls.length; i++) {
    walls[i].show();
  }
  particle.show();
  particle.lookAround(walls);
  particle.pos.x = mouseX;
  particle.pos.y = mouseY;
}