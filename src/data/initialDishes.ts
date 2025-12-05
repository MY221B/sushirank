import { Dish, TierData } from "@/types/sushi";

// src/assets/dishes 目录下的图片 - 使用 glob import
const assetImages = import.meta.glob<{ default: string }>(
  '@/assets/dishes/*.{jpg,webp}',
  { eager: true }
);

// 从文件路径提取菜品名称
const getDishName = (filename: string): string => {
  return filename
    .replace(/\.(jpg|webp)$/, '')
    .replace(/_\d+$/, '');
};

// 处理 src/assets 图片
const assetDishes = Object.entries(assetImages).map(([path, module]) => {
  const filename = path.split('/').pop() || '';
  return {
    name: getDishName(filename),
    image: module.default,
  };
});

// public 目录下的图片文件名
const publicImages = [
  "三文鱼子军舰.jpg",
  "三文鱼子特盛军舰.jpg",
  "三文鱼腩.jpg",
  "严选慢烤牛肉寿司.jpg",
  "原条海鳗.jpg",
  "小肌鱼.jpg",
  "星鳗.webp",
  "柚子风味炙烧长鳍金枪鱼.jpg",
  "柚子香鲽鱼鳍边.jpg",
  "柠檬金枪鱼腩.jpg",
  "梅子紫苏青瓜卷.jpg",
  "江瑶贝双味.jpg",
  "沙律军舰.jpg",
  "沙律甜酱蟹柳.jpg",
  "沙律酱蟹柳.jpg",
  "溏心蛋军舰.jpg",
  "炙烧三文鱼.jpg",
  "炙烧三文鱼腩.jpg",
  "炙烧叉烧.jpg",
  "炙烧嫩鸡排.jpg",
  "炙烧松笠鱿鱼.webp",
  "炙烧盐味柠檬真鲷.jpg",
  "炙烧盐醋渍鲭鱼.jpg",
  "炙烧红鱼配柚子胡椒.webp",
  "炙烧罗勒三文鱼腩.jpg",
  "炙烧罗勒芝士八爪鱼.jpg",
  "炙烧罗勒鲜虾.jpg",
  "炙烧芝士三文鱼腩.jpg",
  "炙烧芝士嫩鸡排.jpg",
  "炙烧芝士明太子三文鱼腩.jpg",
  "炙烧芝士明太子鲜虾.jpg",
  "炙烧芝士鲜虾.jpg",
  "炙烧赤虾.jpg",
  "炙烧金枪鱼.jpg",
  "炙烧香鹅肝.jpg",
  "炙烧香鹅肝配海胆.jpg",
  "炸虾牛油果玉子卷.jpg",
  "炸软壳蟹.jpg",
  "熟虾.jpg",
  "牛油果熟虾.jpg",
  "牛肉堡寿司.jpg",
  "特大清蒸雪蟹腿.jpg",
  "玉子卷配飞鱼子.jpg",
  "玉子烧.jpg",
  "玉米沙律军舰.jpg",
  "玛格丽特风味三文鱼.jpg",
  "玛格丽特风味炙烧鲜虾.jpg",
  "珍宝炙烧三文鱼腩.webp",
  "甜虾.jpg",
  "甜虾军舰.jpg",
  "生三文鱼.jpg",
  "生三文鱼亲子.jpg",
  "生三文鱼腩.jpg",
  "生八爪鱼.jpg",
  "生拌三文鱼军舰.jpg",
  "生拌海鲜军舰.jpg",
  "生虾.jpg",
  "盐味柠檬鱿鱼.jpg",
  "盐味肥牛.jpg",
  "盐醋渍鲭鱼.jpg",
  "盐麴肥嫩长鳍金枪鱼.webp",
  "真鲷.jpg",
  "秘制豚五花角煮寿司.jpg",
  "纳豆军舰.jpg",
  "纹甲墨鱼.jpg",
  "芝士玉子烧.jpg",
  "芝心鸡排.jpg",
  "芝麻香黑象拔蚌.jpg",
  "葱花金枪鱼卷.jpg",
  "蒜香鱿鱼.jpg",
  "蒲烧鳗鱼.jpg",
  "蓝鳍金枪鱼中腩.jpg",
  "蓝鳍金枪鱼中腩_1.jpg",
  "蓝鳍金枪鱼大腩.jpg",
  "蓝鳍金枪鱼大腩_1.jpg",
  "虾三味.jpg",
  "蚬肉军舰.jpg",
  "蟹柳天妇罗.jpg",
  "蟹风味沙律军舰.jpg",
  "酱烤 鲽鱼鳍边.jpg",
  "金枪鱼.jpg",
  "金枪鱼军舰.jpg",
  "金枪鱼卷.jpg",
  "金枪鱼排.jpg",
  "金枪鱼新香卷.jpg",
  "金枪鱼腩.jpg",
  "长鳍金枪鱼.jpg",
  "长鳍金枪鱼_1.jpg",
  "雪蟹肉.jpg",
  "青瓜卷.jpg",
  "香葱赤虾.jpg",
  "鱿鱼.jpg",
  "鱿鱼天妇罗.jpg",
  "鱿鱼耳.jpg",
  "鲜虾天妇罗.jpg",
  "鲭鱼押寿司.jpg",
  "鳗鱼海苔包.jpg",
  "鳗鱼肥牛.jpg",
  "鳗鱼青瓜卷.jpg",
];

// 处理 public 图片
const publicDishes = publicImages.map(filename => ({
  name: getDishName(filename),
  image: "/" + filename,
}));

// 合并并去重
const assetNames = new Set(assetDishes.map(d => d.name));
const uniquePublicDishes = publicDishes.filter(d => !assetNames.has(d.name));

// 去重同名菜品（处理 _1 后缀的重复）
const seenNames = new Set<string>();
const deduped: { name: string; image: string }[] = [];
for (const dish of [...assetDishes, ...uniquePublicDishes]) {
  if (!seenNames.has(dish.name)) {
    seenNames.add(dish.name);
    deduped.push(dish);
  }
}

export const initialDishes: Dish[] = deduped.map((dish, index) => ({
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
