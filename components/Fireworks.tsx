
import React from 'react';

const Firework: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    return <div className="firework" style={style}></div>;
};

export default function Fireworks() {
    const fireworks = Array.from({ length: 15 }).map((_, i) => {
        const style: React.CSSProperties = {
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 50 + 20}%`,
            animation: `firework-anim 1.5s ${Math.random() * 1.5}s ease-out forwards`,
            transform: `scale(${0.5 + Math.random() * 0.5})`,
        };
        return <Firework key={i} style={style} />;
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {fireworks}
            <style>{`
                .firework {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: transparent;
                    opacity: 0;
                }

                .firework::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    box-shadow: 
                        0 0 10px 5px #fff,
                        0 0 12px 7px #f0f,
                        0 0 15px 10px #0ff;
                }

                @keyframes firework-anim {
                    0% {
                        opacity: 1;
                        transform: scale(0.1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.5);
                    }
                }
            `}</style>
        </div>
    );
}
