import { Enemy } from "./Enemy";

export class Tower {
    x: number;
    y: number;
    range = 125;
    target: Enemy | null = null;
    cooldown = 0;
    fireRate = 60;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    update(enemies: Enemy[]){
        this.target = this.getTarget(enemies);

        if(this.cooldown > 0) {
            this.cooldown--;
        }
    }

    canShoot() {
        return this.target && this.cooldown === 0;
    }

    resetCooldown() {
        this.cooldown = this.fireRate;
    }

    getTarget(enemies: Enemy[]){
        for(const enemy of enemies) {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance <= this.range){
                return enemy;
            }
        }

        return null;
    }
    
    draw(ctx: CanvasRenderingContext2D){
        //tower
        ctx.fillStyle = "cyan";
        ctx.fillRect(
            this.x - 15,
            this.y - 15,
            30,
            30
        );

        //range circle
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.range,
            0,
            Math.PI * 2
        )
        ctx.stroke();

        //targeting line
        if(this.target){
            ctx.strokeStyle = "yellow";

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.target.x, this.target.y);
            ctx.stroke();
        }
    }
}