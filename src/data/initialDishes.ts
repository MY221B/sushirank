import { Dish, TierData } from "@/types/sushi";

// 使用 Vite glob import 导入所有 src/assets/dishes 下的图片
const dishImages = import.meta.glob<{ default: string }>(
  '@/assets/dishes/*.{jpg,webp}',
  { eager: true }
);

// 从文件路径提取菜品名称
const getDishName = (path: string): string => {
  const filename = path.split('/').pop() || '';
  return filename
    .replace(/\.(jpg|webp)$/, '')
    .replace(/_\d+$/, ''); // 移除 _1 等后缀
};

// 处理所有图片
const allDishes = Object.entries(dishImages).map(([path, module]) => ({
  name: getDishName(path),
  image: module.default,
}));

// 去重同名菜品
const seenNames = new Set<string>();
const uniqueDishes: { name: string; image: string }[] = [];
for (const dish of allDishes) {
  if (!seenNames.has(dish.name)) {
    seenNames.add(dish.name);
    uniqueDishes.push(dish);
  }
}

// 按名称排序
uniqueDishes.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));

export const initialDishes: Dish[] = uniqueDishes.map((dish, index) => ({
  id: `dish-${index}`,
  name: dish.name,
  image: dish.image,
}));

export const tierData: TierData[] = [
  { id: 'S', name: '夯' },
  { id: 'A', name: '顶级' },
  { id: 'B', name: '人上人' },
  { id: 'C', name: 'NPC' },
  { id: 'D', name: '拉完了' },
];
