import { describe, expect, it, vi } from 'vitest'
import { blobUtil } from '../blob'

global.URL.createObjectURL = vi.fn()

describe('util blob tests', () => {
  it('return src while blob is undefined', async () => {
    const result = blobUtil.printBlob('https://some.com?image=monster', undefined)
    expect(result).toBe('https://some.com?image=monster')
  })
  it('return bob if it defined', async () => {
    const blob = new Blob()
    const result = blobUtil.printBlob('https://some.com?image=monster', blob)
    expect(result).not.toBe('https://some.com?image=monster')
  })
})
