import { Dish, TierData } from "@/types/sushi";

// 使用 Vite glob import 导入所有 src/assets/dishes 下所有子文件夹的图片
const dishImages = import.meta.glob<{ default: string }>(
  '@/assets/dishes/**/*.{jpg,webp}',
  { eager: true }
);

// 从文件路径提取菜品名称
const getDishName = (path: string): string => {
  const filename = path.split('/').pop() || '';
  return filename
    .replace(/\.(jpg|webp)$/, '')
    .replace(/_\d+$/, ''); // 移除 _1 等后缀
};

// 从文件路径提取新品月份（如果是年月命名的文件夹，如 2512 表示25年12月）
const getNewMonth = (path: string): number | undefined => {
  // 路径格式: /src/assets/dishes/2512/xxx.webp
  const parts = path.split('/');
  const folderIndex = parts.findIndex(p => p === 'dishes');
  if (folderIndex >= 0 && folderIndex + 1 < parts.length) {
    const folder = parts[folderIndex + 1];
    // 检查是否是4位数字的年月格式（如 2512）
    if (/^\d{4}$/.test(folder)) {
      const month = parseInt(folder.slice(2), 10); // 取后两位作为月份
      if (month >= 1 && month <= 12) {
        return month;
      }
    }
  }
  return undefined;
};

// 处理所有图片
const allDishes = Object.entries(dishImages).map(([path, module]) => ({
  name: getDishName(path),
  image: module.default,
  newMonth: getNewMonth(path),
}));

// 去重同名菜品（优先保留新品）
const seenNames = new Set<string>();
const uniqueDishes: { name: string; image: string; newMonth?: number }[] = [];
// 先按新品优先排序，确保新品被保留
const sortedByNew = [...allDishes].sort((a, b) => {
  if (a.newMonth && !b.newMonth) return -1;
  if (!a.newMonth && b.newMonth) return 1;
  return 0;
});
for (const dish of sortedByNew) {
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
  newMonth: dish.newMonth,
}));

export const tierData: TierData[] = [
  { id: 'S', name: '夯' },
  { id: 'A', name: '顶级' },
  { id: 'B', name: '人上人' },
  { id: 'C', name: 'NPC' },
  { id: 'D', name: '拉完了' },
];
