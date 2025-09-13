
import type { CardData } from '../types';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateCards = (pairCount: number): CardData[] => {
  const allPairs: { multiplication: string; result: number }[] = [];
  
  for (let i = 2; i <= 9; i++) {
    for (let j = i; j <= 9; j++) {
      allPairs.push({
        multiplication: `${i} × ${j}`,
        result: i * j,
      });
    }
  }

  const shuffledPairs = shuffleArray(allPairs);
  const selectedPairs = shuffledPairs.slice(0, pairCount);

  let cards: CardData[] = [];
  selectedPairs.forEach((pair, index) => {
    const pairId = `pair-${index}`;
    cards.push({
      id: `card-${index}-a`,
      pairId: pairId,
      content: pair.multiplication,
      type: 'multiplication',
    });
    cards.push({
      id: `card-${index}-b`,
      pairId: pairId,
      content: pair.result.toString(),
      type: 'result',
    });
  });

  return shuffleArray(cards);
};
