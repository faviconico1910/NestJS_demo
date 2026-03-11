import {z} from 'zod';  
import {Gender} from '../interfaces/cat.interfaces';


export const CreateCatSchema = z.object({
    name : z.string(),
    age : z.number().refine(val => val > 0, {
        message: "Age must be greater than 0"
    }),
    breed : z.string(),
    gender: z.nativeEnum(Gender).refine(val => Object.values(Gender).includes(val), {
        message: "Giới tính không hợp lệ. Phải là MALE hoặc FEMALE",
    })

}).required();

export type CreateCatDto = z.infer<typeof CreateCatSchema>;