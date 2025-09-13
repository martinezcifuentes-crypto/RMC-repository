import React, { useState, useEffect, useCallback } from 'react';
import type { GameState, Theme, CardData, PlayerNames } from './types';
import { generateCards } from './utils/gameLogic';

import ThemeSelectionScreen from './components/ThemeSelectionScreen';
import NameInputScreen from './components/NameInputScreen';
import SetupScreen from './components/SetupScreen';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import GameOverModal from './components/GameOverModal';
import MotivationMessage from './components/MotivationMessage';
import Fireworks from './components/Fireworks';

const MOTIVATIONAL_MESSAGES = [
    '¡Genial!',
    '¡Excelente!',
    '¡Sigue así!',
    '¡Imparable!',
    '¡Muy bien!',
    '¡Increíble!',
    '¡Perfecto!',
    '¡Fantástico!'
];

const App: React.FC = () => {
    // State management
    const [gameState, setGameState] = useState<GameState>('themeSelection');
    const [theme, setTheme] = useState<Theme>('light');
    const [playerNames, setPlayerNames] = useState<PlayerNames>({ player1: 'Jugador 1', player2: 'Jugador 2' });
    const [cards, setCards] = useState<CardData[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
    const [scores, setScores] = useState({ player1: 0, player2: 0 });
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [isDisabled, setIsDisabled] = useState(false);
    const [winner, setWinner] = useState<1 | 2 | 'draw' | null>(null);
    const [incorrectFlicker, setIncorrectFlicker] = useState<number[]>([]);
    
    // Motivation & Effects State
    const [motivationMessage, setMotivationMessage] = useState('');
    const [showFireworks, setShowFireworks] = useState(false);

    // Initialization
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    
    // Game Logic Effects
    useEffect(() => {
        if (flippedIndices.length === 2) {
          setIsDisabled(true);
          const [firstIndex, secondIndex] = flippedIndices;
    
          // Wait for flip animation to finish
          setTimeout(() => {
            if (cards[firstIndex].pairId === cards[secondIndex].pairId) {
              // It's a match!
              setMatchedPairIds(prev => [...prev, cards[firstIndex].pairId]);
              if (currentPlayer === 1) {
                setScores(s => ({ ...s, player1: s.player1 + 1 }));
              } else {
                setScores(s => ({ ...s, player2: s.player2 + 1 }));
              }
              
              // Show celebration
              const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
              setMotivationMessage(randomMessage);
              setShowFireworks(true);
              
              setTimeout(() => {
                setShowFireworks(false);
                setMotivationMessage('');
              }, 2000);
              
              // Reset for the next turn (same player)
              setFlippedIndices([]);
              setIsDisabled(false);
    
            } else {
              // Not a match
              setIncorrectFlicker([...flippedIndices]);
              
              // Wait for the user to see the incorrect pair
              setTimeout(() => {
                setFlippedIndices([]);
                setCurrentPlayer(p => (p === 1 ? 2 : 1));
                setIncorrectFlicker([]);
                setIsDisabled(false);
              }, 1200);
            }
          }, 600); // Delay to see the card flip
        }
      }, [flippedIndices, cards, currentPlayer]);

    useEffect(() => {
        if (cards.length > 0 && matchedPairIds.length === cards.length / 2) {
            if (scores.player1 > scores.player2) {
                setWinner(1);
            } else if (scores.player2 > scores.player1) {
                setWinner(2);
            } else {
                setWinner('draw');
            }
            setTimeout(() => setGameState('gameOver'), 500);
        }
    }, [matchedPairIds, cards.length, scores]);

    // Handlers
    const handleThemeSelect = (selectedTheme: Theme) => {
        setTheme(selectedTheme);
        setGameState('nameInput');
    };

    const handleNamesSubmit = (names: PlayerNames) => {
        setPlayerNames(names);
        setGameState('setup');
    };

    const handleStartGame = (cardCount: number) => {
        setCards(generateCards(cardCount / 2));
        setGameState('playing');
    };

    const handleCardClick = (index: number) => {
        if (isDisabled || flippedIndices.includes(index) || matchedPairIds.includes(cards[index].pairId)) {
            return;
        }
        if (flippedIndices.length < 2) {
            setFlippedIndices(prev => [...prev, index]);
        }
    };
    
    const resetGame = () => {
        setCards([]);
        setFlippedIndices([]);
        setMatchedPairIds([]);
        setScores({ player1: 0, player2: 0 });
        setCurrentPlayer(1);
        setIsDisabled(false);
        setWinner(null);
        setMotivationMessage('');
    };

    const handlePlayAgain = () => {
        resetGame();
        setGameState('setup');
    };
    
    const handleNewGame = () => {
        resetGame();
        setGameState('themeSelection');
    };
    
    // Render Logic
    const renderGameState = () => {
        switch (gameState) {
            case 'themeSelection':
                return <ThemeSelectionScreen onThemeSelect={handleThemeSelect} />;
            case 'nameInput':
                return <NameInputScreen onNamesSubmit={handleNamesSubmit} />;
            case 'setup':
                return <SetupScreen onStartGame={handleStartGame} />;
            case 'playing':
                return (
                    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
                        <div className="flex justify-center items-center gap-4 mb-8">
                            <Scoreboard scores={scores} currentPlayer={currentPlayer} playerNames={playerNames} />
                        </div>
                        <GameBoard
                            cards={cards}
                            flippedIndices={flippedIndices}
                            matchedPairIds={matchedPairIds}
                            onCardClick={handleCardClick}
                            isDisabled={isDisabled}
                            incorrectFlicker={incorrectFlicker}
                        />
                    </div>
                );
            case 'gameOver':
                return winner !== null ? (
                    <GameOverModal winner={winner} scores={scores} onPlayAgain={handlePlayAgain} playerNames={playerNames} />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <main className={`min-h-screen w-full flex flex-col items-center justify-center p-4 bg-lime-50 dark:bg-gray-900 transition-colors duration-500 font-sans text-gray-800 dark:text-gray-200`}>
             <div className="absolute top-4 left-4">
                <button 
                    onClick={handleNewGame}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-teal-600 dark:hover:bg-teal-700"
                >
                    Nuevo Juego
                </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-teal-400 mb-2 font-display tracking-wide">
                Memoria Matemática
            </h1>
            <p className="text-green-600 dark:text-gray-400 mb-8">¡Encuentra los pares de multiplicación!</p>
            {renderGameState()}
            {motivationMessage && <MotivationMessage key={motivationMessage} message={motivationMessage} />}
            {showFireworks && <Fireworks />}
            {gameState === 'gameOver' && <Fireworks />}
        </main>
    );
};

export default App;