import 'fake-indexeddb/auto'

import { describe, expect, test } from 'vitest'
import { createSchema } from '@/schema'
import { useIndexedDB } from '../idb'
import { db } from '@/config/index.json'
import type { Locale } from '@/services/locale.service'

createSchema()

describe('idb tests', () => {
  const idb = useIndexedDB(db.main.name, db.main.version)
  const payload1 = { code: 'id-ID', name: 'Indo', created_at: '2022-02-12 18:00:00' }

  test('add method', async () => {
    idb.add('locales', payload1)
    const { result } = await idb.all('locales')
    expect(result).toStrictEqual([payload1])
  }) 

  test('add method should be throw if the primary key exists', async () => {
    try {
      await idb.add('locales', payload1)
    } catch (reason: any) {
      expect(reason.error).toBeDefined()
    }
  })
  
  const upayload1 = { code: 'id-ID', name: 'Indonesia', created_at: '2022-02-12 18:00:00' }
  const upayload2 = { code: 'en-US', name: 'English', created_at: '2022-02-12 18:00:00' }

  
  test('put method should be update if the primary key exists', async () => {
    idb.put('locales', upayload1)
    const { result } = await idb.all('locales');
    expect(result).toStrictEqual([upayload1])
  })
  
  test('put method should create new one if it not exists', async () => {
    idb.put('locales', upayload2)
    const { result } = await idb.all('locales');
    expect(result).toStrictEqual([upayload2, upayload1])
  })
  
  test('filter test', async () => {
    const result1 = await idb.filter<Locale>('locales', (item) => {
      return item.created_at === '2022-02-12 18:00:00'
    })
    
    const result2 = await idb.filter<Locale>('locales', (item) => {
      return item.name === 'Indonesia'
    })
    
    expect(result1.length).toBe(2)
    expect(result2.length).toBe(1)
  })
  
  test('get method test', async () => {
    const { result } = await idb.get('locales', 'id-ID')
    expect(result).toStrictEqual(upayload1)
  })
  

})