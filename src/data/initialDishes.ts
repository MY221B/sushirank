import { Dish, TierData } from "@/types/sushi";

// 原有图片
import bainiaobei from "@/assets/dishes/白鸟贝.jpg";
import angusSteak from "@/assets/dishes/安格斯牛排配香鹅肝.jpg";
import bazhuayu from "@/assets/dishes/八爪鱼.jpg";
import xuexierou from "@/assets/dishes/爆盛雪蟹肉海苔包.jpg";
import beijibei from "@/assets/dishes/北极贝.jpg";
import xiaobeizhu from "@/assets/dishes/爆盛小贝柱海苔包.jpg";

// 新增图片
import dahailuo from "@/assets/dishes/大海螺.jpg";
import bimuyu from "@/assets/dishes/比目鱼.jpg";
import dieyuqunbian from "@/assets/dishes/鲽鱼裙边.jpg";
import chixiafeiyuzi from "@/assets/dishes/赤虾飞鱼子.jpg";
import conghuajinqiangyujuan from "@/assets/dishes/葱花金枪鱼卷.jpg";
import chibei from "@/assets/dishes/赤贝.jpg";
import feiyuzidoufupi from "@/assets/dishes/飞鱼子豆腐皮寿司.jpg";
import chixia from "@/assets/dishes/赤虾.jpg";
import conghuajinqiangyujunjian from "@/assets/dishes/葱花金枪鱼军舰.jpg";
import daqiechangqijinqiangyunan from "@/assets/dishes/大切长鳍金枪鱼腩芝麻酱油.webp";

export const initialDishes: Dish[] = [
  { id: 'dish-0', name: "白鸟贝", image: bainiaobei },
  { id: 'dish-1', name: "安格斯牛排配香鹅肝", image: angusSteak },
  { id: 'dish-2', name: "八爪鱼", image: bazhuayu },
  { id: 'dish-3', name: "爆盛雪蟹肉海苔包", image: xuexierou },
  { id: 'dish-4', name: "北极贝", image: beijibei },
  { id: 'dish-5', name: "爆盛小贝柱海苔包", image: xiaobeizhu },
  { id: 'dish-6', name: "大海螺", image: dahailuo },
  { id: 'dish-7', name: "比目鱼", image: bimuyu },
  { id: 'dish-8', name: "鲽鱼裙边", image: dieyuqunbian },
  { id: 'dish-9', name: "赤虾飞鱼子", image: chixiafeiyuzi },
  { id: 'dish-10', name: "葱花金枪鱼卷", image: conghuajinqiangyujuan },
  { id: 'dish-11', name: "赤贝", image: chibei },
  { id: 'dish-12', name: "飞鱼子豆腐皮寿司", image: feiyuzidoufupi },
  { id: 'dish-13', name: "赤虾", image: chixia },
  { id: 'dish-14', name: "葱花金枪鱼军舰", image: conghuajinqiangyujunjian },
  { id: 'dish-15', name: "大切长鳍金枪鱼腩芝麻酱油", image: daqiechangqijinqiangyunan },
];

export const tierData: TierData[] = [
  { id: 'S', name: '夯' },
  { id: 'A', name: '顶级' },
  { id: 'B', name: '人上人' },
  { id: 'C', name: 'NPC' },
  { id: 'D', name: '拉完了' },
];
