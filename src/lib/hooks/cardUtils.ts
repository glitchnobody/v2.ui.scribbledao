export interface CardPosition {
  id: number;
  x: number;
  y: number;
  zIndex: number;
  content: {
    type: "text" | "image" | "color";
    data: string;
    title?: string;
  };
  // Add size property to the card interface
  size?: "small" | "medium" | "large";
}

// Default card dimensions
export const CARD_WIDTH = 200;
export const CARD_HEIGHT = 150;
export const MOVE_DISTANCE = 50;

// Card size dimensions
export const CARD_SIZES = {
  small: { width: 160, height: 120 },
  medium: { width: 200, height: 150 },
  large: { width: 240, height: 180 },
};

// Get card dimensions based on size
export const getCardDimensions = (size?: "small" | "medium" | "large") => {
  if (!size || size === "medium") {
    return { width: CARD_WIDTH, height: CARD_HEIGHT };
  }
  return CARD_SIZES[size];
};

// Check if two cards are overlapping
export const areCardsOverlapping = (
  card1: CardPosition,
  card2: CardPosition
) => {
  const card1Dimensions = getCardDimensions(card1.size);
  const card2Dimensions = getCardDimensions(card2.size);

  return (
    Math.abs(card1.x - card2.x) <
      (card1Dimensions.width + card2Dimensions.width) / 2 &&
    Math.abs(card1.y - card2.y) <
      (card1Dimensions.height + card2Dimensions.height) / 2
  );
};

// Resolve all collisions between all cards
export const resolveAllCollisions = (
  cards: CardPosition[],
  boardWidth: number,
  boardHeight: number
): CardPosition[] => {
  let hasCollision;
  let iterations = 0;
  const MAX_ITERATIONS = 10; // Prevent infinite loops
  let newCards = [...cards];

  // When moving cards, consider their individual sizes
  do {
    hasCollision = false;
    iterations++;

    // Check each pair of cards for collisions
    for (let i = 0; i < newCards.length; i++) {
      for (let j = i + 1; j < newCards.length; j++) {
        if (areCardsOverlapping(newCards[i], newCards[j])) {
          hasCollision = true;

          // Calculate direction vector between the two cards
          const dirX = newCards[j].x - newCards[i].x;
          const dirY = newCards[j].y - newCards[i].y;

          // Normalize direction vector
          const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
          const normDirX = dirX / length;
          const normDirY = dirY / length;

          // Move both cards in opposite directions
          const moveX = normDirX * (MOVE_DISTANCE / 2); // Split the movement between the cards
          const moveY = normDirY * (MOVE_DISTANCE / 2);

          newCards[i] = {
            ...newCards[i],
            x: newCards[i].x - moveX,
            y: newCards[i].y - moveY,
          };
          newCards[j] = {
            ...newCards[j],
            x: newCards[j].x + moveX,
            y: newCards[j].y + moveY,
          };
        }
      }
    }
  } while (hasCollision && iterations < MAX_ITERATIONS);

  // Ensure all cards are within board boundaries after collision resolution
  if (boardWidth > 0 && boardHeight > 0) {
    return constrainCardsWithinBoundary(newCards, boardWidth, boardHeight);
  }

  return newCards;
};

// Function to ensure all cards stay within the board boundaries
export const constrainCardsWithinBoundary = (
  cardsArray: CardPosition[],
  boardWidth: number,
  boardHeight: number
): CardPosition[] => {
  return cardsArray.map((card) => {
    const { width, height } = getCardDimensions(card.size);

    // Constrain position to board boundaries
    const maxX = boardWidth - width;
    const maxY = boardHeight - height;

    const constrainedX = Math.max(0, Math.min(card.x, maxX));
    const constrainedY = Math.max(0, Math.min(card.y, maxY));

    // Return card with constrained position
    return {
      ...card,
      x: constrainedX,
      y: constrainedY,
    };
  });
};
