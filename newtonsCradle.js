var Example = Example || {};

Example.newtonsCradle = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite;

    // Crear motor
    var engine = Engine.create(),
        world = engine.world;

    // Crear render
    var render = Render.create({
        element: document.getElementById('newtonsCradleDiv'),
        engine: engine,
        options: {
            width: 1200,
            height: 600,
            showVelocity: true
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    var cradle = Example.newtonsCradle.newtonsCradle(100, 100, 5, 30, 400);
    Composite.add(world, cradle);
    Body.translate(cradle.bodies[0], { x: -180, y: -100 });

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    render.mouse = mouse;

    Render.lookAt(render, {
        min: { x: 0, y: 50 },
        max: { x: 400, y: 600 }
    });
};

Example.newtonsCradle.newtonsCradle = function(xx, yy, number, size, length) {
    var Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Bodies = Matter.Bodies;

    var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

    for (var i = 0; i < number; i++) {
        var separation = 1.9,
            circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                { inertia: Infinity, restitution: 1, friction: 0.5, frictionAir: 0, slop: size * 0.02 }),
            constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

        Composite.addBody(newtonsCradle, circle);
        Composite.addConstraint(newtonsCradle, constraint);
    }

    return newtonsCradle;
};
