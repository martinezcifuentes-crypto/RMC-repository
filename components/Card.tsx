import React from 'react';
import type { CardData } from '../types';

interface CardProps {
    cardData: CardData;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
    isDisabled: boolean;
    isIncorrect: boolean;
}

export default function Card({ cardData, isFlipped, isMatched, onClick, isDisabled, isIncorrect }: CardProps) {
    const cardContent = (
        <div className="flex items-center justify-center h-full">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-math select-none">
                {cardData.content}
            </span>
        </div>
    );
    
    const cardClasses = `
        w-full aspect-square transition-transform duration-500 transform-style-preserve-3d rounded-lg shadow-md
        ${isFlipped ? 'rotate-y-180' : ''}
        ${isMatched ? 'opacity-50 border-2 border-green-500' : ''}
        ${isIncorrect ? 'animate-shake' : ''}
    `;
    
    const frontBackClasses = "absolute w-full h-full backface-hidden rounded-lg p-2 flex items-center justify-center";

    return (
        <div className="perspective-1000" onClick={!isDisabled && !isMatched ? onClick : undefined}>
            <div className={cardClasses} style={{ cursor: isDisabled || isMatched ? 'default' : 'pointer' }}>
                {/* Card Front (Content) */}
                <div className={`${frontBackClasses} bg-lime-100 dark:bg-gray-700 text-black dark:text-white rotate-y-180`}>
                    {cardContent}
                </div>
                {/* Card Back (Pattern) */}
                <div className={`${frontBackClasses} bg-green-500 dark:bg-teal-600`}>
                    {/* Puzzle icon removed for a cleaner look */}
                </div>
            </div>
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-preserve-3d { transform-style: preserve-3d; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                    border: 2px solid #ef4444; /* red-500 */
                }
            `}</style>
        </div>
    );
}