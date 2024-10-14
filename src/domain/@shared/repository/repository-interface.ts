export default interface RepositoryInterface<T, DB = null> {
  create(entity: T): Promise<void>;
  update(entity: T, db?: DB): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
