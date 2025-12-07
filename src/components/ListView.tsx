import { useState, useRef, useCallback } from "react";
import { Dish } from "@/types/sushi";
import { SushiItem } from "./SushiItem";

interface ListViewProps {
  dishes: Dish[];
  onDragStart: (e: React.DragEvent, dish: Dish) => void;
  onTouchStart?: (dish: Dish, source: string) => (e: React.TouchEvent) => void;
}

export function ListView({ dishes, onDragStart, onTouchStart }: ListViewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((e: React.DragEvent, dish: Dish) => {
    setIsDragging(true);
    onDragStart(e, dish);
  }, [onDragStart]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStartWrapper = useCallback((dish: Dish, source: string) => (e: React.TouchEvent) => {
    setIsDragging(true);
    onTouchStart?.(dish, source)(e);
  }, [onTouchStart]);

  return (
    <div 
      ref={containerRef}
      className="p-3 sm:p-5 max-h-64 overflow-y-auto"
      style={{ overflowY: isDragging ? 'hidden' : 'auto' }}
      onDragEnd={handleDragEnd}
      onTouchEnd={() => setIsDragging(false)}
      onTouchCancel={() => setIsDragging(false)}
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {dishes.map((dish) => (
          <SushiItem
            key={dish.id}
            dish={dish}
            variant="tier"
            onDragStart={handleDragStart}
            onTouchStart={onTouchStart ? handleTouchStartWrapper(dish, 'pool') : undefined}
          />
        ))}
      </div>
    </div>
  );
}
