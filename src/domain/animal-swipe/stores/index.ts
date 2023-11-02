import { type DictionaryCategories, dictionaryCategoryService } from "@/services/dictionary-category.service";
import { useLocaleStore } from "@/stores/locale";
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useMainStore = defineStore('animal-swipe', () => {
  const categories = ref<DictionaryCategories>();

  const fillCategories = async () => {
    const result  = await dictionaryCategoryService.filter((item) => item.type === 'ANIMAL')
    categories.value = result
    return result
  }

  return {
    categories,
    fillCategories
  }
})