export const app = new PIXI.Application({
  width: 800,
  height: 600,
  antialias: true,
  transparent: false
});

const coverFullScreen = function(app: PIXI.Application) {
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

app.renderer.backgroundColor = 0xdde0e4;

// coverFullScreen(app);
app.renderer.resize(800, 600);
// app.view = <canvas> element
document.body.appendChild(app.view);
