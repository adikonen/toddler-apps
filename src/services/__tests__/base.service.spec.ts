import 'fake-indexeddb/auto'
import { describe, test, expect, beforeAll } from 'vitest'
import { BaseService } from '../base-service'
import { useIndexedDB } from '@/composables/idb'
import { db } from '@/config/index.json'
import { createSchema } from '@/schema'

beforeAll(createSchema)

describe('base service tests', () => {
  const baseService = new BaseService()
  const idb = useIndexedDB(db.main.name, db.main.version)
  const storeName = 'dictionaries.EN'
  const dict = {
    id: 1,
    created_at: '2023-11-05T14:20:17.945645+00:00',
    description: null,
    detail_id: 1,
    dictionary_category_id: 1,
    dictionary_id: 1,
    image:
      'https://srwbrauyocsuegyirrrp.supabase.co/storage/v1/object/public/main/dictionaries/images/photo-1509967733342-437077d8e41a.webp?t=2023-11-05T14%3A17%3A56.183Z',
    image_blob: undefined,
    locale_code: 'en-US',
    name: 'Grasshopper',
    sound:
      'https://srwbrauyocsuegyirrrp.supabase.co/storage/v1/object/public/main/dictionaries/sounds/Grasshopper%20Sounds-audio.webm?t=2023-11-09T03%3A11%3A02.426Z',
    sound_blob: undefined
  }

  test('save method should save data to idb', async () => {
    baseService.save([dict], storeName)

    const result = await idb.all(storeName)
    expect(result).toStrictEqual([dict])
  })
})
