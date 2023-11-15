import { useLocaleStore } from "@/stores/locale";
import { createPinia, setActivePinia } from "pinia";
import { describe, test, beforeAll, expect } from "vitest";
import { useTranslateDictionaryCategoryType } from "../locale";

beforeAll(() => {
  setActivePinia(createPinia())
})

describe('locale composables test', () => {
  test('it should reactive', () => {
    const localeStore = useLocaleStore()
    const txt = useTranslateDictionaryCategoryType('animal')
    expect(txt.value).toBe('animal')

    localeStore.activeLocaleCode = 'id-ID'
    expect(txt.value).toBe('hewan')
  })

  test('it can wrapped in function', () => {
    const localeStore = useLocaleStore()
    localeStore.activeLocaleCode = 'en-US'
    const ttype = (txt: string) => useTranslateDictionaryCategoryType(txt)

    const d1 = ttype('animal')
    const d2 = ttype('family')

    expect(d1.value).toBe('animal')
    expect(d2.value).toBe('family')

    localeStore.activeLocaleCode = 'id-ID'
    expect(d1.value).toBe('hewan')
    expect(d2.value).toBe('keluarga')

  })
})