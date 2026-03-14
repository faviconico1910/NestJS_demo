import { Injectable } from '@nestjs/common';
import {Cat} from './interfaces/cat.interfaces';

@Injectable()
export class CatsService {
    private readonly cats: any[] = [];

    create (cat: Cat){
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
