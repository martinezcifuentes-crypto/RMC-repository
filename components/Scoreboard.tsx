import React from 'react';
import type { PlayerNames } from '../types';

interface ScoreboardProps {
    scores: { player1: number; player2: number };
    currentPlayer: 1 | 2;
    playerNames: PlayerNames;
}

const PlayerScore: React.FC<{ name: string; score: number; isActive: boolean }> = ({ name, score, isActive }) => {
    const activeClasses = 'bg-green-500 dark:bg-teal-500 text-white scale-105 shadow-lg';
    const inactiveClasses = 'bg-white/80 dark:bg-gray-700/80 text-green-800 dark:text-gray-100';

    return (
        <div className={`p-4 rounded-xl text-center transition-all duration-300 w-full ${isActive ? activeClasses : inactiveClasses}`}>
            <p className="text-sm font-semibold uppercase tracking-wider truncate" title={name}>{name}</p>
            <p className="text-3xl font-bold font-math">{score}</p>
        </div>
    );
};

export default function Scoreboard({ scores, currentPlayer, playerNames }: ScoreboardProps) {
    return (
        <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-sm mx-auto">
            <PlayerScore name={playerNames.player1} score={scores.player1} isActive={currentPlayer === 1} />
            <PlayerScore name={playerNames.player2} score={scores.player2} isActive={currentPlayer === 2} />
        </div>
    );
}