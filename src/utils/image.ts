import type { HasImage } from "@/types";
import { BlobUtil } from "./blob";

class ImageUtil extends BlobUtil {
  readBlob<T extends HasImage>(item?: T) {
    return this.printBlob(item?.image, item?.image_blob)
  }  
}

export const imageUtil = new ImageUtil