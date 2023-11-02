import { localeService } from '@/services/locale.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Locale, Locales } from '@/services/locale.service'
import { useStorage } from '@vueuse/core'

export const useLocaleStore = defineStore('locale', () => {
  const locales = ref<Locales>()
  const activeLocaleCode = useStorage('locale.active', navigator.language || 'en-US')

  const fillLocales = () => {
    localeService.getAll().then((req) => {
      locales.value = req.result
    })
  }

  return {
    locales,
    activeLocaleCode,
    fillLocales
  }
})
