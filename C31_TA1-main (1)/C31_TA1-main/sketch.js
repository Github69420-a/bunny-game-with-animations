const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;
var rabbitblinkanimation;
var rabbitsadanimation;
var rabbiteatanimation;

var button;
var bunny;
var fruitObj;
var collided;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  rabbitblinkanimation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  rabbitsadanimation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  rabbiteatanimation = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  rabbiteatanimation.looping= false;
  rabbitsadanimation.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);


  bunny = createSprite(190,620,100,100);
  rabbitblinkanimation.frameDelay = 10;
  rabbiteatanimation.frameDelay = 10;
  rabbitsadanimation.frameDelay = 10;
  bunny.addAnimation("blink", rabbitblinkanimation);
  bunny.addAnimation("sad", rabbitsadanimation);
  bunny.addAnimation("eat", rabbiteatanimation);
  bunny.scale = 0.2;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if (fruit != null) {
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  if (ground != null) {
    ground.show();
  }
  //collide(fruit, bunny);
  if (collide(fruit,bunny) == true) {
    bunny.changeAnimation("eat");
    collided = true;

  }
  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation("sad");
    console.log("collided");
  }

  drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function collide(body1, sprite) {
  if (body1 != null) {
    var distance = dist(body1.position.x, body1.position.y, sprite.x, sprite.y) 
  }
  if (distance <= 80) {
    World.remove(world, fruit);
    fruit = null;
    return true
  } else {
    return false
  }
}