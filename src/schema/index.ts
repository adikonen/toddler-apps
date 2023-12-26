import { DB_NAME, DB_VERSION } from '@/config'
import { dictionaryRoutes } from '@/domain/dictionary/routes'
import { dictionaryCategoryService } from '@/services/dictionary-category.service'
import { dictionaryService } from '@/services/dictionary.service'
import { localeService } from '@/services/locale.service'

export function createSchema() {
  const openRequest = window.indexedDB.open(DB_NAME, DB_VERSION)

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result

    if (!db.objectStoreNames.contains('locales')) {
      db.createObjectStore('locales', { keyPath: 'code' })
    }

    // begin dict cateogry
    const categoryName = dictionaryCategoryService.storeName
    if (!db.objectStoreNames.contains(categoryName)) {
      const dictCategory = db.createObjectStore(categoryName, {
        keyPath: 'id'
      })
      dictCategory.createIndex('locale_code', 'locale_code', { unique: false })
    }

    const dictName = dictionaryService.storeName
    if (!db.objectStoreNames.contains(dictName)) {
      const dict = db.createObjectStore(dictName, {
        keyPath: 'id'
      })
      dict.createIndex('locale_code', 'locale_code', { unique: false })
    }

    // const dictName = dictionaryRoutes.storeName
    // if (!db.objectStoreNames.contains(localeService.id('dictionary-categories'))) {
    //   const dictCategory = db.createObjectStore(localeService.id('dictionary-categories'), {
    //     keyPath: 'id'
    //   })
    //   dictCategory.createIndex('locale_code', 'local_code', { unique: false })
    // }

    // //begin dictionary
    // if (!db.objectStoreNames.contains(localeService.en('dictionaries'))) {
    //   const dictCategory = db.createObjectStore(localeService.en('dictionaries'), { keyPath: 'id' })
    //   dictCategory.createIndex('locale_code', 'local_code', { unique: false })
    // }

    // if (!db.objectStoreNames.contains(localeService.id('dictionaries'))) {
    //   const dictCategory = db.createObjectStore(localeService.id('dictionaries'), { keyPath: 'id' })
    //   dictCategory.createIndex('locale_code', 'local_code', { unique: false })
    // }
  }
}
