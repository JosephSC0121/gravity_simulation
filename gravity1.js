var Example1 = Example1 || {};

Example1.gravity = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    var engine = Engine.create(),
        world = engine.world;


    var render = Render.create({
        element: document.getElementById('gravityDiv1'),
        engine: engine,
        options: {
            width: 1280,
            height: 600,
            showVelocity: true,
            showAngleIndicator: true
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    Composite.add(world, [
        Bodies.rectangle(200, 0, 400, 50, { isStatic: true }),
        Bodies.rectangle(200, 600, 400, 50.5, { isStatic: true }),
        Bodies.rectangle(400, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    engine.gravity.y = 0.1;
    
    var stack = Composites.stack(50, 120, 3, 3, 0, 0, function(x, y) {
        switch (Math.round(Common.random(0, 1))) {
        case 0:
            if (Common.random() < 0.8) {
                return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50));
            } else {
                return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30));
            }
        case 1:
            return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 50));
        }
    });
    
    Composite.add(world, stack);

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
        min: { x: 0, y: 0 },
        max: { x: 400, y: 600 }
    });
};
