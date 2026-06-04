export class Tower {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
    
    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = "cyan";

        ctx.fillRect(
            this.x - 15,
            this.y - 15,
            30,
            30
        );
    }
}