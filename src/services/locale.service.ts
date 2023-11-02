import { supabase } from '@/utils/supabase'
import { BaseService } from './base-service'

class LocaleService extends BaseService implements LoadAble {
  readonly storeName = 'locales'

  async load() {
    const { data, error } = await supabase.from('locales').select('*')

    return this.save(data, error)
  }

  async getAll() {
    return this.idb.all<Locales>(this.storeName)
  }

  async findByPK(code: string) {
    return this.idb.get<Locale>(this.storeName, code)
  }

  addSuffixFromCode(text: string, localeCode?: string) {
    return localeCode === 'id-ID' 
      ? text + '.ID'
      : text + '.EN'
  }

  en(text: string) {
    return this.addSuffixFromCode(text, 'en-US')
  }

  id(text: string) {
    return this.addSuffixFromCode(text, 'id-ID')
  }

}

export const localeService = new LocaleService()

export type Locales = Awaited<ReturnType<typeof localeService.load>>
export type Locale = Locales[0]

export type LocaleCode = 'en-US'|'id-ID'