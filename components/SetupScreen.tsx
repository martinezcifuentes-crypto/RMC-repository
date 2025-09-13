import React from 'react';

interface SetupScreenProps {
    onStartGame: (count: number) => void;
}

const OptionButton: React.FC<{ count: number; onClick: (count: number) => void }> = ({ count, onClick }) => (
    <button
        onClick={() => onClick(count)}
        className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out dark:focus:ring-teal-500"
    >
        {count} Tarjetas
    </button>
);

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
    return (
        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-center text-green-800 dark:text-gray-100 mb-6">Elige la Dificultad</h2>
            <div className="space-y-4">
                <OptionButton count={30} onClick={onStartGame} />
                <OptionButton count={40} onClick={onStartGame} />
                <OptionButton count={50} onClick={onStartGame} />
            </div>
        </div>
    );
}