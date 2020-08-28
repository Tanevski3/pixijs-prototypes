export class InputProcessor {

    public static processInput(app: PIXI.Application) {
        if(app == undefined || app == null){
            throw new Error("Cannot process input since app is not okay!");
        }
        let children = app.stage.children;
        
        document.addEventListener('keydown', function(event) {
            children.forEach( (c: any) => {
                if(c.processInput != undefined){
                    c.processInput(event);
                }
            });
        });
    }
    
    public static isActionPressed(event: any, expression: any){
            switch(expression) {
                case "ui_left":
                    return event.keyCode === 65 || event.keyCode === 37;
                case "ui_right":
                    return event.keyCode === 68 || event.keyCode === 39;
                default:
                    return false;
            } 
    }
}