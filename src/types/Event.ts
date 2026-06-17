export interface Event {
  id: string;
  title: string;
  categories: { id: string; title: string }[];
  geometries: { date: string; type: string; coordinates: number[] }[];
}