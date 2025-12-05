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
  // Duplicate dishes for seamless loop
  const displayDishes = [...dishes, ...dishes];

  return (
    <div className="relative">
      {/* Top wood rail */}
      <div className="h-5 wood-rail" />
      
      {/* Belt */}
      <div 
        className="h-40 belt-pattern overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div 
          className={cn(
            "flex h-full",
            "animate-conveyor",
            isPaused && "paused"
          )}
          style={{ width: 'fit-content' }}
        >
          {displayDishes.map((dish, index) => (
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
