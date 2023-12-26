import { supabase } from '@/utils/supabase'
import { BaseService } from './base-service'

export type Dictionary = {
  id: number;
  created_at: string;
  dictionary_category_id: number;
  image: string;
  sound: string | null;
  user_id: string | null;
  details: {
    created_at: string;
    description: string | null;
    dictionary_id: number;
    id: number;
    locale_code: string;
    name: string;
  }[];
}

class DictionaryService extends BaseService {
  storeName = 'dictionaries'

  async load() {
    const { data, error } = await supabase.from('dictionaries').select(`
      *,
      details:dictionary_details (*)
    `).order('locale_code', { ascending: true, foreignTable: 'details' })

    if (error) {
      console.error(error)
      return [[], []]
    }

    this.saveResourceToIdb(data)

    return data
  }

}

export const dictionaryService = new DictionaryService()
