import React from 'react';
import type { CardData } from '../types';
import Card from './Card';

interface GameBoardProps {
    cards: CardData[];
    flippedIndices: number[];
    matchedPairIds: string[];
    onCardClick: (index: number) => void;
    isDisabled: boolean;
    incorrectFlicker: number[];
}

export default function GameBoard({ cards, flippedIndices, matchedPairIds, onCardClick, isDisabled, incorrectFlicker }: GameBoardProps) {
    return (
        <div className="w-full max-w-4xl grid gap-2 sm:gap-4 [grid-template-columns:repeat(auto-fit,minmax(4rem,1fr))]">
            {cards.map((card, index) => {
                return (
                    <Card
                        key={card.id}
                        cardData={card}
                        isFlipped={flippedIndices.includes(index) || matchedPairIds.includes(card.pairId)}
                        isMatched={matchedPairIds.includes(card.pairId)}
                        onClick={() => onCardClick(index)}
                        isDisabled={isDisabled && !flippedIndices.includes(index)}
                        isIncorrect={incorrectFlicker.includes(index)}
                    />
                );
            })}
        </div>
    );
}