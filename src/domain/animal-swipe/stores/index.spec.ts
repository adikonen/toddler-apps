import 'fake-indexeddb/auto'
import { createSchema } from '@/schema'
import { dictionaryCategoryService } from '@/services/dictionary-category.service'
import { createPinia, setActivePinia } from 'pinia'
import { describe, test, beforeAll, expect } from 'vitest'
import { useMainStore } from '.'

beforeAll(() => {
  createSchema()
  setActivePinia(createPinia())
  dictionaryCategoryService.save(
    [
      {
        id: 1,
        localeCode: 'en-US',
        detail_id: 1,
        name: 'Sea Animals',
        type: 'ANIMAL',
        image: 'some.jpg'
      },
      { id: 2, localeCode: 'en-US', detail_id: 3, name: 'Fruit', type: 'FRUIT', image: 'some.png' }
    ],
    'dictionary-categories.EN'
  )

  dictionaryCategoryService.save(
    [
      {
        id: 1,
        localeCode: 'id-ID',
        detail_id: 2,
        name: 'Hewan Laut',
        type: 'ANIMAL',
        image: 'some.jpg'
      },
      { id: 1, localeCode: 'id-ID', detail_id: 4, name: 'Buah', type: 'FRUIT', image: 'some.png' }
    ],
    'dictionary-categories.ID'
  )
})

describe('animal swipe store tests', () => {
  test('only accept animal category', async () => {
    const store = useMainStore()
    const result = await store.fillCategories()

    expect(store.categories).toStrictEqual([
      {
        id: 1,
        localeCode: 'en-US',
        detail_id: 1,
        name: 'Sea Animals',
        type: 'ANIMAL',
        image: 'some.jpg'
      }
    ])
  })
})
