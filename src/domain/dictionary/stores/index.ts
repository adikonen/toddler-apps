import { DictionaryCategoryModel } from '@/models/dictionary-category.model'
import {
  dictionaryCategoryService,
  type DictionaryCategory
} from '@/services/dictionary-category.service'
import { dictionaryService, type Dictionary } from '@/services/dictionary.service'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { DictionaryModel } from '@/models/dictionary.model'

export const useMainStore = defineStore('dictionary', () => {
  // data state
  const categories = ref<DictionaryCategoryModel[]>([])
  const dictionaryData = ref<DictionaryModel[]>([])

  // interactive state
  const abc = ref('a') 
  const abcIndex = ref(0)

  /**
   * fill categories group by its type
   * insect, birds, pet -> animal
   */
  const fillCategories = async () => {
    const categoryTypes: (string|null)[] = []
    const filtered = await dictionaryCategoryService.filter<DictionaryCategory>((item) => {
      const index = categoryTypes.findIndex((type) => type == item.type)
      if (index !== -1) {
        return false
      }
      categoryTypes.push(item.type)
      return true
    })
    categories.value = filtered.map((item) => new DictionaryCategoryModel({...item}))
  }
  
  /**
   * @param {string} category_type 
   * the category_type gained from the router param in the view page
   * /dictionary/{category_type}/show
   */
  const fillDictionaryData = async (category_type: string) => {
    const map = new Map<number, string>()
    const filtered = await dictionaryService.filter<Dictionary>((dict) => {
      let categoryType = map.get(dict.dictionary_category_id)

      if (categoryType === undefined) {
        categoryType = categories.value.find((c) => c.type?.toLowerCase() === category_type.toLowerCase())?.type || undefined
        
        if (categoryType === undefined) {
          return false
        }

        map.set(dict.dictionary_category_id, categoryType)
      } 
      return category_type === categoryType  
    })
    dictionaryData.value = filtered.map((item) => new DictionaryModel({...item}))
  }

  const initAbc = () => {
    abc.value = abcs.value[0]
  }
  
  const setAbc = (char: string) => {
    abc.value = char
    // reset, cause the other might have less length
    setAbcIndex(0)
  }

  const setAbcIndex = (index: number) => {
    abcIndex.value = index
  }

  const nextAbcIndex = () => {
    let nextIndex = abcIndex.value + 1
    const length = dictionaries.value.length || 0
    if (nextIndex >= length) {
      nextIndex = 0
    }

    abcIndex.value = nextIndex
  }

  const prevAbcIndex = () => {
    let prevIndex = abcIndex.value - 1
    const length = dictionaries.value.length || 0

    if (prevIndex === -1) {
      prevIndex = length - 1
    }

    abcIndex.value = prevIndex
  }


  const dictionaries = computed(() => {
    return dictionaryData.value.filter((dict) => {
      // if state abc is 'a' then show dictionaries start with 'a'
      return dict.defaultDetail().name[0].toLowerCase() === abc.value.toLowerCase()
    })
  })

  const dictionary = computed(() => {
    return dictionaries.value[abcIndex.value]
  })

  const abcs = computed(() => {
    const raw = dictionaryData.value.map((item) => {
      return item.defaultDetail().name[0]
    })

    const unique: string[] = []

    raw.forEach((item) => {
      if (unique.includes(item)) {
        return
      }

      unique.push(item)
    })

    return unique.sort()
  })

  return {
    abc,
    categories,
    dictionaryData,
    fillCategories,
    fillDictionaryData,
    setAbc,
    setAbcIndex,
    nextAbcIndex,
    prevAbcIndex,
    initAbc,
    dictionaries,
    dictionary,
    abcs,
    // fillDictionaryData,
    // setActiveIndex,
    // resetIndex,
    // alphabets,
    // activeDictionary
  }
})
