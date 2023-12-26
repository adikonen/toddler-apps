import { supabase } from '@/utils/supabase'
import { BaseService } from './base-service'

export type LocaleCode = 'en-US' | 'id-ID'

export type Locale = {
  code: string;
  created_at: string;
  image: string;
  name: string;
} 

class LocaleService extends BaseService {
  storeName = 'locales'

  async load() {
    const { data, error } = await supabase.from('locales').select('*')

    if (error) {
      console.error(error)
      return data || []
    }

    console.log(data)

   this.saveResourceToIdb(data)

    return data
  }

}

export const localeService = new LocaleService()
