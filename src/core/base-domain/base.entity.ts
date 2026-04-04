export abstract class BaseEntity<T> {
    id: T;
    readonly createdAt?: Date;
    updatedAt?: Date;

    constructor (id?: T, createdAt?: Date, updatedAt?: Date) {
        if (id) {
            this.id = id;
        }

        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}