import { useState } from "react";
import { Dish } from "@/types/sushi";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

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
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('dishId', dish.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(e, dish);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
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
          "relative flex flex-col items-center px-0 py-1 sm:px-0.5 sm:py-1.5 landscape:px-0 landscape:py-0.5 landscape:sm:px-0 landscape:sm:py-1 bg-card border border-border rounded-lg cursor-pointer",
          "hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95",
          "w-[5.5rem] sm:w-[7rem] landscape:w-[4.5rem] landscape:sm:w-[5.5rem] animate-scale-in touch-manipulation",
          isDragging && "opacity-50 scale-105"
        )}
      >
        {/* 新品角标 */}
        {dish.newMonth && (
          <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-md z-10">
            {dish.newMonth}月新品
          </div>
        )}
        <div className="w-14 h-14 sm:w-20 sm:h-20 landscape:w-10 landscape:h-10 landscape:sm:w-12 landscape:sm:h-12 rounded-md overflow-hidden bg-muted mb-1.5 sm:mb-2 landscape:mb-0.5 landscape:sm:mb-1 flex items-center justify-center">
          {imgError ? (
            <span className="text-xl sm:text-3xl">🍣</span>
          ) : (
            <>
              {!imgLoaded && (
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground animate-spin absolute" />
              )}
              <img 
                src={dish.image} 
                alt={dish.name}
                className={cn("w-full h-full object-cover transition-opacity duration-200", imgLoaded ? "opacity-100" : "opacity-0")}
                draggable={false}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            </>
          )}
        </div>
        <div className="w-full h-[2rem] sm:h-[2.5rem] landscape:h-[1.6rem] landscape:sm:h-[2rem] flex items-center justify-center px-1">
          <span className={cn(
            "font-medium text-foreground text-center leading-tight block",
            dish.name.length > 12 
              ? "text-[9px] sm:text-[11px] landscape:text-[7px] landscape:sm:text-[9px]" 
              : "text-[11px] sm:text-sm landscape:text-[9px] landscape:sm:text-[11px]"
          )}>
            {dish.name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      className={cn(
        "relative flex-shrink-0 flex flex-col items-center mx-2 sm:mx-3 landscape:mx-1 landscape:sm:mx-2 cursor-grab active:cursor-grabbing",
        "w-28 sm:w-40 landscape:w-20 landscape:sm:w-24 touch-manipulation",
        isDragging && "opacity-50 scale-105"
      )}
    >
      {/* 寿司盘子 */}
      <div className="relative">
        {/* 新品角标 */}
        {dish.newMonth && (
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-md z-10">
            {dish.newMonth}月新品
          </div>
        )}
        <div className="w-20 h-20 sm:w-28 sm:h-28 landscape:w-14 landscape:h-14 landscape:sm:w-16 landscape:sm:h-16 rounded-full bg-plate border-2 border-plate-border shadow-lg flex items-center justify-center">
          {imgError ? (
            <span className="text-3xl sm:text-4xl">🍣</span>
          ) : (
            <>
              {!imgLoaded && (
                <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground animate-spin absolute" />
              )}
              <img 
                src={dish.image} 
                alt={dish.name}
                className={cn("w-[85%] h-[85%] object-cover rounded-full transition-opacity duration-200", imgLoaded ? "opacity-100" : "opacity-0")}
                draggable={false}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            </>
          )}
        </div>
      </div>
      {/* 名牌 */}
      <div className="mt-2 sm:mt-3 landscape:mt-1 landscape:sm:mt-2 bg-background border border-border rounded px-1.5 sm:px-2 landscape:px-1 landscape:sm:px-1.5 py-1.5 sm:py-2 landscape:py-1 landscape:sm:py-1.5 shadow-sm w-[6.5rem] sm:w-[8rem] landscape:w-[5rem] landscape:sm:w-[6rem] h-[2.5rem] sm:h-[3.2rem] landscape:h-[2rem] landscape:sm:h-[2.4rem] flex items-center justify-center">
        <span className={cn(
          "font-medium text-foreground text-center leading-tight block",
          dish.name.length > 12 
            ? "text-[10px] sm:text-xs landscape:text-[8px] landscape:sm:text-[10px]" 
            : "text-sm sm:text-base landscape:text-xs landscape:sm:text-sm"
        )}>
          {dish.name}
        </span>
      </div>
    </div>
  );
}
