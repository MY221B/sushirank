import { Dish, TierData } from "@/types/sushi";

import bainiaobei from "@/assets/dishes/白鸟贝.jpg";
import angusSteak from "@/assets/dishes/安格斯牛排配香鹅肝.jpg";
import bazhuayu from "@/assets/dishes/八爪鱼.jpg";
import xuexierou from "@/assets/dishes/爆盛雪蟹肉海苔包.jpg";
import beijibei from "@/assets/dishes/北极贝.jpg";
import xiaobeizhu from "@/assets/dishes/爆盛小贝柱海苔包.jpg";

export const initialDishes: Dish[] = [
  { id: 'dish-0', name: "白鸟贝", image: bainiaobei },
  { id: 'dish-1', name: "安格斯牛排配香鹅肝", image: angusSteak },
  { id: 'dish-2', name: "八爪鱼", image: bazhuayu },
  { id: 'dish-3', name: "爆盛雪蟹肉海苔包", image: xuexierou },
  { id: 'dish-4', name: "北极贝", image: beijibei },
  { id: 'dish-5', name: "爆盛小贝柱海苔包", image: xiaobeizhu },
];

export const tierData: TierData[] = [
  { id: 'S', name: '夯' },
  { id: 'A', name: '顶级' },
  { id: 'B', name: '人上人' },
  { id: 'C', name: 'NPC' },
  { id: 'D', name: '拉完了' },
];
