import { supabase } from '@/utils/supabase'
import { BaseService } from './base-service'
import { useLocaleStore } from '@/stores/locale'
import { localeService, type LocaleCode } from './locale.service'
import { imageUtil } from '@/utils/image'
import type { HasImage, MultiLocales } from '@/types'

export type DictionaryCategory = {
  id: number
  detail_id: number
  created_at: string
  locale_code: LocaleCode
  name: string
  type: string
} & HasImage

class DictionaryCategoryService extends BaseService implements MultiLocales {
  storeName = 'dictionary-categories'

  async load(): Promise<[DictionaryCategory[], DictionaryCategory[]]> {
    const { data, error } = await supabase.from('dictionary_categories').select(`
      *,
      dictionary_category_details (*)
    `)

    if (error) {
      console.error(error)
      return [[], []]
    }
    const enPromises: any[] = []
    const idPromises: any[] = []

    if (data) {
      await Promise.all(
        data.map(async (item) => {
          await Promise.all(
            item.dictionary_category_details.map(async (detail) => {
              const imageBlobPromise = imageUtil.getBlob(item.image)

              const payload = {
                ...detail,
                id: item.id,
                image: item.image,
                detail_id: detail.id,
                image_blob: await imageBlobPromise
              }

              detail.locale_code === 'en-US' ? enPromises.push(payload) : idPromises.push(payload)
            })
          )
        })
      )
    }

    const [en, id] = await Promise.all([Promise.all(enPromises), Promise.all(idPromises)])

    return [en, id]
  }

  async sync() {
    const [en, id] = await this.load()
    this.save(en, localeService.en(this.storeName))
    this.save(id, localeService.id(this.storeName))
    return [en, id]
  }

  getAll(localeCode?: LocaleCode): Promise<DictionaryCategory[]> {
    const localeStore = useLocaleStore()
    const name = localeService.addSuffixFromCode(
      this.storeName,
      localeCode || localeStore.activeLocaleCode
    )
    return this.idb.all(name)
  }

  filter(cb: (item: DictionaryCategory, index?: number) => boolean, localeCode?: LocaleCode) {
    const localeStore = useLocaleStore()
    const name = localeService.addSuffixFromCode(
      this.storeName,
      localeCode || localeStore.activeLocaleCode
    )
    return this.idb.filter(name, cb)
  }

  findByPk(value: number, localeCode?: LocaleCode) {
    const localeStore = useLocaleStore()
    const name = localeService.addSuffixFromCode(
      this.storeName,
      localeCode || localeStore.activeLocaleCode
    )
    return this.idb.get<DictionaryCategory>(name, value)
  }
}

export const dictionaryCategoryService = new DictionaryCategoryService()
