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
  'data-dish-id'?: string;
}

export function SushiItem({ 
  dish, 
  variant = 'belt', 
  onDragStart, 
  onTouchStart,
  onClick,
  isDragging,
  'data-dish-id': dataDishId
}: SushiItemProps) {
  const [imgError, setImgError] = useState(false);
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('dishId', dish.id);
    e.dataTransfer.effectAllowed = 'move';
    
    // 设置整个卡片作为拖拽预览
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    e.dataTransfer.setDragImage(target, e.clientX - rect.left, e.clientY - rect.top);
    
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
      data-dish-id={dataDishId || dish.id}
      className={cn(
        "relative flex-shrink-0 flex flex-col items-center cursor-grab active:cursor-grabbing",
        "w-28 sm:w-36 landscape:w-24 landscape:sm:w-28 h-full touch-none",
        isDragging && "opacity-50 scale-105"
      )}
    >
      {/* 寿司盘子 - 固定高度匹配背景轨道 */}
      <div className="flex-none flex items-center justify-center w-full h-32 sm:h-40 landscape:h-20 landscape:sm:h-24 pt-1">
        {/* 新品角标 */}
        {dish.newMonth && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-md z-10">
            {dish.newMonth}月新品
          </div>
        )}
        <div className="w-[90%] aspect-square max-w-[100px] sm:max-w-[120px] landscape:max-w-[70px] landscape:sm:max-w-[80px] rounded-full bg-plate border-2 border-plate-border shadow-lg flex items-center justify-center">
          {imgError ? (
            <span className="text-3xl sm:text-4xl landscape:text-2xl">🍣</span>
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
      </div>
      {/* 名牌卡片 - 位于盘子下方，利用容器的额外高度 */}
      <div className="absolute bottom-5 sm:bottom-10 landscape:bottom-3 left-1/2 -translate-x-1/2 bg-[#fcfcfc] rounded-xl shadow-md z-30 w-[100px] h-[42px] sm:w-[130px] sm:h-[54px] landscape:w-[90px] landscape:h-[40px] flex items-center justify-center px-2 border-b-4 border-gray-200">
        <span className={cn(
          "font-medium text-gray-800 text-center leading-tight",
          dish.name.length <= 12 && "text-sm sm:text-base landscape:text-xs",
          dish.name.length > 12 && "text-xs sm:text-sm landscape:text-[10px]"
        )}>
          {dish.name}
        </span>
      </div>
    </div>
  );
}
