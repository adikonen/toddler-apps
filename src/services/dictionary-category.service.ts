import { supabase } from "@/utils/supabase";
import { BaseService } from "./base-service";
import { useLocaleStore } from "@/stores/locale";
import { localeService, type LocaleCode } from "./locale.service";
import type { FilterCb } from "@/composables/idb";

class DictionaryCategoryService extends BaseService implements LoadAble {
  readonly storeName = 'dictionary-categories'

  async load(): Promise<[DictionaryCategories,DictionaryCategories]> {
    const { data, error } = await supabase.from('dictionary_categories').select(`
      *,
      dictionary_category_details (*)
    `)

    const en: any[] = []
    const id: any[] = []

    data?.forEach((item) => {
      item.dictionary_category_details.forEach((detail) => {
        const payload = {
          ...detail,
          id: item.id,
          image: item.image,
          detail_id: detail.id,
          type: item.type
        }

        detail.locale_code === 'en-US' ? en.push(payload) : id.push(payload)
      })
    })

    this.save(en, error, localeService.en(this.storeName))
    this.save(id, error, localeService.id(this.storeName))

    return [en, id]
  }

  getAll(code?: string) {
    const localeStore = useLocaleStore()
    return this.idb.all<DictionaryCategories>(
      this.locale(this.storeName, code || localeStore.activeLocaleCode)
    )
  }

  filter(cb: (item: DictionaryCategory, index?: number) => boolean, code?: string) {
    return this.idb.filter(this.locale(this.storeName, code), cb)
  }

  findByPk(value: number, code?: string) {
    return this.idb.get<DictionaryCategory>(this.locale(this.storeName, code), value)
  }

}

export const dictionaryCategoryService = new DictionaryCategoryService;

export type DictionaryCategory = {
  id: number,
  detail_id: number,
  created_at: string,
  locale_code: LocaleCode,
  name: string,
  image: string,
  type: string
}
export type DictionaryCategories = DictionaryCategory[]