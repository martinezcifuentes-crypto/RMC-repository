import React, { useState } from 'react';
import type { PlayerNames } from '../types';

interface NameInputScreenProps {
    onNamesSubmit: (names: PlayerNames) => void;
}

export default function NameInputScreen({ onNamesSubmit }: NameInputScreenProps) {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (player1.trim() && player2.trim()) {
            onNamesSubmit({ player1: player1.trim(), player2: player2.trim() });
        }
    };

    const canSubmit = player1.trim() && player2.trim();

    return (
        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-center text-green-800 dark:text-gray-100 mb-6">Ingresen sus Nombres</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="player1" className="block text-sm font-medium text-green-700 dark:text-gray-300 mb-1">Jugador 1</label>
                    <input
                        type="text"
                        id="player1"
                        value={player1}
                        onChange={(e) => setPlayer1(e.target.value)}
                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                        placeholder="Nombre del Jugador 1"
                        maxLength={15}
                        aria-label="Nombre del Jugador 1"
                    />
                </div>
                <div>
                    <label htmlFor="player2" className="block text-sm font-medium text-green-700 dark:text-gray-300 mb-1">Jugador 2</label>
                    <input
                        type="text"
                        id="player2"
                        value={player2}
                        onChange={(e) => setPlayer2(e.target.value)}
                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                        placeholder="Nombre del Jugador 2"
                        maxLength={15}
                        aria-label="Nombre del Jugador 2"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none dark:focus:ring-teal-500 dark:disabled:bg-gray-600"
                >
                    Continuar
                </button>
            </form>
        </div>
    );
}
