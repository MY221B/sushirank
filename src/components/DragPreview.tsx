import { forwardRef } from 'react';
import { Dish } from '@/types/sushi';

interface DragPreviewProps {
  dish: Dish | null;
  isVisible: boolean;
}

export const DragPreview = forwardRef<HTMLDivElement, DragPreviewProps>(
  ({ dish, isVisible }, ref) => {
    if (!isVisible || !dish) return null;

    return (
      <div
        ref={ref}
        className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ touchAction: 'none' }}
      >
        <div className="w-24 h-24 rounded-full bg-white border-4 border-primary shadow-2xl flex items-center justify-center opacity-90">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-20 h-20 object-cover rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-4xl">🍣</span>';
            }}
          />
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-0.5 rounded text-xs whitespace-nowrap">
          {dish.name}
        </div>
      </div>
    );
  }
);

DragPreview.displayName = 'DragPreview';
