import { images } from "./images"
import { InputProcessor } from "./input-processor"
import { Card } from "./card"
import { Texture } from "pixi.js";

const app = new PIXI.Application({ width: 800, height: 600, antialias: true, transparent: false});

const coverFullScreen = function(app: PIXI.Application) {
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
};

app.renderer.backgroundColor = 0xDDE0E4;

// coverFullScreen(app);
app.renderer.resize(800, 600);
// app.view = <canvas> element
document.body.appendChild(app.view);
    
PIXI.loader.load(function load(loader: any, resources: any) {
    InputProcessor.processInput(app);
    
    for(let image in images) { 
        loader.add(image, images.get(image));
    }

    loader.add('spineboy', 'spines/spineboy/spineboy.json');
    
let spineBoy = new PIXI["spine"].Spine(resources.spineboy);
 // set the position
 spineBoy.x = app.screen.width / 2;
 spineBoy.y = app.screen.height;

 spineBoy.scale.set(1.5);

 // set up the mixes!
 spineBoy.stateData.setMix('walk', 'jump', 0.2);
 spineBoy.stateData.setMix('jump', 'walk', 0.4);

 // play animation
 spineBoy.state.setAnimation(0, 'walk', true);

 app.stage.addChild(spineBoy);

 app.stage.on('pointerdown', function() {
     spineBoy.state.setAnimation(0, 'jump', false);
     spineBoy.state.addAnimation(0, 'walk', true, 0);
});    
});

function createCard() {
    const card: Card = new Card();
    // center the sprite's anchor point
    card.anchor.set(0.5);
    card.scale.set(0.5, 0.5);
    // move the sprite to the center of the screen
    card.x = app.screen.width / 2;
    card.y = app.screen.height / 2;
    app.stage.addChild(card);
}

