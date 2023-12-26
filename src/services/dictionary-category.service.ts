import { supabase } from '@/utils/supabase'
import { BaseService } from './base-service'
import { DictionaryCategoryModel } from '@/models/dictionary-category.model'

export type DictionaryCategory = {
  id: number
  created_at: string
  image: string
  type: string | null
  details: {
    created_at: string
    dictionary_category_id: number
    id: number
    locale_code: string
    name: string
  }[]
}

class DictionaryCategoryService extends BaseService {
  storeName = 'dictionary-categories'

  async load() {
    const { data, error } = await supabase.from('dictionary_categories').select(`
      *,
      details:dictionary_category_details (*)
    `).order('locale_code', { ascending: true, foreignTable: 'details' })

    if (error) {
      console.error(error)
      return []
    }

    this.saveResourceToIdb(data)
    return data
  }

  
  async all(): Promise<DictionaryCategoryModel[]> {
    // this.getAll().map((item) => new DictionaryCategoryModel({...item}))
    return this.map<DictionaryCategory>((item) =>  new DictionaryCategoryModel({...item}))
  }



}

export const dictionaryCategoryService = new DictionaryCategoryService()
