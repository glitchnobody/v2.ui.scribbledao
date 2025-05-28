import React from "react";
import styles from "./moodboardBackup.module.css";
import DraggableCard from "@/components/ui/DraggableCard";
import { useMoodBoard } from "../../lib/hooks/useMoodBoard";

interface cardProps {
  id: number;
  x: number;
  y: number;
  zIndex: number;
  content: {
    type: "text" | "image" | "color";
    data: string;
    title?: string;
  };
  size?: "small" | "medium" | "large";
}

const MoodBoardBackup: React.FC = () => {
  const { cards, boardDimensions, boardRef, bringToFront, updatePosition } =
    useMoodBoard();

  return (
    <div ref={boardRef} className={styles.moodboard}>
      {cards.map((card: cardProps) => (
        <DraggableCard
          key={card.id}
          id={card.id}
          initialX={card.x}
          initialY={card.y}
          zIndex={card.zIndex}
          size={card.size} // Use the card's size or default to medium
          onDragStart={() => bringToFront(card.id)}
          onPositionChange={(x, y) => updatePosition(card.id, x, y)}
          content={card.content}
          boardDimensions={boardDimensions}
        />
      ))}

      {/* Instructions */}
      <div className={styles.instructions}>
        <span>Drag cards to rearrange</span>
      </div>
    </div>
  );
};

export default MoodBoardBackup;
