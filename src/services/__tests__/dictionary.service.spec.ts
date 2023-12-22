import 'fake-indexeddb/auto'
import { createSchema } from '@/schema'
import { createPinia, setActivePinia } from 'pinia'
import { test, describe, beforeAll, expect } from 'vitest'
import { dictionaryService } from '../dictionary.service'
beforeAll(() => {
  createSchema()
  setActivePinia(createPinia())
})

describe('dictionary service test', () => {
  test('load data should not contain promise property', async () => {
    const [en, id] = await dictionaryService.load()
    en.forEach((item) => {
      expect(item.image_blob).not.toBeInstanceOf(Promise)
      expect(item.sound_blob).not.toBeInstanceOf(Promise)
    })
    id.forEach((item) => {
      expect(item.image_blob).not.toBeInstanceOf(Promise)
      expect(item.sound_blob).not.toBeInstanceOf(Promise)
    })
  })
})
