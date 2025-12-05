import { useState, useCallback, useRef, useEffect } from 'react';
import { Dish } from '@/types/sushi';

interface TouchDragState {
  isDragging: boolean;
  draggedDish: Dish | null;
  dragPosition: { x: number; y: number } | null;
  source: 'pool' | string | null;
}

interface UseTouchDragReturn {
  state: TouchDragState;
  handleTouchStart: (dish: Dish, source: 'pool' | string) => (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  dragPreviewRef: React.RefObject<HTMLDivElement>;
}

export function useTouchDrag(
  onDrop: (dish: Dish, source: 'pool' | string, targetTierId: string | null) => void
): UseTouchDragReturn {
  const [state, setState] = useState<TouchDragState>({
    isDragging: false,
    draggedDish: null,
    dragPosition: null,
    source: null,
  });
  
  const dragPreviewRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<{ x: number; y: number } | null>(null);

  // 在拖拽时禁止页面滚动
  useEffect(() => {
    if (!state.isDragging) return;

    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    // 使用 passive: false 让 preventDefault 生效
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [state.isDragging]);

  const handleTouchStart = useCallback((dish: Dish, source: 'pool' | string) => (e: React.TouchEvent) => {
    const touch = e.touches[0];
    positionRef.current = { x: touch.clientX, y: touch.clientY };
    setState({
      isDragging: true,
      draggedDish: dish,
      dragPosition: { x: touch.clientX, y: touch.clientY },
      source,
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!state.isDragging) return;
    
    const touch = e.touches[0];
    positionRef.current = { x: touch.clientX, y: touch.clientY };
    setState(prev => ({
      ...prev,
      dragPosition: { x: touch.clientX, y: touch.clientY },
    }));
  }, [state.isDragging]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!state.isDragging || !state.draggedDish || !state.dragPosition) {
      setState({
        isDragging: false,
        draggedDish: null,
        dragPosition: null,
        source: null,
      });
      return;
    }

    // 查找触摸结束位置下的 tier 元素
    const touch = e.changedTouches[0];
    const elementsAtPoint = document.elementsFromPoint(touch.clientX, touch.clientY);
    
    let targetTierId: string | null = null;
    for (const el of elementsAtPoint) {
      const tierEl = el.closest('[data-tier-id]');
      if (tierEl) {
        targetTierId = tierEl.getAttribute('data-tier-id');
        break;
      }
    }

    onDrop(state.draggedDish, state.source!, targetTierId);

    setState({
      isDragging: false,
      draggedDish: null,
      dragPosition: null,
      source: null,
    });
  }, [state, onDrop]);

  // 更新拖拽预览位置
  useEffect(() => {
    if (dragPreviewRef.current && state.dragPosition) {
      dragPreviewRef.current.style.left = `${state.dragPosition.x - 50}px`;
      dragPreviewRef.current.style.top = `${state.dragPosition.y - 50}px`;
    }
  }, [state.dragPosition]);

  return {
    state,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    dragPreviewRef,
  };
}
