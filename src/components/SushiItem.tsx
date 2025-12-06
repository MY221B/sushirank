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
          "relative flex flex-col items-center p-1.5 sm:p-2.5 landscape:p-1 landscape:sm:p-1.5 bg-card border border-border rounded-lg cursor-pointer",
          "hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95",
          "w-[72px] sm:w-28 landscape:w-[52px] landscape:sm:w-20 animate-scale-in touch-manipulation",
          isDragging && "opacity-50 scale-105"
        )}
      >
        {/* 新品角标 */}
        {dish.newMonth && (
          <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-md z-10">
            {dish.newMonth}月新品
          </div>
        )}
        <div className="w-12 h-12 sm:w-16 sm:h-16 landscape:w-8 landscape:h-8 landscape:sm:w-10 landscape:sm:h-10 rounded-md overflow-hidden bg-muted mb-1.5 sm:mb-2 landscape:mb-0.5 landscape:sm:mb-1 flex items-center justify-center">
          {imgError ? (
            <span className="text-xl sm:text-3xl">🍣</span>
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
        <span className="text-[11px] sm:text-sm landscape:text-[9px] landscape:sm:text-[11px] font-medium text-foreground text-center leading-tight line-clamp-2">
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
        "relative flex-shrink-0 flex flex-col items-center justify-center mx-2 sm:mx-3 landscape:mx-1 landscape:sm:mx-2 cursor-grab active:cursor-grabbing",
        "w-28 sm:w-40 landscape:w-20 landscape:sm:w-24 h-full py-2 landscape:py-1 touch-manipulation",
        isDragging && "opacity-50 scale-105"
      )}
    >
      {/* 新品角标 */}
      {dish.newMonth && (
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-md z-10">
          {dish.newMonth}月新品
        </div>
      )}
      <div className="w-20 h-20 sm:w-28 sm:h-28 landscape:w-14 landscape:h-14 landscape:sm:w-16 landscape:sm:h-16 rounded-full bg-plate border-2 border-plate-border shadow-lg flex items-center justify-center mb-1.5 sm:mb-2 landscape:mb-0.5 landscape:sm:mb-1">
        {imgError ? (
          <span className="text-3xl sm:text-4xl">🍣</span>
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
      <div className="bg-background border border-border rounded px-2.5 sm:px-4 landscape:px-1.5 landscape:sm:px-2 py-1 sm:py-1.5 landscape:py-0.5 landscape:sm:py-1 shadow-sm max-w-[100px] sm:max-w-[140px] landscape:max-w-[72px] landscape:sm:max-w-[88px]">
        <span className="text-sm sm:text-base landscape:text-xs landscape:sm:text-sm font-medium text-foreground truncate block text-center">
          {dish.name}
        </span>
      </div>
    </div>
  );
}
