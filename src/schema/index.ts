import { db } from '@/config/index.json'
import { localeService } from '@/services/locale.service'

export function createSchema() {
  const openRequest = window.indexedDB.open(db.main.name, db.main.version)

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result

    if (!db.objectStoreNames.contains('locales')) {
      db.createObjectStore('locales', { keyPath: 'code' })
    }

    // begin dict cateogry
    if (!db.objectStoreNames.contains(localeService.en('dictionary-categories'))) {
      const dictCategory = db.createObjectStore(localeService.en('dictionary-categories'), {
        keyPath: 'id'
      })
      dictCategory.createIndex('locale_code', 'local_code', { unique: false })
    }

    if (!db.objectStoreNames.contains(localeService.id('dictionary-categories'))) {
      const dictCategory = db.createObjectStore(localeService.id('dictionary-categories'), {
        keyPath: 'id'
      })
      dictCategory.createIndex('locale_code', 'local_code', { unique: false })
    }

    //begin dictionary
    if (!db.objectStoreNames.contains(localeService.en('dictionaries'))) {
      const dictCategory = db.createObjectStore(localeService.en('dictionaries'), { keyPath: 'id' })
      dictCategory.createIndex('locale_code', 'local_code', { unique: false })
    }

    if (!db.objectStoreNames.contains(localeService.id('dictionaries'))) {
      const dictCategory = db.createObjectStore(localeService.id('dictionaries'), { keyPath: 'id' })
      dictCategory.createIndex('locale_code', 'local_code', { unique: false })
    }
  }
}
