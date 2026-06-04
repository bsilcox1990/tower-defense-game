import { path } from "./Path";

export class Enemy {
    x: number;
    y: number;

    speed = 1.5;

    waypointIndex = 1;

    constructor() {
        this.x = path[0].x;
        this.y = path[0].y;
    }

    update() {
        const target = path[this.waypointIndex];

        if(!target) return;

        const dx = target.x - this.x;
        const dy = target.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            this.x = target.x;
            this.y = target.y;
            this.waypointIndex++;
            return;
        }

        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    hasReachedEnd() {
        return this.waypointIndex >= path.length;
    }
}