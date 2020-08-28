import {Tweener} from "./Tweener";
import {Ease} from "./ease";

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

app.loader
    .add('sym1', 'images/sym1.png')
    .add('sym2', 'images/sym2.png')
    .add('sym3', 'images/sym3.png')
    .add('sym4', 'images/sym4.png')
    .add('symDiamond1', 'images/symDiamond1.png')
    .add('symDiamond2', 'images/symDiamond2.png')
    .add('symDiamond3', 'images/symDiamond3.png')
    .add('symDiamond4', 'images/symDiamond4.png')
    .add('symWild', 'images/symWild.png')
    .add('symScatter', 'images/symScatter.png')
    .load(onAssetsLoaded);

const REEL_WIDTH = 160;
const SYMBOL_SIZE = 150;
const tweener = new Tweener(app.ticker);

// onAssetsLoaded handler builds the example.
function onAssetsLoaded() {
    // Create different slot symbols.
    const slotTextures = [
        PIXI.Texture.from('sym1'),
        PIXI.Texture.from('sym2'),
        PIXI.Texture.from('sym3'),
        PIXI.Texture.from('sym4'),
        PIXI.Texture.from("symDiamond1"),
        PIXI.Texture.from("symDiamond2"),
        PIXI.Texture.from("symDiamond3"),
        PIXI.Texture.from("symDiamond4"),
        PIXI.Texture.from("symWild"),
        PIXI.Texture.from("symScatter"),
    ];

    // Build the reels
    const reels = [] as Array<any>;
    const reelContainer = new PIXI.Container();
    for (let i = 0; i < 5; i++) {
        const rc = new PIXI.Container();
        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);


        const reel = {
            container: rc,
            symbols: [] as Array<PIXI.Sprite>,
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Build the symbols
        for (let j = 0; j < 4; j++) {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            // Scale the symbol to fit symbol area.
            // symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);

    // Build top & bottom covers and position reelContainer
    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);
    const top = new PIXI.Graphics();
    top.beginFill(0, 1);
    top.drawRect(0, 0, app.screen.width, margin);
    const bottom = new PIXI.Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);

    // Add play text
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const playText = new PIXI.Text('Spin the wheels!', style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    // Add header text
    const headerText = new PIXI.Text('Simple Slot Game!', style);
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    app.stage.addChild(top);
    app.stage.addChild(bottom);

    // Set the interactivity.
    bottom.interactive = true;
    bottom.buttonMode = true;
    bottom.addListener('pointerdown', () => {
        startPlay();
    });

    let running = false;

    // Function to start playing.
    function startPlay() {
        if (running) return;
        running = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 500 + i * 600 + extra * 600;
            tweener.new().tween(r, 'position', target, time, Ease.backout(0.5), (x) => x, r.position, ()=> {}, i === reels.length - 1 ? reelsComplete : ()=> {}).start();
        }
    }

    // Reels done handler.
    function reelsComplete() {
        running = false;
    }

    // Listen for animate update.
    app.ticker.add((delta) => {
        // Update the slots.
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            // Update blur filter y amount based on speed.
            // This would be better if calculated with time in mind also. Now blur depends on frame rate.
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    // Detect going over and swap a texture.
                    // This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
    });
}
