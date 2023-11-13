import { supabase } from '@/utils/supabase'
import { BaseService } from './base-service'
import { useLocaleStore } from '@/stores/locale'
import { localeService, type LocaleCode } from './locale.service'
import { imageUtil } from '@/utils/image'
import { soundUtil } from '@/utils/sound'
import type { HasImage, HasSound, MultiLocales } from '@/types'

export type Dictionary = {
  id: number
  detail_id: number
  created_at: string
  description: string | null
  dictionary_id: number
  locale_code: string
  name: string
  dictionary_category_id: number
} & HasImage &
  HasSound

class DictionaryService extends BaseService implements MultiLocales {
  storeName = 'dictionaries'

  async load(): Promise<[Dictionary[], Dictionary[]]> {
    const { data, error } = await supabase.from('dictionaries').select(`
      *,
      dictionary_details (*)
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
            item.dictionary_details.map(async (detail) => {
              const soundBlobPromise = soundUtil.getBlob(item.sound)
              const imageBlobPromise = imageUtil.getBlob(item.image)

              const payload = {
                ...detail,
                id: item.id,
                image: item.image,
                detail_id: detail.id,
                dictionary_category_id: item.dictionary_category_id,
                sound: item.sound,
                image_blob: await imageBlobPromise,
                sound_blob: await soundBlobPromise
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
  }

  getAll(localeCode?: LocaleCode): Promise<Dictionary[]> {
    const localeStore = useLocaleStore()
    return this.idb.all(
      localeService.addSuffixFromCode(this.storeName, localeCode || localeStore.activeLocaleCode)
    )
  }

  filter(cb: (item: Dictionary, index?: number) => boolean, localeCode?: LocaleCode) {
    const localeStore = useLocaleStore()
    const locale = localeService.addSuffixFromCode(
      this.storeName,
      localeCode || localeStore.activeLocaleCode
    )
    return this.idb.filter(locale, cb)
  }

  findByPk(value: number, localeCode?: LocaleCode): Promise<Dictionary> {
    return this.idb.get(localeService.addSuffixFromCode(this.storeName, localeCode), value)
  }
}

export const dictionaryService = new DictionaryService()
