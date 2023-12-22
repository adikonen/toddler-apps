import { useIndexedDB } from '@/composables/idb'
import { db } from '@/config/index.json'

export class BaseService {
  public storeName: string = ''
  protected idb = useIndexedDB(db.main.name, db.main.version)

  save<T>(data: T[] | null | undefined, name: string) {
    const sname = name || this.storeName

    data?.forEach((item) => {
      this.storeItem(sname, item)
    })

    return data || []
  }

  protected storeItem<T>(sname: string, item: T): void {
    this.idb.put(sname, item)
  }
}

export const bservice = new BaseService()
