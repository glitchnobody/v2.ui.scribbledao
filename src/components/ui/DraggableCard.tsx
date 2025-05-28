import React, { useState, useEffect, useRef } from "react";
import styles from "./moodboard.module.css";
import { getCardDimensions } from "@/lib/hooks/cardUtils";

interface DraggableCardProps {
  id: number;
  initialX: number;
  initialY: number;
  zIndex: number;
  onDragStart: () => void;
  onPositionChange: (x: number, y: number) => void;
  content: {
    type: "text" | "image" | "color";
    data: string;
    title?: string;
  };
  boardDimensions: {
    width: number;
    height: number;
  };
  size?: "small" | "medium" | "large";
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  initialX,
  initialY,
  zIndex,
  onDragStart,
  onPositionChange,
  content,
  boardDimensions,
  size,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Get card dimensions based on size
  const { width: CARD_WIDTH, height: CARD_HEIGHT } = getCardDimensions(size);

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      // Position the card so the cursor is at the same relative position during the entire drag
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      setIsDragging(true);
      onDragStart();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (cardRef.current && e.touches[0]) {
      const touch = e.touches[0];
      // Position the card so the touch point is at the same relative position during the entire drag
      dragOffset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
      setIsDragging(true);
      onDragStart();
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Calculate new position based on the initial grab point
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;

        // Constrain position to stay within board boundaries
        let constrainedX = newX;
        let constrainedY = newY;

        if (boardDimensions.width > 0 && boardDimensions.height > 0) {
          constrainedX = Math.max(
            0,
            Math.min(newX, boardDimensions.width - CARD_WIDTH)
          );
          constrainedY = Math.max(
            0,
            Math.min(newY, boardDimensions.height - CARD_HEIGHT)
          );
        }

        setPosition({ x: constrainedX, y: constrainedY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        const touch = e.touches[0];
        // Calculate new position based on the initial grab point
        const newX = touch.clientX - dragOffset.current.x;
        const newY = touch.clientY - dragOffset.current.y;

        // Constrain position to stay within board boundaries
        let constrainedX = newX;
        let constrainedY = newY;

        if (boardDimensions.width > 0 && boardDimensions.height > 0) {
          constrainedX = Math.max(
            0,
            Math.min(newX, boardDimensions.width - CARD_WIDTH)
          );
          constrainedY = Math.max(
            0,
            Math.min(newY, boardDimensions.height - CARD_HEIGHT)
          );
        }

        setPosition({ x: constrainedX, y: constrainedY });
        e.preventDefault(); // Prevent scrolling while dragging
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onPositionChange(position.x, position.y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [
    isDragging,
    onPositionChange,
    position.x,
    position.y,
    boardDimensions,
    CARD_WIDTH,
    CARD_HEIGHT,
  ]);

  const renderContent = () => {
    switch (content.type) {
      case "text":
        return (
          <div className={styles.contentContainer}>
            {content.title && (
              <h3 className={styles.contentTitle}>{content.title}</h3>
            )}
            <p className={styles.textContent}>{content.data}</p>
          </div>
        );
      case "image":
        return (
          <div className={styles.contentContainer}>
            {content.title && (
              <h3 className={styles.contentTitle}>{content.title}</h3>
            )}
            <div className={styles.imageContainer}>
              <img
                src={content.data}
                alt={content.title || "Mood image"}
                className={styles.image}
              />
            </div>
          </div>
        );
      case "color":
        return (
          <div className={styles.contentContainer}>
            {content.title && (
              <h3 className={styles.contentTitle}>{content.title}</h3>
            )}
            <div
              className={styles.colorSwatch}
              style={{ backgroundColor: content.data }}
            ></div>
            <div className={styles.colorCode}>{content.data}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.draggableCard} ${
        isDragging ? styles.draggingCard : styles.nonDraggingCard
      } ${styles[`card_${size}`]}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex,
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {renderContent()}
    </div>
  );
};

export default DraggableCard;
