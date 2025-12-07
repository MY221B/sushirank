import { useRef, useState, useCallback } from "react";
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

  // 处理传送带拖拽滚动（鼠标）
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[draggable="true"]')) {
      return;
    }
    
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeaveContainer = useCallback(() => {
    setIsDragging(false);
    onMouseLeave();
  }, [onMouseLeave]);

  // 处理触摸滚动
  const handleTouchStartScroll = useCallback((e: React.TouchEvent) => {
    // 如果触摸的是菜品，让菜品的 touch handler 处理
    if ((e.target as HTMLElement).closest('[draggable="true"]')) {
      return;
    }
    
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleTouchMoveScroll = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const touch = e.touches[0];
    const x = touch.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEndScroll = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="relative">
      {/* Top wood rail */}
      <div className="h-6 sm:h-8 landscape:h-3 landscape:sm:h-4 wood-rail" />
      
      {/* Belt */}
      <div 
        ref={containerRef}
        className={cn(
          "h-48 sm:h-60 landscape:h-28 landscape:sm:h-32 belt-pattern overflow-x-auto cursor-grab scrollbar-hide",
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
            "flex h-full items-center",
            !isDragging && "animate-conveyor",
            (isPaused || isDragging) && "paused"
          )}
          style={{ width: 'fit-content' }}
        >
          {dishes.map((dish, index) => (
            <SushiItem
              key={`${dish.id}-${index}`}
              dish={dish}
              variant="belt"
              onDragStart={onDragStart}
              onTouchStart={onTouchStart ? onTouchStart(dish, 'pool') : undefined}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom wood rail */}
      <div className="h-16 sm:h-24 landscape:h-10 landscape:sm:h-12 wood-rail" />
    </div>
  );
}
