import { Ease } from "./ease";
import { Tweener, Tweening } from "./Tweener";
import { app } from "./app";
import { images } from "./images";

export class Card extends PIXI.Sprite {
  private readonly tweener = new Tweener(app.ticker);

  constructor() {
    super(PIXI.Texture.from("images/circle.png"));
    this.setup();
    this._tweening = this.tweener
      .new()
      .tween(this.scale, "x", 0.8, 417.0, Ease.getPowIn(3))
      .tween(this.scale, "y", 0.8, 417.0, Ease.getPowIn(3));
  }

  private _tweening: Tweening;

  public async goToCorner() {
    this._tweening.start();
    setTimeout(() => {}, 10);

    this._tweening.pause();
    this._tweening.start();
    await this.tweener
      .new()
      .tween(this.position, "x", 100, 4179.0, Ease.backout(0.6))
      .tween(this.position, "y", 100, 4179.0, Ease.backout(0.6))
      .startAsPromise()
      .then(res => {
        alert("Promise, finished!. YEEEEEE");
      });
  }

  public pause() {
    this._tweening.pause();
  }

  public async goBack() {
    const resetX = app.screen.width / 2;
    const resetY = app.screen.height / 2;
    return this.tweener
      .new()
      .tween(this.position, "x", resetX, 4179.0, Ease.backout(0.6))
      .tween(this.position, "y", resetY, 4179.0, Ease.backout(0.6))
      .startAsPromise();
  }

  public async jump() {
    let x = this.position.x;
    let y = this.position.y;
    const duration = 1179;

    const tweeningUp = this.tweener
      .new()
      .tween(this.position, "x", x + 30, duration, Ease.backout(0.6))
      .tween(this.position, "y", y - 100, duration, Ease.backout(0.6));
    const tweeningDown = this.tweener
      .new()
      .tween(this.position, "x", x + 30 + 30, duration, Ease.backout(0.6))
      .tween(this.position, "y", y, duration, Ease.backout(0.6));
    await tweeningUp.startAsPromise();
    await tweeningDown.startAsPromise();
  }

  public async spin() {
    const duration = 10179;

    return this.tweener
      .new()
      .tween(this, "rotation", 100, duration, Ease.backout(0.6))
      .startAsPromise();
  }

  public async orchestrate() {
    await this.goToCorner();
    await this.goBack();
    await this.spin();
    await this.jump();
    alert("Demo over!");
  }

  private setup() {
    this.anchor.set(0.5);
    this.scale.set(0.4, 0.4);
    // center the sprite's anchor point
    // move the sprite to the center of the screen
    this.x = app.screen.width / 2;
    this.y = app.screen.height / 2;
  }
}
