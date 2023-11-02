import { createSchema } from './schema'
import { useNetwork } from '@vueuse/core'
import { localeService } from './services/locale.service'
import { dictionaryCategoryService } from './services/dictionary-category.service'

createSchema()

const network = useNetwork()

if (network.isOnline) {
  localeService.load()
  dictionaryCategoryService.load()
}
