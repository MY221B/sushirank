import { Dish } from "@/types/sushi";
import { SushiItem } from "./SushiItem";

interface ListViewProps {
  dishes: Dish[];
  onDragStart: (e: React.DragEvent, dish: Dish) => void;
}

export function ListView({ dishes, onDragStart }: ListViewProps) {
  return (
    <div className="p-5 max-h-64 overflow-y-auto">
      <div className="flex flex-wrap justify-center gap-3">
        {dishes.map((dish) => (
          <SushiItem
            key={dish.id}
            dish={dish}
            variant="tier"
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
