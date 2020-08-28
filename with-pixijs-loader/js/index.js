// INIT

PIXI.utils.sayHello();

let renderer = PIXI.autoDetectRenderer(512, 512, {
    transparent: true,
    resolution: 1
});

document.getElementById("display").appendChild(renderer.view);

let stage = new PIXI.Container();

// add().load() causes triggering of load over network
PIXI.loader
    .add("dog", "images/dog.png")
    .load(setup);
    
var dog;

function setup(){
    dog = new PIXI.Sprite(
        PIXI.loader.resources["dog"].texture
    );
    // do not mix PIXI.Sprite.from & PIXI.loader.load

    stage.addChild(dog);

    animationLoop();
}

function animationLoop(){
    requestAnimationFrame(animationLoop);

    dog.scale.set(0.3, 0.3);
    dog.x = renderer.width / 2;
    dog.y = renderer.height / 2;
    dog.anchor.set(0,5, 0,5);
    
    dog.rotation += 0.01;
    dog.pivot.set(200, 0);
    
    renderer.render(stage);
}
//# sourceMappingURL=index.js.map