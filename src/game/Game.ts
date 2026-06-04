export class Game {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    draw() {
        this.ctx.fillStyle = "#1e1e1e";
        this.ctx.fillRect(0, 0, 800, 600);

        this.ctx.fillStyle = "#a88b5c";

        this.ctx.fillRect(0, 250, 250, 60);
        this.ctx.fillRect(250, 250, 60, 150);
        this.ctx.fillRect(250, 340, 300, 60);
        this.ctx.fillRect(550, 100, 60, 300);
        this.ctx.fillRect(550, 100, 200, 60);
    }
}