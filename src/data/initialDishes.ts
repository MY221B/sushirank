import { Dish, TierData } from "@/types/sushi";

// src/assets/dishes 目录下的图片
import bazhuayu from "@/assets/dishes/八爪鱼.jpg";
import beijibei from "@/assets/dishes/北极贝.jpg";
import houqieshaoquyu from "@/assets/dishes/厚切烧鲭鱼.jpg";
import hebuwuyouyu from "@/assets/dishes/和布芜拌鱿鱼.jpg";
import daqiechangqijinqiangyunan from "@/assets/dishes/大切长鳍金枪鱼腩芝麻酱油.webp";
import dahailuo from "@/assets/dishes/大海螺.jpg";
import angusSteak from "@/assets/dishes/安格斯牛排配香鹅肝.jpg";
import bimuyu from "@/assets/dishes/比目鱼.jpg";
import haidanhaitaibao from "@/assets/dishes/海胆海苔包.jpg";
import haixianzicaijuan from "@/assets/dishes/海鲜紫菜卷.jpg";
import haiman from "@/assets/dishes/海鳗.jpg";
import xiaobeizhu from "@/assets/dishes/爆盛小贝柱海苔包.jpg";
import xuexierou from "@/assets/dishes/爆盛雪蟹肉海苔包.jpg";
import bainiaobei from "@/assets/dishes/白鸟贝.jpg";
import hongganyu from "@/assets/dishes/红甘鱼.jpg";
import fupishousi from "@/assets/dishes/腐皮寿司.jpg";
import huazhilian from "@/assets/dishes/花之恋.jpg";
import conghuajinqiangyujunjian from "@/assets/dishes/葱花金枪鱼军舰.jpg";
import conghuajinqiangyujuan from "@/assets/dishes/葱花金枪鱼卷.jpg";
import chixia from "@/assets/dishes/赤虾.jpg";
import chixiafeiyuzi from "@/assets/dishes/赤虾飞鱼子.jpg";
import chibei from "@/assets/dishes/赤贝.jpg";
import feiyuzijunjian from "@/assets/dishes/飞鱼子军舰.jpg";
import feiyuzidoufupi from "@/assets/dishes/飞鱼子豆腐皮寿司.jpg";
import dieyuqunbian from "@/assets/dishes/鲽鱼裙边.jpg";
import heixiangbabang from "@/assets/dishes/黑象拔蚌.jpg";

// src/assets 导入的菜品
const assetDishes: { name: string; image: string }[] = [
  { name: "八爪鱼", image: bazhuayu },
  { name: "北极贝", image: beijibei },
  { name: "厚切烧鲭鱼", image: houqieshaoquyu },
  { name: "和布芜拌鱿鱼秋葵军舰", image: hebuwuyouyu },
  { name: "大切长鳍金枪鱼腩芝麻酱油", image: daqiechangqijinqiangyunan },
  { name: "大海螺", image: dahailuo },
  { name: "安格斯牛排配香鹅肝", image: angusSteak },
  { name: "比目鱼", image: bimuyu },
  { name: "海胆海苔包", image: haidanhaitaibao },
  { name: "海鲜紫菜卷", image: haixianzicaijuan },
  { name: "海鳗", image: haiman },
  { name: "爆盛小贝柱海苔包", image: xiaobeizhu },
  { name: "爆盛雪蟹肉海苔包", image: xuexierou },
  { name: "白鸟贝", image: bainiaobei },
  { name: "红甘鱼", image: hongganyu },
  { name: "腐皮寿司", image: fupishousi },
  { name: "花之恋", image: huazhilian },
  { name: "葱花金枪鱼军舰", image: conghuajinqiangyujunjian },
  { name: "葱花金枪鱼卷", image: conghuajinqiangyujuan },
  { name: "赤虾", image: chixia },
  { name: "赤虾飞鱼子", image: chixiafeiyuzi },
  { name: "赤贝", image: chibei },
  { name: "飞鱼子军舰", image: feiyuzijunjian },
  { name: "飞鱼子豆腐皮寿司", image: feiyuzidoufupi },
  { name: "鲽鱼裙边", image: dieyuqunbian },
  { name: "黑象拔蚌", image: heixiangbabang },
];

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

// 从文件名提取菜品名称
const getDishName = (filename: string): string => {
  return filename.replace(/\.(jpg|webp)$/, '').replace(/_\d+$/, '');
};

// 合并菜品，去重
const assetNames = new Set(assetDishes.map(d => d.name));
const publicDishes = publicImages
  .map(filename => ({
    name: getDishName(filename),
    image: `/${encodeURIComponent(filename)}`,
  }))
  .filter(dish => !assetNames.has(dish.name));

// 去重同名菜品
const uniquePublicDishes: { name: string; image: string }[] = [];
const seenNames = new Set<string>();
for (const dish of publicDishes) {
  if (!seenNames.has(dish.name)) {
    seenNames.add(dish.name);
    uniquePublicDishes.push(dish);
  }
}

export const initialDishes: Dish[] = [
  ...assetDishes,
  ...uniquePublicDishes,
].map((dish, index) => ({
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
