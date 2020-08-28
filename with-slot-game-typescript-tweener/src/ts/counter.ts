import { Ease } from "./ease";
import { Tweener, Tweening } from "./Tweener";
import { app } from "./app";

export class Counter extends PIXI.Text {
  private readonly tweener = new Tweener(app.ticker);

  private _tweening: Tweening;

  constructor() {
    super("0");
    this.style = {
      fontFamily: "Arial",
      fontSize: 124,
      fill: 0xff1010,
      align: "center"
    } as PIXI.TextStyle;
    this.setup();
    this._tweening = this.tweener
      .new()
      .tween(this, "text", 100, 10000.0, Ease.backout(0.6), x => {
        return x > 100 ? 100 : Math.floor(x);
      });
  }

  public async countUp() {
    return this._tweening.startAsPromise();
  }

  private setup() {
    this.anchor.set(0.5);
    // center the sprite's anchor point
    // move the sprite to the center of the screen
    this.x = app.screen.width / 2;
    this.y = app.screen.height / 2;
  }
}
