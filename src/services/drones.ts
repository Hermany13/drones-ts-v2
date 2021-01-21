import api from './api';

export interface Drones {
    id?: number;
    image?: string;
    name?: string;
    address?: string;
    battery?: number;
    max_speed?: number;
    average_speed?: number;
    status?: string;
    fly?: number;
}

export const fetchQuery = async (query: string = ''): Promise<Drones[]> => {
  const { data: drones } = await api.get<Drones[]>(
    `/drones${query}`,
  );
  const result: Drones[] = drones;
  return result;
};