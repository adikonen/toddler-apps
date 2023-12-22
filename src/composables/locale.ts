import { useLocaleStore } from '@/stores/locale'
import { computed } from 'vue'

/**
 * the column named 'type' of table dictionary category will always use en locale
 */
export const useTranslateDictionaryCategoryType = function (text: string) {
  const localeStore = useLocaleStore()
  const en = ['animal', 'family']
  const id = ['hewan', 'keluarga']

  return computed(() => {
    const code = localeStore.activeLocaleCode
    const index = en.findIndex((t) => t === text)

    if (code === 'en-US') {
      return en[index]
    } else {
      return id[index]
    }
  })
}
