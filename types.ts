// FIX: Removed self-import which was causing declaration conflicts.

export type GameState = 'themeSelection' | 'nameInput' | 'setup' | 'playing' | 'gameOver';
export type Theme = 'light' | 'dark';

export interface CardData {
    id: string;
    pairId: string;
    content: string;
    type: 'multiplication' | 'result';
}

export interface PlayerNames {
    player1: string;
    player2: string;
}