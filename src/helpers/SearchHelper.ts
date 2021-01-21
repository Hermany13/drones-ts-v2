import { Drones } from '@/services/drones';

export const SearchHelper = (search: string, data: Drones[]) => {
    const aux: Drones[] = [];
    const result = data.map((drone) => {
        if(drone.name.includes(search)){
            aux.push(drone);
        }
    });

    return aux;
}

