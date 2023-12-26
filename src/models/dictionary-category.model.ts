import type { DictionaryCategory } from "@/services/dictionary-category.service";
import { Model } from "./model";

export class DictionaryCategoryModel extends Model {
  public id?: number
  public created_at?: string
  public image?: string
  public type?: string | null

  details: {
    created_at: string
    dictionary_category_id: number
    id: number
    locale_code: string
    name: string
  }[]

  constructor(opt: DictionaryCategory) {
    super()
    
    const {
      id,
      created_at,
      image,
      type,
      details
    } = opt

    this.id = id
    this.created_at = created_at
    this.image = image
    this.type = type
    this.details = details
  }

  getDetail(): typeof this.details[0] {
    return super.getDetail()
  }

}