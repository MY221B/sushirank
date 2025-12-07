import { useRef, useState, useCallback, useEffect } from "react";
import { Dish } from "@/types/sushi";
import { SushiItem } from "./SushiItem";
import { cn } from "@/lib/utils";

interface ConveyorBeltProps {
  dishes: Dish[];
  onDragStart: (e: React.DragEvent, dish: Dish) => void;
  onTouchStart?: (dish: Dish, source: string) => (e: React.TouchEvent) => void;
  isPaused: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ConveyorBelt({ 
  dishes, 
  onDragStart, 
  onTouchStart,
  isPaused,
  onMouseEnter,
  onMouseLeave
}: ConveyorBeltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // 处理传送带拖拽滚动（鼠标）- 现在允许从任意位置开始拖动
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 只有左键才启动拖动
    if (e.button !== 0) return;
    
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    
    // 检测是否有明显移动
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
      e.preventDefault();
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeaveContainer = useCallback(() => {
    setIsDragging(false);
    onMouseLeave();
  }, [onMouseLeave]);

  // 处理触摸滚动 - 检测水平滑动
  const handleTouchStartScroll = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setHasMoved(false);
    setStartX(touch.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleTouchMoveScroll = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const touch = e.touches[0];
    const x = touch.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    
    // 如果水平移动明显，滚动传送带
    if (Math.abs(walk) > 10) {
      setHasMoved(true);
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEndScroll = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="relative overflow-visible">
      {/* Top wood rail */}
      <div className="h-4 sm:h-6 landscape:h-2 landscape:sm:h-3 wood-rail" />

      {/* Track Background - Absolute positioned behind the scroll container */}
      <div className="absolute left-0 right-0 z-0 belt-pattern h-32 sm:h-40 landscape:h-20 landscape:sm:h-24 top-4 sm:top-6 landscape:top-2 landscape:sm:top-3" />
      
      {/* Belt - Scrollable container, taller to fit cards, transparent, high z-index */}
      <div 
        ref={containerRef}
        className={cn(
          "relative z-20 h-48 sm:h-60 landscape:h-32 landscape:sm:h-36 overflow-x-auto cursor-grab scrollbar-hide",
          isDragging && "cursor-grabbing"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={handleMouseLeaveContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStartScroll}
        onTouchMove={handleTouchMoveScroll}
        onTouchEnd={handleTouchEndScroll}
      >
        <div 
          className={cn(
            "flex h-full items-center px-2",
            !isDragging && !isPaused && "animate-conveyor"
          )}
          style={{ 
            width: 'fit-content',
            transform: isDragging ? 'none' : undefined
          }}
        >
          {dishes.map((dish, index) => (
            <SushiItem
              key={`${dish.id}-${index}`}
              dish={dish}
              variant="belt"
              onDragStart={(e) => {
                // 如果正在拖动传送带，阻止寿司拖拽
                if (hasMoved) {
                  e.preventDefault();
                  return;
                }
                onDragStart(e, dish);
              }}
              onTouchStart={onTouchStart ? onTouchStart(dish, 'pool') : undefined}
            />
          ))}
        </div>
      </div>
      
      {/* Front wood rail - high z-index, cards float above this */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 landscape:h-12 landscape:sm:h-16 wood-rail-front z-10 pointer-events-none" />
    </div>
  );
}
