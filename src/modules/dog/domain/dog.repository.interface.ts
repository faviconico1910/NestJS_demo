import {Dog} from './dog.entity';

export const DOG_REPOSITORY = 'DOG_REPOSITORY';

export interface IDogRepository {
    save(dog: Dog): Promise<void>;
    findById(id: number): Promise<Dog | null>;
    findByName(name: string): Promise<Dog | null>;
    findAll(): Promise<Dog[]>;
}