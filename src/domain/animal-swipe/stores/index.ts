import { useVoice } from "@/composables/voice";
import { type DictionaryCategory, dictionaryCategoryService } from "@/services/dictionary-category.service";
import { dictionaryService, type Dictionary } from "@/services/dictionary.service";
import { useLocaleStore } from "@/stores/locale";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useMainStore = defineStore('animal-swipe', () => {
  const categories = ref<DictionaryCategory[]>([]);
  const animals = ref<Dictionary[]>([])
  const activeAnimalIndex = ref(0)

  const fillCategories = async () => {
    categories.value  = await dictionaryCategoryService.filter((item) => item.type === 'ANIMAL')
    console.log(categories.value)
  }

  const fillAnimals = async (category_id: number) => {
    animals.value = await dictionaryService.filter((item) => {
      return item.dictionary_category_id == category_id
    })
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