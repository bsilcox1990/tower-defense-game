import { useEffect, useRef } from "react";
import { Game } from "../game/Game";

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const game = new Game(ctx);

        game.draw();
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