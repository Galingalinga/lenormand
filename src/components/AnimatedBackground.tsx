import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

interface YarnThread {
    index: number;
    x: number;
    y: number;
    points: { x: number; y: number }[];
    maxLength: number;
    angle: number;
    velocity: number;
    color: string;
    lineWidth: number;
    noiseOffset: number;
}

export const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const threadsRef = useRef<YarnThread[]>([]);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const threadCount = 5;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const createThread = (index: number): YarnThread => {
            return {
                index,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                points: [],
                maxLength: Math.random() * 100 + 150,
                angle: Math.random() * Math.PI * 2,
                velocity: Math.random() * 0.5 + 0.5,
                color: ['#BAE6FD', '#7DD3FC', '#FFFFFF', '#38BDF8'][index % 4],
                lineWidth: Math.random() * 3 + 2,
                noiseOffset: Math.random() * 1000,
            };
        };

        const resetThread = (thread: YarnThread) => {
            thread.x = Math.random() * canvas.width;
            thread.y = Math.random() * canvas.height;
            thread.points = [];
            thread.maxLength = Math.random() * 100 + 150;
            thread.angle = Math.random() * Math.PI * 2;
            thread.velocity = Math.random() * 0.5 + 0.5;
            thread.lineWidth = Math.random() * 3 + 2;
            thread.noiseOffset = Math.random() * 1000;
        };

        const updateThread = (thread: YarnThread) => {
            thread.angle += Math.sin(Date.now() * 0.001 + thread.noiseOffset) * 0.05;
            thread.x += Math.cos(thread.angle) * thread.velocity;
            thread.y += Math.sin(thread.angle) * thread.velocity;

            thread.points.push({ x: thread.x, y: thread.y });

            if (thread.points.length > thread.maxLength) {
                thread.points.shift();
            }

            if (
                thread.x < -100 ||
                thread.x > canvas.width + 100 ||
                thread.y < -100 ||
                thread.y > canvas.height + 100
            ) {
                resetThread(thread);
            }
        };

        const drawThread = (thread: YarnThread) => {
            if (thread.points.length < 2) return;

            ctx.beginPath();
            ctx.moveTo(thread.points[0].x, thread.points[0].y);

            for (let i = 1; i < thread.points.length; i++) {
                ctx.lineTo(thread.points[i].x, thread.points[i].y);
            }

            ctx.strokeStyle = thread.color;
            ctx.lineWidth = thread.lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.setLineDash([10, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            const head = thread.points[thread.points.length - 1];
            ctx.fillStyle = thread.color;
            ctx.beginPath();
            ctx.arc(head.x, head.y, thread.lineWidth * 0.8, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawBackground = () => {
            ctx.fillStyle = '#a0cdea';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 針織紋理
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            const spacing = 20;
            for (let x = 0; x < canvas.width; x += spacing) {
                ctx.beginPath();
                for (let y = 0; y < canvas.height; y += 10) {
                    const xOffset = Math.sin(y * 0.1) * 3;
                    if (y === 0) ctx.moveTo(x + xOffset, y);
                    else ctx.lineTo(x + xOffset, y);
                }
                ctx.stroke();
            }
        };

        const init = () => {
            threadsRef.current = [];
            for (let i = 0; i < threadCount; i++) {
                threadsRef.current.push(createThread(i));
            }
        };

        const loop = () => {
            drawBackground();
            threadsRef.current.forEach((thread) => {
                updateThread(thread);
                drawThread(thread);
            });
            animationFrameRef.current = requestAnimationFrame(loop);
        };

        window.addEventListener('resize', resize);
        resize();
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="animated-background" />;
};
