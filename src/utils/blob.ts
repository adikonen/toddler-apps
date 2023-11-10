export class BlobUtil {
  async getBlob(url?: string | null | undefined) {
    if (url == undefined) return undefined

    const response = await fetch(url)
    const blob = await response.blob()
    
    return blob
  }

  printBlob(src?: string, blob?: Blob) {
    return blob == undefined ? src : URL.createObjectURL(blob)
  }

}

export const ublob = new BlobUtil