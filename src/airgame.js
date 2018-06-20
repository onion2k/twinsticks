
import Matter from 'matter-js';

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine = Engine.create();
engine.world.gravity.y = 1.4;

let render = Render.create({
    element: document.getElementById('world'),
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showVelocity: true,
        showAngleIndicator: true
    }
});

let boxA = Bodies.circle(400, 200, 80);
let boxB = Bodies.circle(450, 50, 80);
let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
