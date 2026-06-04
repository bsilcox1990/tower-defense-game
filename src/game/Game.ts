import { Enemy } from "./Enemy";
import { Tower } from "./Tower";
import { Projectile } from "./Projectile";

export class Game {
    private ctx: CanvasRenderingContext2D;

    private enemies: Enemy[] = [];
    private towers: Tower[] = [];
    private projectiles: Projectile[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.enemies.push(new Enemy());
    }

    isOnPath(x: number, y: number): boolean {
        return (
            (x >= 0 && x <= 250 && y >= 250 && y <= 310) ||
            (x >= 250 && x <= 310 && y >= 250 && y <= 400) ||
            (x >= 250 && x <= 550 && y >= 340 && y <= 400) ||
            (x >= 550 && x <= 610 && y >= 100 && y <= 400) ||
            (x >= 550 && x <= 750 && y >= 100 && y <= 160)
        );
    }

    update() {
        this.towers.forEach(tower => {
            tower.update(this.enemies);

            if(tower.canShoot()) {
                this.projectiles.push(
                    new Projectile(
                        tower.x,
                        tower.y,
                        tower.target!,
                    )
                );

                tower.resetCooldown();
            }
        });

        this.enemies.forEach(enemy => enemy.update());

        this.enemies = this.enemies.filter(
            enemy => enemy.health > 0
        );

        this.enemies = this.enemies.filter(enemy => {
            return !enemy.hasReachedEnd();
        });

        if(this.enemies.length === 0){
            this.enemies.push(new Enemy());
        }

        this.projectiles.forEach(projectile => {
            projectile.update();
        });

        this.projectiles = this.projectiles.filter(
            projectile => !projectile.isDestroyed
        )
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

        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });

        this.towers.forEach(tower => {
            tower.draw(this.ctx);
        });

        this.projectiles.forEach(projectile => {
            projectile.draw(this.ctx);
        })
    }

    addTower(x: number, y: number){
        const towerSize = 30;

        const overlap = this.towers.some(tower => {
            const dx = tower.x - x;
            const dy = tower.y - y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance < towerSize;
        });
        
        if(overlap){
            return;
        }

        if(this.isOnPath(x, y)){
            return;
        }

        this.towers.push(new Tower(x, y));
    }
}