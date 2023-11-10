import { useIndexedDB } from '@/composables/idb'
import { db } from '@/config/index.json'
import { localeService, type LocaleCode } from './locale.service'
import { imageUtil } from '@/utils/image'

export class BaseService {
  public readonly storeName: string = ''
  protected readonly idb = useIndexedDB(db.main.name, db.main.version)

  save<T>(data: T[] | null | undefined, name: string) {
    const sname = name || this.storeName;

    data?.forEach((item) => {
      if (item instanceof Object && item.hasOwnProperty('image')) {
        this.storeItemWithImage(sname, item as T & { image: string });
      } else {
        this.storeItem(sname, item)
      }
    });

    return data || []
  }
  
  async storeItemWithImage<T>(sname: string, item: T & { image: string }) {
    const image_blob = await imageUtil.getBlob(item.image);
    this.idb.put(sname, {
      ...item,
      image_blob,
    });

    return image_blob
  }

  storeItem<T>(sname: string, item: T): void {
    this.idb.put(sname, item);
  }

}

  export const bservice = new BaseService;