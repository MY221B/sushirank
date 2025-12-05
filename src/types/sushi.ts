export interface Dish {
  id: string;
  name: string;
  image: string;
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
