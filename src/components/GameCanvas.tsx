import { useEffect, useRef } from "react";
import { Game } from "../game/Game";

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Game | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const game = new Game(ctx);

        gameRef.current = game;

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            game.addTower(x, y);
        }

        canvas.addEventListener("click", handleClick);

        const gameLoop = () => {
            game.update();
            game.draw();

            requestAnimationFrame(gameLoop);
        }

        gameLoop();

        return () => {
            canvas.removeEventListener("click", handleClick);
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{
                border: "2px solid white",
            }}
        />
    )
}