import { Enemy } from "./Enemy";

export class Projectile {
    x: number;
    y: number;

    speed = 5;
    damage = 25;
    target: Enemy;
    isDestroyed = false;
    
    constructor(x: number, y: number, target: Enemy){
        this.x = x;
        this.y = y;
        this.target = target;
    }

    update(){
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.speed) {
            this.target.health -= this.damage;

            this.isDestroyed = true;
            
            return;
        }

        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
    };

    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = "orange";

        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    };
}