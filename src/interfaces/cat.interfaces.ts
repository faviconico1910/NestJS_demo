export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}
export interface Cat {
    name: string;
    age: number;
    breed: string;
    gender: Gender;
}