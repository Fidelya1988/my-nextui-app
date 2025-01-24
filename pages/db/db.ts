import { listboxItem } from "@nextui-org/theme";
import { readFile, writeFile, access } from "fs/promises";
import { UUIDTypes } from "uuid";


type FieldType = string | number | Date | UUIDTypes | null | undefined;


export type ModelDefinition = {
  name: string;
  fields: { [fieldName: string]: FieldType };
};

export type DTO<T extends ModelDefinition> = {
  [K in keyof T['fields']]: T['fields'][K];
};

export class BaseModel<T extends ModelDefinition> {
  constructor(public definition: T, private db: DB) { }

  // Метод для створення нового запису
  public async create(value: DTO<T>) {
    return this.db.save(this.definition.name, value);
  }

  // Метод для отримання всіх записів
  public async findAll() {
    return this.db.findAll(this.definition.name);
  }
}

export type ModelWithMethods<Model extends ModelDefinition> = {
  create: (value: DTO<Model>) => Promise<DTO<Model>>;
  findAll: () => Promise<DTO<Model>[]>;
  findById?: (id: string) => Promise<DTO<Model> | undefined>; // Наприклад, додатковий метод
  findOne: (fields: Partial<ModelDefinition['fields']>) => Promise<DTO<Model> | undefined>;
};


export class DB {
  private models: Record<string, ModelDefinition> = {};
  public dbPath: string = 'db.json'

  constructor(models: ModelDefinition[]) {
    for (const model of models) {
    }

  }
  public async init() {
    const structure: Record<string, []> = {}
    for (const key of Object.keys(this.models)) {
      structure[key] = []

    }
    const isExist = await this.checkFileExist();
    if (!isExist) {
      await writeFile(this.dbPath, JSON.stringify(structure, null, 2), 'utf8');
      console.log('DB created')
    }

  }

  protected async readData() {
    const fileData = await readFile(this.dbPath, 'utf8');
    return JSON.parse(fileData);
  }

  protected async writeData(data: any) {
    await writeFile(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
  }

  protected async checkFileExist() {
    try {
      await access(this.dbPath);
      return true;
    } catch {
      return false;
    }

  }


  public async save(modelName: string, value: any) {
    const data = await this.readData();
    if (!data[modelName]) {
      throw new Error(`Table ${modelName} does not exist`);
    }
    data[modelName].push(value);
    await this.writeData(data);
    return value;
  }

  public async findAll(modelName: string) {
    const data = await this.readData();
    return data[modelName] || [];
  }

  public createModel<Model extends ModelDefinition>(model: Model): ModelWithMethods<Model> {
    const dbInstance = this;

    return {
      async create(value: DTO<Model>) {
        const data = await dbInstance.readData()
        const list = data[model.name];
        const newItem = { ...value, id: list.length + 1 }
        list.push(newItem);
        await dbInstance.writeData(data);
        return newItem;
      },

      async findAll() {
        const data = await dbInstance.readData()
        return data[model.name];
      },
      async findOne(fields) {
        const data = await dbInstance.readData()

        const result = data[model.name].find((item: ModelDefinition['fields']) => {
          let founded: ModelDefinition['fields'] | null = item

          for (const [key, value] of Object.entries(fields)) {

            if (item[key] != value) {
              founded = null
            }
          }
          if (founded) {
            return founded;
          }

        })
        return result

      }
    };
  }
}