import {
  dictionaryCategoryService,
  type DictionaryCategory
} from '@/services/dictionary-category.service'
import { dictionaryService, type Dictionary } from '@/services/dictionary.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type DictionaryData = {
  alphabet: string
  dictionaries: Dictionary[]
}

export const useMainStore = defineStore('dictionary', () => {
  const categories = ref<DictionaryCategory[]>([])
  const dictionariesData = ref<DictionaryData[]>([])

  // index for array dictionary data
  const activeIndex = ref(0)
  const activeDictionaryIndex = ref(0)

  const fillCategories = async () => {
    const result = await dictionaryCategoryService.getAll()
    categories.value = result
  }

  const fillDictionariesData = async () => {
    const result = await dictionaryService.getAll()
    const data: DictionaryData[] = []

    result.forEach((item) => {
      const obj = {
        alphabet: item.name[0],
        dictionaries: [item]
      }

      const index = data.findIndex((d) => d.alphabet === obj.alphabet)

      if (index !== -1) {
        data[index].dictionaries.push(item)
      } else {
        data.push(obj)
      }
    })

    dictionariesData.value = data
  }

  const setIndexToNext = () => {
    let nextIndex = activeIndex.value + 1
    if (nextIndex >= dictionariesData.value.length) {
      nextIndex = 0
    }

    activeIndex.value = nextIndex
  }

  const setIndexToPrev = () => {
    let nextIndex = activeIndex.value - 1
    if (nextIndex < 0) {
      nextIndex = dictionariesData.value.length - 1
    }

    activeIndex.value = nextIndex
  }

  const setDictionaryIndexToNext = () => {
    let nextIndex = activeDictionaryIndex.value + 1
    if (nextIndex >= dictionariesData.value[activeDictionaryIndex.value].dictionaries.length) {
      nextIndex = 0
    }

    activeDictionaryIndex.value = nextIndex
  }

  const setDictionaryIndexToPrev = () => {
    let nextIndex = activeDictionaryIndex.value - 1
    if (nextIndex < 0) {
      nextIndex = dictionariesData.value[activeDictionaryIndex.value].dictionaries.length - 1
    }

    activeDictionaryIndex.value = nextIndex
  }

  return {
    categories,
    dictionariesData,
    activeDictionaryIndex,
    activeIndex,
    setIndexToNext,
    setDictionaryIndexToPrev,
    setIndexToPrev,
    setDictionaryIndexToNext,
    fillCategories,
    fillDictionariesData
  }
})
