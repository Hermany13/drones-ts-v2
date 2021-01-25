import { Drones } from '@/services/drones';

export const SearchHelper = (search: string, data: Drones[]) => {
    const aux: Drones[] = [];
    data.map((drone) => {
        if(drone.name.includes(search)){
            aux.push(drone);
        }
    });

    return aux;
}

export const StatusFilterHelper = (search: string, data: Drones[]) => {
    const aux: Drones[] = [];
    data.map((drone) => {
        if(drone.status.includes(search)){
            aux.push(drone);
        }
    });

    return aux;
}

export const FlyFilterHelper = (search: string, data: Drones[]) => {
    const aux: Drones[] = [];

    switch(search) {
        case 'Going': {
            data.map((drone) => {
                if(drone.fly <= 50){
                    aux.push(drone);
                }
            });

            break;
        }

        case 'Coming': {
            data.map((drone) => {
                if(drone.fly > 50){
                    aux.push(drone);
                }
            });

            break;
        }
    }
    
    return aux;
}