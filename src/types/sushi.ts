export interface Dish {
  id: string;
  name: string;
  image: string;
  newMonth?: number; // 新品月份，如 12 表示12月新品
}

export type TierId = 'S' | 'A' | 'B' | 'C' | 'D';

export interface Tier {
  id: TierId;
  name: string;
  items: Dish[];
}

export interface TierData {
  id: TierId;
  name: string;
}
