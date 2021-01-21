import api from './api';

// Helpers
import { SearchHelper } from '@/helpers/SearchHelper';
export interface Drones {
    id?: number;
    image?: string;
    name: string;
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

export const fetchSearchData = async (search: string = '') => {
  const { data: drones } = await api.get<Drones[]>(
    `/drones`,
  );

  return SearchHelper(search, drones);
};