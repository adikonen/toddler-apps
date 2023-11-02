export type CompareOperator = '=' | '<' | '>' | '!=' | '<=' | '>='
export type FilterCb = <T>(item: T, index?: number) => boolean

export function useIndexedDB(dbname: string, version: number) {
  function beginTransaction(
    openRequest: IDBOpenDBRequest, 
    storeName: string, 
    fn: (store: IDBObjectStore) => void, 
    mode?: IDBTransactionMode
  ) {
    const db = openRequest.result
    const transaction = db.transaction(storeName, mode)
    const store = transaction.objectStore(storeName)
    
    fn(store)

    transaction.oncomplete = () => db.close()
  } 
  
  const add = <T>(
    storeName: string,
    payload: T,
  ): Promise<IDBRequest> => {
    const openRequest = window.indexedDB.open(dbname, version)
    
    return new Promise<IDBRequest<IDBValidKey>>((resolve, reject) => {
      openRequest.onsuccess = () => {
        beginTransaction(openRequest, storeName, (store) => {
          const result = store.add(payload)
          result.onsuccess = () => resolve(result)
          result.onerror = () => reject(result)
        }, 'readwrite')
      }
    })

  }

 const put = <T>(
    storeName: string,
    payload: T,
  ): Promise<IDBRequest> => {
    const openRequest = window.indexedDB.open(dbname, version)
    
    return new Promise<IDBRequest>((resolve, reject) => {
      openRequest.onsuccess = () => {
        beginTransaction(openRequest, storeName, (store) => {
          const result = store.put(payload)
          result.onsuccess = () => resolve(result)
          result.onerror = () => reject(result)
        }, 'readwrite')
      }
    })
    
  }

  const all = <T>(storeName: string) => {
    const openRequest = window.indexedDB.open(dbname, version)
    
    return new Promise<IDBRequest>((resolve, reject) => {
      openRequest.onsuccess = () => {
        beginTransaction(openRequest, storeName, (store) => {
          const result: IDBRequest<T[]> = store.getAll()
          result.onsuccess = () => resolve(result)
          result.onerror = () => reject(result)
        })
      }
    })
  }

  const filter = <T>(storeName: string, cb: (item: T, index?: number) => boolean) => {
    const openRequest = window.indexedDB.open(dbname, version)

    return new Promise<T[]>((resolve, reject) => {
      openRequest.onsuccess = () => {
        const db = openRequest.result
        const transaction = db.transaction(storeName)
        const store = transaction.objectStore(storeName)
        const cursorRequest = store.openCursor()
        const result: T[] = []
        let index = 0;

        cursorRequest.onsuccess = () => {
          const cursor = cursorRequest.result
          if (cursor) {
            if (cb(cursor?.value, index)) {
              result.push(cursor.value)
            }
            index += 1
            cursor?.continue()
          } else {
            resolve(result)
          }
        }

        cursorRequest.onerror = (error) => reject(error)
      }
    })
  }

  const get = <T>(storeName: string, value: any, key?: string) => {
    const openRequest = window.indexedDB.open(dbname, version)
    
    return new Promise<IDBRequest>((resolve, reject) => {
      openRequest.onsuccess = () => {
        beginTransaction(openRequest, storeName, (store) => {
          const result: IDBRequest<T> = key === undefined ? store.get(value) : store.index(key).get(value)
          result.onsuccess = () => resolve(result)
          result.onerror = () => reject(result)
        })
      }
    })
  }

  return {
    add,
    put,
    all,
    filter,
    get
  }
}
