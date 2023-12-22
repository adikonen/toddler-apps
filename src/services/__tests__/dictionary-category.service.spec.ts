import 'fake-indexeddb/auto'

import { describe, test, beforeAll, expect } from 'vitest'
import { createSchema } from '@/schema'
import { dictionaryCategoryService } from '../dictionary-category.service'
import { useIndexedDB } from '@/composables/idb'
import { db } from '@/config/index.json'
import { createPinia, setActivePinia } from 'pinia'
import { useLocaleStore } from '@/stores/locale'

beforeAll(() => {
  createSchema()
  setActivePinia(createPinia())
})

describe('dictionary category service test', () => {
  const idb = useIndexedDB(db.main.name, db.main.version)
  const en = {
    id: 1,
    detail_id: 1,
    name: 'Sea Animals',
    type: 'Animal',
    image: 'something.jpg',
    image_blob: undefined
  }

  const id = {
    id: 1,
    detail_id: 2,
    name: 'Hewan Laut',
    type: 'Animal',
    image: 'something.jpg',
    image_blob: undefined
  }

  test('load data should not contain promise property', async () => {
    const [en, id] = await dictionaryCategoryService.load()
    en.forEach((item) => {
      expect(item.image_blob).not.toBeInstanceOf(Promise)
    })
    id.forEach((item) => {
      expect(item.image_blob).not.toBeInstanceOf(Promise)
    })
  })

  test('default locale is en-US', async () => {
    idb.put('dictionary-categories.EN', en)
    const result = await dictionaryCategoryService.getAll()
    expect(result).toStrictEqual([en])
  })

  test('locale changed to id, it should return indonesian data', async () => {
    idb.put('dictionary-categories.ID', id)
    const localeStore = useLocaleStore()
    localeStore.activeLocaleCode = 'id-ID'
    const result = await dictionaryCategoryService.getAll()
    expect(result).not.toStrictEqual([en])

    expect(result).toStrictEqual([id])
  })
})
