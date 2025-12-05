import { useState } from "react";
import { Dish } from "@/types/sushi";
import { cn } from "@/lib/utils";

interface SushiItemProps {
  dish: Dish;
  variant?: 'belt' | 'tier';
  onDragStart?: (e: React.DragEvent, dish: Dish) => void;
  onClick?: () => void;
  isDragging?: boolean;
}

export function SushiItem({ 
  dish, 
  variant = 'belt', 
  onDragStart, 
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

  if (variant === 'tier') {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onClick={onClick}
        className={cn(
          "flex flex-col items-center p-2 bg-card border border-border rounded-lg cursor-pointer",
          "hover:shadow-md transition-all duration-200 hover:scale-105",
          "w-24 animate-scale-in",
          isDragging && "opacity-50 scale-105"
        )}
      >
        <div className="w-14 h-14 rounded-md overflow-hidden bg-muted mb-1.5 flex items-center justify-center">
          {imgError ? (
            <span className="text-2xl">🍣</span>
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
        <span className="text-xs font-medium text-foreground text-center leading-tight line-clamp-2">
          {dish.name}
        </span>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={cn(
        "flex-shrink-0 flex flex-col items-center justify-center mx-2 cursor-grab active:cursor-grabbing",
        "w-36 h-full py-2",
        isDragging && "opacity-50 scale-105"
      )}
    >
      <div className="w-24 h-24 rounded-full bg-plate border-2 border-plate-border shadow-lg flex items-center justify-center mb-2">
        {imgError ? (
          <span className="text-4xl">🍣</span>
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
      <div className="bg-background border border-border rounded px-3 py-1 shadow-sm">
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          {dish.name}
        </span>
      </div>
    </div>
  );
}
