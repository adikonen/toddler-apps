import { supabase } from "@/utils/supabase";
import { BaseService } from "./base-service";
import { useLocaleStore } from "@/stores/locale";
import { localeService, type LocaleCode } from "./locale.service";
import type { FilterCb } from "@/composables/idb";
import { imageUtil } from "@/utils/image";
import type { InteractionWithLocales } from "@/types";

export type DictionaryCategory = {
  id: number,
  detail_id: number,
  created_at: string,
  locale_code: LocaleCode,
  name: string,
  image: string,
  type: string,
  image_blob?: Blob
}

class DictionaryCategoryService extends BaseService implements InteractionWithLocales {
  readonly storeName = 'dictionary-categories'

  async load(): Promise<[DictionaryCategory[], DictionaryCategory[]]>{
    const { data, error } = await supabase.from('dictionary_categories').select(`
      *,
      dictionary_category_details (*)
    `)

    if (error) {
      console.error(error);
      return [[],[]]
    }

    async function getData() {
      const enPromises: any[] = [];
      const idPromises: any[] = [];
    
      data?.forEach((item) => {
        item.dictionary_category_details.forEach(async (detail) => {
          const payload = {
            ...detail,
            locale_code: detail.locale_code as LocaleCode,
            id: item.id,
            image: item.image,
            detail_id: detail.id,
            type: item.type,
            // pilihan kategori dikit jadi gpp ngefetch ulang waktu direfresh halamannya
            image_blob: imageUtil.getBlob(item.image) // No need to await here
          };
    
          if (detail.locale_code === 'en-US') {
            enPromises.push(payload);
          } else {
            idPromises.push(payload);
          }
        });
      });
    
      const [en, id] = await Promise.all([
        Promise.all(enPromises),
        Promise.all(idPromises),
      ]);
    
      return [en, id];
    }
    
    const [en, id] = await getData()
    
    console.log(en)

    this.save(en, localeService.en(this.storeName))
    this.save(id, localeService.id(this.storeName))

    return [en, id]
  }

  getAll(localeCode?: LocaleCode) {
    const localeStore = useLocaleStore()
    return this.idb.all<DictionaryCategory[]>(
      localeService.addSuffixFromCode(this.storeName, localeCode || localeStore.activeLocaleCode)
    )
  }

  filter(cb: (item: DictionaryCategory, index?: number) => boolean, localeCode?: LocaleCode) {
    const localeStore = useLocaleStore()
    const name = localeService.addSuffixFromCode(this.storeName, localeCode || localeStore.activeLocaleCode)
    return this.idb.filter(name, cb)
  }

  findByPk(value: number, localeCode?: LocaleCode) {
    const localeStore = useLocaleStore()
    const name = localeService.addSuffixFromCode(this.storeName, localeCode || localeStore.activeLocaleCode)
    return this.idb.get<DictionaryCategory>(name, value)
  }

}

export const dictionaryCategoryService = new DictionaryCategoryService;
