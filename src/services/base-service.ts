import { useIndexedDB } from '@/composables/idb'
import { db } from '@/config/index.json'
import { localeService, type LocaleCode } from './locale.service'

export class BaseService {
  public readonly storeName: string = ''
  protected readonly idb = useIndexedDB(db.main.name, db.main.version)

  save<T>(data: T[] | null, error: any, name?: string): T[] {
    if (error) {
      console.error(this.storeName + ' ERROR')
      return data || []
    }

    data?.forEach((item) => {
      this.idb.put(name || this.storeName, item)
    })
    
    return data || []
  } 

  locale(text: string, localeCode?: string) {
    return localeService.addSuffixFromCode(text, localeCode)
  }
}

export const bservice = new BaseService;