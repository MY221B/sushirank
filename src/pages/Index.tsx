import { useState, useCallback } from "react";
import { Dish, TierId } from "@/types/sushi";
import { initialDishes, tierData } from "@/data/initialDishes";
import { TierRow } from "@/components/TierRow";
import { ConveyorBelt } from "@/components/ConveyorBelt";
import { ListView } from "@/components/ListView";
import { AddDishModal } from "@/components/AddDishModal";
import { DragPreview } from "@/components/DragPreview";
import { useTouchDrag } from "@/hooks/useTouchDrag";
import { Plus, List, RotateCcw } from "lucide-react";

type TierItems = Record<TierId, Dish[]>;

const Index = () => {
  const [poolDishes, setPoolDishes] = useState<Dish[]>(initialDishes);
  const [tierItems, setTierItems] = useState<TierItems>({
    S: [], A: [], B: [], C: [], D: []
  });
  const [isListView, setIsListView] = useState(false);
  const [isConveyorPaused, setIsConveyorPaused] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [dragOverTier, setDragOverTier] = useState<TierId | null>(null);
  const [draggingFrom, setDraggingFrom] = useState<'pool' | TierId | null>(null);

  // 处理触摸拖拽放下
  const handleTouchDrop = useCallback((dish: Dish, source: 'pool' | string, targetTierId: string | null) => {
    if (!targetTierId) return;
    
    const tierId = targetTierId as TierId;
    
    if (source === 'pool') {
      setPoolDishes(prev => prev.filter(d => d.id !== dish.id));
    } else {
      setTierItems(prev => ({
        ...prev,
        [source]: prev[source as TierId].filter(d => d.id !== dish.id)
      }));
    }
    
    setTierItems(prev => ({
      ...prev,
      [tierId]: [...prev[tierId], dish]
    }));
  }, []);

  const { state: touchState, handleTouchStart, handleTouchMove, handleTouchEnd, dragPreviewRef } = useTouchDrag(handleTouchDrop);

  const handleDragStart = useCallback((e: React.DragEvent, dish: Dish, source: 'pool' | TierId) => {
    e.dataTransfer.setData('dishId', dish.id);
    e.dataTransfer.setData('source', source);
    setDraggingFrom(source);
    setIsConveyorPaused(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingFrom(null);
    setDragOverTier(null);
    setIsConveyorPaused(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDropOnTier = useCallback((e: React.DragEvent, tierId: TierId) => {
    e.preventDefault();
    const dishId = e.dataTransfer.getData('dishId');
    const source = e.dataTransfer.getData('source') as 'pool' | TierId;
    
    let dish: Dish | undefined;
    
    if (source === 'pool') {
      dish = poolDishes.find(d => d.id === dishId);
      if (dish) {
        setPoolDishes(prev => prev.filter(d => d.id !== dishId));
      }
    } else {
      dish = tierItems[source].find(d => d.id === dishId);
      if (dish) {
        setTierItems(prev => ({
          ...prev,
          [source]: prev[source].filter(d => d.id !== dishId)
        }));
      }
    }
    
    if (dish) {
      setTierItems(prev => ({
        ...prev,
        [tierId]: [...prev[tierId], dish!]
      }));
    }
    
    setDragOverTier(null);
    setDraggingFrom(null);
    setIsConveyorPaused(false);
  }, [poolDishes, tierItems]);

  const handleTierItemClick = useCallback((dish: Dish, tierId: TierId) => {
    setTierItems(prev => ({
      ...prev,
      [tierId]: prev[tierId].filter(d => d.id !== dish.id)
    }));
    setPoolDishes(prev => [...prev, dish]);
  }, []);

  const handleAddDish = useCallback((name: string, image: string) => {
    const newDish: Dish = {
      id: `dish-${Date.now()}`,
      name,
      image
    };
    setPoolDishes(prev => [...prev, newDish]);
  }, []);

  const handleReset = useCallback(() => {
    const allDishes = [
      ...poolDishes,
      ...Object.values(tierItems).flat()
    ];
    setPoolDishes(allDishes);
    setTierItems({ S: [], A: [], B: [], C: [], D: [] });
  }, [poolDishes, tierItems]);

  return (
    <div 
      className="min-h-screen bg-background pb-6"
      onDragEnd={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="py-8 text-center px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
          🍣 回转寿司美食排行榜
        </h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          拖拽寿司到对应等级，点击已排名的寿司可将其移回传送带
        </p>
      </header>

      {/* Tier Grid */}
      <main className="px-3 sm:px-6 max-w-6xl mx-auto">
        <div className="border-2 border-foreground/90 rounded-t-lg overflow-hidden mb-6 sm:mb-10 animate-fade-in">
          {tierData.map((tier) => (
            <TierRow
              key={tier.id}
              tierId={tier.id}
              tierName={tier.name}
              items={tierItems[tier.id]}
              onDrop={handleDropOnTier}
              onDragOver={(e) => {
                handleDragOver(e);
                setDragOverTier(tier.id);
              }}
              onItemClick={(dish) => handleTierItemClick(dish, tier.id)}
              onItemDragStart={(e, dish) => handleDragStart(e, dish, tier.id)}
              onTouchStart={handleTouchStart}
              isDragOver={dragOverTier === tier.id || touchState.isDragging}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-end gap-2 sm:gap-3 mb-4 flex-wrap">
          <button 
            onClick={handleReset}
            className="wood-btn flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            重置
          </button>
          <button 
            onClick={() => setAddModalOpen(true)}
            className="wood-btn flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            新增
          </button>
          <button 
            onClick={() => setIsListView(!isListView)}
            className="wood-btn flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <List className="w-3 h-3 sm:w-4 sm:h-4" />
            {isListView ? '传送带' : '列表'}
          </button>
        </div>

        {/* Dish Pool */}
        <section className="bg-secondary/50 border-t border-border rounded-lg overflow-hidden animate-fade-in">
          <div>
            {isListView ? (
              <ListView 
                dishes={poolDishes}
                onDragStart={(e, dish) => handleDragStart(e, dish, 'pool')}
                onTouchStart={handleTouchStart}
              />
            ) : (
              <ConveyorBelt
                dishes={poolDishes}
                onDragStart={(e, dish) => handleDragStart(e, dish, 'pool')}
                onTouchStart={handleTouchStart}
                isPaused={isConveyorPaused || touchState.isDragging}
                onMouseEnter={() => setIsConveyorPaused(true)}
                onMouseLeave={() => !draggingFrom && setIsConveyorPaused(false)}
              />
            )}
          </div>
        </section>
      </main>

      {/* Touch Drag Preview */}
      <DragPreview
        ref={dragPreviewRef}
        dish={touchState.draggedDish}
        isVisible={touchState.isDragging}
      />

      {/* Add Dish Modal */}
      <AddDishModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAddDish={handleAddDish}
      />
    </div>
  );
};

export default Index;
