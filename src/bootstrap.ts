import { createSchema } from './schema'
import { useNetwork } from '@vueuse/core'
import { localeService } from './services/locale.service'
import { dictionaryCategoryService } from './services/dictionary-category.service'
import { dictionaryService } from './services/dictionary.service'

createSchema()

const network = useNetwork()

if (network.isOnline.value) {
  localeService.load()
  dictionaryCategoryService.load()
  dictionaryService.load()
}
