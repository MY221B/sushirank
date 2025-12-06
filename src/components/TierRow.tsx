import { TierId, Dish } from "@/types/sushi";
import { SushiItem } from "./SushiItem";
import { cn } from "@/lib/utils";

interface TierRowProps {
  tierId: TierId;
  tierName: string;
  items: Dish[];
  onDrop: (e: React.DragEvent, tierId: TierId) => void;
  onDragOver: (e: React.DragEvent) => void;
  onItemClick: (dish: Dish) => void;
  onItemDragStart: (e: React.DragEvent, dish: Dish) => void;
  onTouchStart?: (dish: Dish, source: string) => (e: React.TouchEvent) => void;
  isDragOver?: boolean;
}

const tierColors: Record<TierId, string> = {
  S: 'bg-tier-s text-primary-foreground',
  A: 'bg-tier-a text-foreground',
  B: 'bg-tier-b text-foreground',
  C: 'bg-tier-c text-foreground',
  D: 'bg-tier-d text-foreground',
};

export function TierRow({ 
  tierId, 
  tierName, 
  items, 
  onDrop, 
  onDragOver, 
  onItemClick,
  onItemDragStart,
  onTouchStart,
  isDragOver 
}: TierRowProps) {
  return (
    <div 
      className="flex border-b-2 border-foreground/90 min-h-[90px] sm:min-h-[110px]"
      data-tier-id={tierId}
    >
      <div 
        className={cn(
          "w-20 sm:w-32 flex-shrink-0 flex items-center justify-center border-r-2 border-foreground/90",
          tierColors[tierId]
        )}
      >
        <h2 className="text-xl sm:text-3xl font-bold">{tierName}</h2>
      </div>
      <div 
        className={cn(
          "flex-grow p-2 sm:p-3 flex flex-wrap gap-2 sm:gap-3 content-start transition-colors duration-200",
          isDragOver && "bg-primary/10"
        )}
        data-tier-id={tierId}
        onDrop={(e) => onDrop(e, tierId)}
        onDragOver={onDragOver}
      >
        {items.map((dish) => (
          <SushiItem
            key={dish.id}
            dish={dish}
            variant="tier"
            onClick={() => onItemClick(dish)}
            onDragStart={onItemDragStart}
            onTouchStart={onTouchStart ? onTouchStart(dish, tierId) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
