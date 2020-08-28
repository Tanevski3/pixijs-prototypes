import { InputProcessor } from "./input-processor";
import { Card } from "./card";
import { app } from "./app";
import { Counter } from "./counter";
import { images } from "./images";

PIXI.loader.load(function load(loader: any, resources: any) {
  InputProcessor.processInput(app);

  const card = new Card();
  app.stage.addChild(card);
  let counter = new Counter();
  app.stage.addChild(counter);
  counter.countUp();
  card.orchestrate();
});
