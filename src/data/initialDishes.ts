import { Dish, TierData } from "@/types/sushi";

export const initialDishes: Dish[] = [
  { id: 'dish-0', name: "鲜切金枪鱼大腩", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop" },
  { id: 'dish-1', name: "鲜切竹荚鱼", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&fit=crop" },
  { id: 'dish-2', name: "鲜切真鲷", image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=200&h=200&fit=crop" },
  { id: 'dish-3', name: "鲽鱼裙边", image: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=200&h=200&fit=crop" },
  { id: 'dish-4', name: "鲜切寒鰤鱼", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=200&h=200&fit=crop" },
  { id: 'dish-5', name: "炙烤和牛寿司", image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=200&h=200&fit=crop" },
  { id: 'dish-6', name: "三文鱼刺身", image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=200&h=200&fit=crop" },
  { id: 'dish-7', name: "海胆军舰卷", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200&h=200&fit=crop" },
  { id: 'dish-8', name: "甜虾寿司", image: "https://images.unsplash.com/photo-1562158074-d49fbeffcc91?w=200&h=200&fit=crop" },
  { id: 'dish-9', name: "鳗鱼寿司", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=200&fit=crop" },
];

export const tierData: TierData[] = [
  { id: 'S', name: '夯' },
  { id: 'A', name: '顶级' },
  { id: 'B', name: '人上人' },
  { id: 'C', name: 'NPC' },
  { id: 'D', name: '拉完了' },
];
