import { useIndexedDB } from '@/composables/idb'
import { DB_NAME, DB_VERSION } from '@/config'
import { openDB } from 'idb'

export class BaseService {
  public storeName: string = ''

  async getIdb() {
    return openDB(DB_NAME, DB_VERSION)
  }

  async saveResourceToIdb<T>(data: T[] | null | undefined, name?: string) {
    const idb = await this.getIdb()

    const storeName = name || this.storeName
    const tx = idb.transaction(storeName, 'readwrite')
    const resource = data || []

    await Promise.all(resource.map((item) => {
      return this.saveItemToIdb(item)
    }))

    tx.oncomplete = () => {
      idb.close()
    }

    return data || []
  } 

  async saveItemToIdb<T>(item: T, sname?: string) {
    const storeName = sname || this.storeName
    const idb = await this.getIdb()
    return idb.put(storeName, item)
  }

  async getAll<T>() {
    const idb = await this.getIdb()
    return idb.getAll(this.storeName) as T
  }

  async filter<T>(cb: (item: T) => boolean) {
    const idb = await this.getIdb()
    const result: T[] = []

    let cursor = await idb.transaction(this.storeName).store.openCursor()

    while (cursor) {
      if (cb(cursor.value)) {
        result.push(cursor.value)
        // break
      } 
      cursor = await cursor.continue()
    }

    return result
  }

  async map<T>(cb: (item: T) => any) {
    const idb = await this.getIdb()
    const result: ReturnType<typeof cb>[] = [];

    let cursor = await idb.transaction(this.storeName).store.openCursor()

    while (cursor) {
      const mapped = cb(cursor.value)
      console.log(mapped)
      result.push(mapped)
      cursor = await cursor.continue()
    }

    return result
  }
}

export const baseService = new BaseService()
