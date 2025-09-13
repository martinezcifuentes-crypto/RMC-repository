import React from 'react';

interface MotivationMessageProps {
    message: string;
}

export default function MotivationMessage({ message }: MotivationMessageProps) {
    if (!message) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[60]">
            <div className="animate-pop-in-out">
                <p 
                    className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white text-center drop-shadow-lg"
                    style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
                >
                    {message}
                </p>
            </div>
            <style>{`
                @keyframes pop-in-out {
                    0% {
                        opacity: 0;
                        transform: scale(0.5);
                    }
                    20%, 80% {
                        opacity: 1;
                        transform: scale(1.1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.5);
                    }
                }
                .animate-pop-in-out {
                    animation: pop-in-out 2s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
}