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

export const StatusFilterHelper = (search: string, data: Drones[]) => {
    const aux: Drones[] = [];
    const result = data.map((drone) => {
        if(drone.status.includes(search)){
            aux.push(drone);
        }
    });

    return aux;
}