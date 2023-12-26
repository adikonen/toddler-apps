import type { DictionaryCategory } from "@/services/dictionary-category.service"
import { useLocaleStore } from "@/stores/locale"
import { EN } from '@/config'
export class Model {
  public details: any[] = [];
  
  /**
   * get detail by actice locale (if toggle locale then this will trigger)
   * this func invoke localstore, if used in computed, the computed var will watch the store mutation
   */
  getDetail() {
    const localeStore = useLocaleStore()
    return this.details[localeStore.activeLocaleIndex]
  }

  /*
  * get default detail from locale
  * this func invoke localstore, if used in computed, the computed var will watch the store mutation
  */
  defaultDetail() {
    const localeStore = useLocaleStore()
    return this.details[localeStore.defaultLocaleIndex]
  }

  /**
   * get english detail
   * this func invoke localstore, if used in computed, the computed var will watch the store mutation
   */
  getEnDetail() {
    const localStore = useLocaleStore()
    const enIndex = localStore.locales.findIndex((i) => i.code === EN)
    return this.details[enIndex]
  }
}