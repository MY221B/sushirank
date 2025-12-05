import { useRef, useState, useCallback } from "react";
import { Dish } from "@/types/sushi";
import { SushiItem } from "./SushiItem";
import { cn } from "@/lib/utils";

interface ConveyorBeltProps {
  dishes: Dish[];
  onDragStart: (e: React.DragEvent, dish: Dish) => void;
  isPaused: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ConveyorBelt({ 
  dishes, 
  onDragStart, 
  isPaused,
  onMouseEnter,
  onMouseLeave
}: ConveyorBeltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 处理传送带拖拽滚动
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 如果点击的是寿司项，不触发拖拽滚动
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
    const walk = (x - startX) * 2; // 滚动速度倍数
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeaveContainer = useCallback(() => {
    setIsDragging(false);
    onMouseLeave();
  }, [onMouseLeave]);

  return (
    <div className="relative">
      {/* Top wood rail */}
      <div className="h-5 wood-rail" />
      
      {/* Belt - 使用 overflow-x-auto 支持手动滚动 */}
      <div 
        ref={containerRef}
        className={cn(
          "h-40 belt-pattern overflow-x-auto cursor-grab scrollbar-hide",
          isDragging && "cursor-grabbing"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={handleMouseLeaveContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div 
          className={cn(
            "flex h-full",
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
            />
          ))}
        </div>
      </div>
      
      {/* Bottom wood rail */}
      <div className="h-5 wood-rail" />
    </div>
  );
}
