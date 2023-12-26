import { DictionaryCategoryModel } from '@/models/dictionary-category.model'
import { DictionaryModel } from '@/models/dictionary.model'
import {
  type DictionaryCategory,
  dictionaryCategoryService
} from '@/services/dictionary-category.service'
import { dictionaryService, type Dictionary } from '@/services/dictionary.service'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMainStore = defineStore('animal-swipe', () => {
  const categories = ref<DictionaryCategoryModel[]>([])
  const animals = ref<DictionaryModel[]>([])
  const activeAnimalIndex = ref(0)

  const fillCategories = async () => {
    const data = await dictionaryCategoryService.filter<DictionaryCategory>((item) => item.type === 'ANIMAL')
    categories.value = data.map((c) => new DictionaryCategoryModel({...c}))
  }

  const fillAnimals = async (category_id: number) => {
    const data = await dictionaryService.filter<Dictionary>((item) => {
      return item.dictionary_category_id == category_id
    })
    animals.value = data.map((item) => new DictionaryModel({...item})) 
  }

  const setIndexToNext = () => {
    let nextIndex = activeAnimalIndex.value + 1
    if (nextIndex >= animals.value.length) {
      nextIndex = 0
    }

    activeAnimalIndex.value = nextIndex
  }

  const setIndexToPrev = () => {
    let nextIndex = activeAnimalIndex.value - 1
    if (nextIndex < 0) {
      nextIndex = animals.value.length - 1
    }

    activeAnimalIndex.value = nextIndex
  }

  const animal = computed(() => {
    return animals.value.at(activeAnimalIndex.value)
  })

  // special function
  const $reset = () => {
    activeAnimalIndex.value = 0
    animals.value = []
  }

  return {
    categories,
    animals,
    activeAnimalIndex,
    fillCategories,
    fillAnimals,
    setIndexToNext,
    setIndexToPrev,
    $reset,
    animal
  }
})
