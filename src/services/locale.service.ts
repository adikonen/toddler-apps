import { supabase } from '@/utils/supabase'
import { BaseService } from './base-service'
import type { HasImage } from '@/types'
import { imageUtil } from '@/utils/image'

export type LocaleCode = 'en-US' | 'id-ID'
export type Locale = {
  code: LocaleCode
  created_at: string
  name: string
} & HasImage

class LocaleService extends BaseService {
  storeName = 'locales'

  async load() {
    const { data, error } = await supabase.from('locales').select('*')

    if (error) {
      console.error(error)
      return data || []
    }

    const locales = await Promise.all(
      data.map(async (locale) => {
        return {
          ...locale,
          image_blob: await imageUtil.getBlob(locale.image)
        }
      })
    )

    return locales
  }

  async sync() {
    this.load().then((locales) => this.save(locales, this.storeName))
  }

  async getAll(): Promise<Locale[]> {
    return this.idb.all(this.storeName)
  }

  async findByPK(code: string) {
    return this.idb.get<Locale>(this.storeName, code)
  }

  addSuffixFromCode(text: string, localeCode?: string) {
    return localeCode === 'id-ID' ? text + '.ID' : text + '.EN'
  }

  en(text: string) {
    return this.addSuffixFromCode(text, 'en-US')
  }

  id(text: string) {
    return this.addSuffixFromCode(text, 'id-ID')
  }
}

export const localeService = new LocaleService()
