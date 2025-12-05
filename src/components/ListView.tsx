import { Dish } from "@/types/sushi";
import { SushiItem } from "./SushiItem";

interface ListViewProps {
  dishes: Dish[];
  onDragStart: (e: React.DragEvent, dish: Dish) => void;
  onTouchStart?: (dish: Dish, source: string) => (e: React.TouchEvent) => void;
}

export function ListView({ dishes, onDragStart, onTouchStart }: ListViewProps) {
  return (
    <div className="p-3 sm:p-5 max-h-64 overflow-y-auto">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {dishes.map((dish) => (
          <SushiItem
            key={dish.id}
            dish={dish}
            variant="tier"
            onDragStart={onDragStart}
            onTouchStart={onTouchStart ? onTouchStart(dish, 'pool') : undefined}
          />
        ))}
      </div>
    </div>
  );
}
