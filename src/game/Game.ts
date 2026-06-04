import { Enemy } from "./Enemy";

export class Game {
    private ctx: CanvasRenderingContext2D;

    private enemy: Enemy;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.enemy = new Enemy();
    }

    update() {
        this.enemy.update();

        if(this.enemy.hasReachedEnd()){
            this.enemy = new Enemy();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, 800, 600);

        this.ctx.fillStyle = "#1e1e1e";
        this.ctx.fillRect(0, 0, 800, 600);

        this.ctx.fillStyle = "#a88b5c";

        this.ctx.fillRect(0, 250, 250, 60);
        this.ctx.fillRect(250, 250, 60, 150);
        this.ctx.fillRect(250, 340, 300, 60);
        this.ctx.fillRect(550, 100, 60, 300);
        this.ctx.fillRect(550, 100, 200, 60);

        this.enemy.draw(this.ctx);
    }
}