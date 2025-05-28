import { useState, useRef, useEffect } from "react";

import {
  resolveAllCollisions,
  constrainCardsWithinBoundary,
  CARD_WIDTH,
  CARD_HEIGHT,
} from "./cardUtils";

export interface CardPosition {
  id: number;
  x: number;
  y: number;
  zIndex: number;
  size?: "small" | "medium" | "large";
  content: {
    type: "text" | "image" | "color";
    data: string;
    title?: string;
  };
}

const initialCards: CardPosition[] = [
  {
    id: 1,
    x: 50,
    y: 50,
    size: "medium",
    zIndex: 1,
    content: {
      type: "text",
      data: "Design inspiration for our new project. Keep it minimal and clean.",
      title: "Project Notes",
    },
  },
  {
    id: 2,
    x: 250,
    y: 100,
    zIndex: 2,
    size: "large",
    content: {
      type: "image",
      data: "https://images.unsplash.com/photo-1519422640531-608486fed8fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Reference Image",
    },
  },
  {
    id: 3,
    x: 150,
    y: 250,
    zIndex: 3,
    size: "small",
    content: {
      type: "color",
      data: "#FDE1D3",
      title: "Primary Color",
    },
  },
  {
    id: 4,
    x: 400,
    y: 200,
    zIndex: 4,
    size: "medium",
    content: {
      type: "color",
      data: "#D3E4FD",
      title: "Secondary Color",
    },
  },
  {
    id: 5,
    x: 500,
    y: 80,
    zIndex: 5,
    size: "small",
    content: {
      type: "text",
      data: "Remember to add more white space and focus on typography.",
      title: "Design Tips",
    },
  },
  {
    id: 6,
    x: 300,
    y: 350,
    zIndex: 6,
    size: "large",
    content: {
      type: "image",
      data: "https://plus.unsplash.com/premium_photo-1661843927331-bd6189336607?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mood Reference",
    },
  },
];

export function useMoodBoard() {
  const [cards, setCards] = useState<CardPosition[]>([]);
  const [boardDimensions, setBoardDimensions] = useState({
    width: 0,
    height: 0,
  });
  const highestZIndex = useRef<number>(1);
  const boardRef = useRef<HTMLDivElement>(null);

  // Initialize cards and set up board dimensions
  useEffect(() => {
    setCards(initialCards);
    highestZIndex.current = initialCards.length;

    // Set initial board dimensions
    updateBoardDimensions();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateBoardDimensions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update board dimensions and constrain cards within boundaries when dimensions change
  const updateBoardDimensions = () => {
    if (boardRef.current) {
      const { width, height } = boardRef.current.getBoundingClientRect();
      setBoardDimensions({ width, height });

      // Constrain existing cards within new boundaries
      setCards((prevCards) =>
        constrainCardsWithinBoundary(prevCards, width, height)
      );
    }
  };

  const bringToFront = (id: number) => {
    highestZIndex.current += 1;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, zIndex: highestZIndex.current } : card
      )
    );
  };

  const updatePosition = (id: number, x: number, y: number) => {
    setCards((prevCards) => {
      // Find the card being moved
      const newCards = [...prevCards];
      const movedCardIndex = newCards.findIndex((card) => card.id === id);
      if (movedCardIndex === -1) return prevCards;

      // Constrain position within board boundaries
      let constrainedX = x;
      let constrainedY = y;

      if (boardDimensions.width > 0 && boardDimensions.height > 0) {
        constrainedX = Math.max(
          0,
          Math.min(x, boardDimensions.width - CARD_WIDTH)
        );
        constrainedY = Math.max(
          0,
          Math.min(y, boardDimensions.height - CARD_HEIGHT)
        );
      }

      // Update position of moved card with constrained coordinates
      newCards[movedCardIndex] = {
        ...newCards[movedCardIndex],
        x: constrainedX,
        y: constrainedY,
      };

      // Resolve all collisions after updating the position
      return resolveAllCollisions(
        newCards,
        boardDimensions.width,
        boardDimensions.height
      );
    });
  };

  return {
    cards,
    boardDimensions,
    boardRef,
    bringToFront,
    updatePosition,
  };
}
