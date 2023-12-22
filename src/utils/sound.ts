import type { HasSound } from '@/types'
import { BlobUtil } from './blob'

class SoundUtil extends BlobUtil {
  readBlob<T extends HasSound>(item?: T) {
    return this.printBlob(item?.sound, item?.sound_blob)
  }
}

export const soundUtil = new SoundUtil()
