import { Sprite, Texture } from "pixi.js";

export class Card extends PIXI.Sprite {

  constructor() {
    super(PIXI.Texture.fromImage("images/card.png"));
  }
}