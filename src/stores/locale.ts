import { localeService } from '@/services/locale.service'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Locale } from '@/services/locale.service'
import { useStorage } from '@vueuse/core'

export const useLocaleStore = defineStore('locale', () => {
  const locales = ref<Locale[]>([])
  const activeLocaleCode = useStorage('locale.active', navigator.language || 'en-US')

  const fillLocales = () => {
    localeService.getAll().then((req) => {
      locales.value = req.result
    })
  }

  const setNextLocale = () => {
    const index = locales.value.findIndex((l) => l.code === activeLocaleCode.value)
    let nextIndex = index + 1 
    
    if (nextIndex >= locales.value.length) {
      nextIndex = 0
    }

    activeLocaleCode.value = locales.value[nextIndex].code;
  } 

  const activeLocale = computed(() => {
    return locales.value?.find((l) => l.code === activeLocaleCode.value)
  })

  return {
    locales,
    activeLocaleCode,
    fillLocales,
    setNextLocale,
    activeLocale
  }
})
