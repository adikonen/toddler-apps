import { localeService } from '@/services/locale.service'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Locale } from '@/services/locale.service'
import { useStorage } from '@vueuse/core'

export const useLocaleStore = defineStore('locale', () => {
  const defaultLocaleCode = useStorage('i18n-nxtLng', navigator.language || 'en-US')
  const locales = ref<Locale[]>([])
  const activeLocaleCode = useStorage('locale.active', navigator.language || 'en-US')

  const fillLocales = async () => {
    locales.value = await localeService.getAll()
  }

  const setNextLocale = () => {
    const index = locales.value.findIndex((l) => l.code === activeLocaleCode.value)
    let nextIndex = index + 1

    if (nextIndex >= locales.value.length) {
      nextIndex = 0
    }

    activeLocaleCode.value = locales.value[nextIndex].code
  }

  const activeLocale = computed(() => {
    return locales.value?.find((l) => l.code === activeLocaleCode.value)
  })

  const activeLocaleIndex = computed(() => {
    const data = locales.value.sort()
    return data.findIndex((l) => l.code === activeLocaleCode.value)
  })

  const defaultLocale = computed(() => {
    return locales.value?.find((l) => l.code === defaultLocaleCode.value)
  })

  const defaultLocaleIndex = computed(() => {
    const data = locales.value.sort()
    return data.findIndex((l) => l.code === defaultLocaleCode.value)
  })

  watch(activeLocaleCode, (newv) => {
    const supportedLocales = ['en-US', 'id-ID']
    if (!supportedLocales.includes(newv)) {
      activeLocaleCode.value = 'en-US'
    }
  })

  return {
    locales,
    activeLocaleCode,
    defaultLocaleCode,
    fillLocales,
    setNextLocale,
    defaultLocale,
    activeLocale,
    activeLocaleIndex,
    defaultLocaleIndex,
  }
})
