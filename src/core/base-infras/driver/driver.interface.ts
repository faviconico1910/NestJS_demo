export interface IDriver<T> {
  save(entity: Partial<T>): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  findAll(query?: Partial<T>): Promise<T[]>;
  findOne(query?: Partial<T>): Promise<T | null>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}