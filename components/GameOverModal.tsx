import React from 'react';
import type { PlayerNames } from '../types';

interface GameOverModalProps {
    winner: 1 | 2 | 'draw';
    scores: { player1: number; player2: number };
    onPlayAgain: () => void;
    playerNames: PlayerNames;
}

export default function GameOverModal({ winner, scores, onPlayAgain, playerNames }: GameOverModalProps) {
    const winnerName = winner === 1 ? playerNames.player1 : playerNames.player2;
    const winnerText = winner === 'draw' ? '¡Es un Empate!' : `¡${winnerName} Gana!`;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-lime-50 dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full animate-fade-in-up border-4 border-green-300 dark:border-gray-600">
                <h2 className="text-3xl font-bold text-green-800 dark:text-teal-300 mb-2">{winnerText}</h2>
                <p className="text-green-700 dark:text-teal-500 mb-6">Puntaje Final</p>
                <div className="flex justify-around text-lg mb-8">
                    <div className="text-green-900 dark:text-gray-100">
                        <span className="block font-semibold truncate" title={playerNames.player1}>{playerNames.player1}</span>
                        <span className="block text-2xl font-bold font-math">{scores.player1}</span>
                    </div>
                     <div className="text-green-900 dark:text-gray-100">
                        <span className="block font-semibold truncate" title={playerNames.player2}>{playerNames.player2}</span>
                        <span className="block text-2xl font-bold font-math">{scores.player2}</span>
                    </div>
                </div>
                <button
                    onClick={onPlayAgain}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out dark:focus:ring-teal-500"
                >
                    Jugar de Nuevo
                </button>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
