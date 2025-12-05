import { useState } from "react";
import { Dish } from "@/types/sushi";
import { cn } from "@/lib/utils";

interface SushiItemProps {
  dish: Dish;
  variant?: 'belt' | 'tier';
  onDragStart?: (e: React.DragEvent, dish: Dish) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onClick?: () => void;
  isDragging?: boolean;
}

export function SushiItem({ 
  dish, 
  variant = 'belt', 
  onDragStart, 
  onTouchStart,
  onClick,
  isDragging 
}: SushiItemProps) {
  const [imgError, setImgError] = useState(false);
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('dishId', dish.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(e, dish);
  };

  const handleImgError = () => {
    console.error('Image failed to load:', dish.image);
    setImgError(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // 阻止默认行为以启用自定义拖拽
    e.stopPropagation();
    onTouchStart?.(e);
  };

  if (variant === 'tier') {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        onClick={onClick}
        className={cn(
          "flex flex-col items-center p-1 sm:p-2 bg-card border border-border rounded-lg cursor-pointer",
          "hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95",
          "w-16 sm:w-24 animate-scale-in touch-manipulation",
          isDragging && "opacity-50 scale-105"
        )}
      >
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-muted mb-1 sm:mb-1.5 flex items-center justify-center">
          {imgError ? (
            <span className="text-lg sm:text-2xl">🍣</span>
          ) : (
            <img 
              src={dish.image} 
              alt={dish.name}
              className="w-full h-full object-cover"
              draggable={false}
              onError={handleImgError}
            />
          )}
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-foreground text-center leading-tight line-clamp-2">
          {dish.name}
        </span>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      className={cn(
        "flex-shrink-0 flex flex-col items-center justify-center mx-1 sm:mx-2 cursor-grab active:cursor-grabbing",
        "w-24 sm:w-36 h-full py-2 touch-manipulation",
        isDragging && "opacity-50 scale-105"
      )}
    >
      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-plate border-2 border-plate-border shadow-lg flex items-center justify-center mb-1 sm:mb-2">
        {imgError ? (
          <span className="text-2xl sm:text-4xl">🍣</span>
        ) : (
          <img 
            src={dish.image} 
            alt={dish.name}
            className="w-[85%] h-[85%] object-cover rounded-full"
            draggable={false}
            onError={handleImgError}
          />
        )}
      </div>
      <div className="bg-background border border-border rounded px-2 sm:px-3 py-0.5 sm:py-1 shadow-sm">
        <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
          {dish.name}
        </span>
      </div>
    </div>
  );
}
