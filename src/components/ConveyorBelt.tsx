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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchTargetRef = useRef<{ dish: Dish; element: HTMLElement } | null>(null);
  const animationRef = useRef<number | null>(null);

  // 使用 JavaScript 实现自动滚动动画
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const speed = 1.2; // 像素/帧
    
    const animate = () => {
      if (!isPaused && !isDragging && container && content) {
        container.scrollLeft += speed;
        
        // 当滚动到一半时（复制的内容），重置到开头实现无缝循环
        const halfWidth = content.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging]);

  // 鼠标拖动处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    
    const deltaX = e.pageX - startX;
    containerRef.current.scrollLeft = scrollLeft - deltaX;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeaveContainer = useCallback(() => {
    setIsDragging(false);
    onMouseLeave();
  }, [onMouseLeave]);

  // 触摸事件处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.pageX);
    setStartY(touch.pageY);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    setIsScrolling(false);
    setIsDragging(true);
    
    // 检查触摸的是否是寿司项
    const target = e.target as HTMLElement;
    const sushiElement = target.closest('[data-dish-id]') as HTMLElement;
    if (sushiElement) {
      const dishId = sushiElement.getAttribute('data-dish-id');
      const dish = dishes.find(d => d.id === dishId);
      if (dish) {
        touchTargetRef.current = { dish, element: sushiElement };
      }
    } else {
      touchTargetRef.current = null;
    }
  }, [dishes]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = touch.pageX - startX;
    const deltaY = touch.pageY - startY;
    
    // 如果水平移动大于垂直移动且超过阈值，则滚动传送带
    if (!isScrolling && Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setIsScrolling(true);
      touchTargetRef.current = null; // 取消寿司拖拽
    }
    
    if (isScrolling) {
      e.preventDefault();
      containerRef.current.scrollLeft = scrollLeft - deltaX;
    }
  }, [startX, startY, scrollLeft, isScrolling]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    // 如果没有滚动，且触摸的是寿司，则触发寿司拖拽
    if (!isScrolling && touchTargetRef.current && onTouchStart) {
      const { dish } = touchTargetRef.current;
      onTouchStart(dish, 'pool')(e);
    }
    
    setIsDragging(false);
    setIsScrolling(false);
    touchTargetRef.current = null;
  }, [isScrolling, onTouchStart]);

  // 复制菜品实现无缝滚动
  const duplicatedDishes = [...dishes, ...dishes];

  return (
    <div className="relative overflow-visible">
      {/* Top wood rail */}
      <div className="h-4 sm:h-6 landscape:h-2 landscape:sm:h-3 wood-rail" />

      {/* Track Background */}
      <div className="absolute left-0 right-0 z-0 belt-pattern h-32 sm:h-40 landscape:h-20 landscape:sm:h-24 top-4 sm:top-6 landscape:top-2 landscape:sm:top-3" />
      
      {/* Belt - Scrollable container */}
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={contentRef}
          className="flex h-full items-center px-2"
          style={{ width: 'fit-content' }}
        >
          {duplicatedDishes.map((dish, index) => (
            <SushiItem
              key={`${dish.id}-${index}`}
              dish={dish}
              variant="belt"
              onDragStart={onDragStart}
              data-dish-id={dish.id}
            />
          ))}
        </div>
      </div>
      
      {/* Front wood rail */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 landscape:h-12 landscape:sm:h-16 wood-rail-front z-10 pointer-events-none" />
    </div>
  );
}
