import 'fake-indexeddb/auto'
import { beforeAll, describe, expect, test } from 'vitest'
import { localeService } from '../locale.service'
import { createSchema } from '@/schema'
import { useIndexedDB } from '@/composables/idb'
import { db } from '@/config/index.json'

beforeAll(createSchema)

describe('locale service tests', async () => {
  const idb = useIndexedDB(db.main.name, db.main.version)
  const locales = await localeService.load()

  test('image blob property should not instance of promise', () => {
    locales.forEach((locale) => {
      expect(locale.image_blob).not.instanceOf(Promise)
    })
  })

  test('save them to idb', async () => {
    localeService.save(locales, localeService.storeName)
    const result = await idb.all(localeService.storeName)

    expect(result.length).toBe(locales.length)
  })

  test('get all', async () => {
    const locales = await localeService.getAll()
    expect(locales).toBeInstanceOf(Array)
  })

  describe('translation methods', () => {
    const someStoreName = 'dictionaries'

    test('add suffix', () => {
      const en = localeService.addSuffixFromCode(someStoreName, 'en-US')
      expect(en).toBe(`dictionaries.EN`)

      const id = localeService.addSuffixFromCode(someStoreName, 'id-ID')
      expect(id).toBe(`dictionaries.ID`)
    })

    test('en translation text has suffix .EN', () => {
      const en = localeService.en(someStoreName)
      expect(en).toBe(`dictionaries.EN`)
    })

    test('id translation text has suffix .ID', () => {
      const id = localeService.id(someStoreName)
      expect(id).toBe(`dictionaries.ID`)
    })
  })
})
