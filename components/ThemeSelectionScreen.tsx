import React from 'react';
import type { Theme } from '../types';

interface ThemeSelectionScreenProps {
    onThemeSelect: (theme: Theme) => void;
}

const ThemeButton: React.FC<{ theme: Theme; label: string; icon: JSX.Element; onClick: (theme: Theme) => void }> = ({ theme, label, icon, onClick }) => (
    <button
        onClick={() => onClick(theme)}
        className="w-full bg-white/80 dark:bg-gray-700/80 text-green-800 dark:text-gray-100 font-bold py-6 px-6 rounded-lg shadow-lg hover:bg-green-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-teal-500 transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col items-center justify-center space-y-2"
    >
        {icon}
        <span>{label}</span>
    </button>
);


export default function ThemeSelectionScreen({ onThemeSelect }: ThemeSelectionScreenProps) {
    return (
        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-center text-green-800 dark:text-gray-100 mb-6">Elige un Tema</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ThemeButton
                    theme="light"
                    label="Tema Claro"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 5.05a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" />
                        </svg>
                    }
                    onClick={onThemeSelect}
                />
                <ThemeButton
                    theme="dark"
                    label="Tema Oscuro"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    }
                    onClick={onThemeSelect}
                />
            </div>
        </div>
    );
}
