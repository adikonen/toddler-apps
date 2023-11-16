import {
  dictionaryCategoryService,
  type DictionaryCategory
} from '@/services/dictionary-category.service'
import { dictionaryService, type Dictionary } from '@/services/dictionary.service'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type DictionaryData = {
  alphabet: string
  dictionaries: Dictionary[]
}

export const useMainStore = defineStore('dictionary', () => {
  const categories = ref<DictionaryCategory[]>([])
  const dictionaryData = ref<DictionaryData[]>([])

  // index for array dictionary data
  const activeIndex = ref(0)
  const activeDictionaryIndex = ref(0)

  const fillCategories = async () => {
    const result = await dictionaryCategoryService.getAll()
    const ctypes: string[] = []

    const data = result
      .filter((item) => {
        const index = ctypes.findIndex((type) => type == item.type)
        if (index !== -1) {
          return false
        }
        ctypes.push(item.type)
        return true
      })
      .map((item) => {
        return {
          ...item,
          name: item.type.toLowerCase()
        }
      })

    categories.value = data
  }

  const fillDictionaryData = async (type: string) => {
    const categoryData = await dictionaryCategoryService.filter((c) => {
      return type.toLowerCase() === c.type.toLowerCase()
    })

    const categoryIds = categoryData.map((c) => c.id)

    const result = await dictionaryService.filter((d) => {
      // where dictionary.dictionary_category_id in categoryIds
      return categoryIds.includes(d.dictionary_category_id)
    })

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

    dictionaryData.value = data.sort((a, b) => {
      return a.alphabet.localeCompare(b.alphabet)
    })

    console.log(dictionaryData)
  }

  const setDictionaryIndexToNext = () => {
    let nextIndex = activeDictionaryIndex.value + 1
    if (nextIndex >= dictionaryData.value[activeIndex.value].dictionaries.length) {
      nextIndex = 0
    }

    activeDictionaryIndex.value = nextIndex
  }

  const setDictionaryIndexToPrev = () => {
    let nextIndex = activeDictionaryIndex.value - 1
    if (nextIndex < 0) {
      nextIndex = dictionaryData.value[activeDictionaryIndex.value].dictionaries.length - 1
    }

    activeDictionaryIndex.value = nextIndex
  }

  const setActiveIndex = (index: number) => {
    activeDictionaryIndex.value = 0
    activeIndex.value = index
  }

  const resetIndex = () => {
    activeDictionaryIndex.value = 0
    activeIndex.value = 0
  }

  const alphabets = computed(() => dictionaryData.value.map((d) => d.alphabet))

  const activeDictionary = computed(() => {
    return dictionaryData.value[activeIndex.value]?.dictionaries[activeDictionaryIndex.value]
  })

  return {
    categories,
    dictionaryData,
    activeDictionaryIndex,
    activeIndex,
    setDictionaryIndexToPrev,
    setDictionaryIndexToNext,
    fillCategories,
    fillDictionaryData,
    setActiveIndex,
    resetIndex,
    alphabets,
    activeDictionary
  }
})
