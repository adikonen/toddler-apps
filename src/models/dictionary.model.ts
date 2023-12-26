import type { Dictionary } from "@/services/dictionary.service";
import { Model } from "./model";

export class DictionaryModel extends Model {
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

  constructor(opt: Dictionary) {
    super()
    const {
      id,
      created_at,
      dictionary_category_id,
      image,
      sound,
      user_id,
      details
    } = opt

    this.id = id;
    this.created_at = created_at;
    this.image = image;
    this.dictionary_category_id = dictionary_category_id;
    this.details = details;
    this.sound =  sound;
    this.user_id = user_id;
  }

  getDetail():typeof this.details[0]  {
    return super.getDetail()
  }

  getEnDetail():typeof this.details[0]  {
    return super.getEnDetail()
  }


}

