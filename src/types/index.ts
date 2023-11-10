import type { LocaleCode } from "@/services/locale.service"

export type HasImage = {
  image: string,
  image_blob?: Blob
}

export type HasSound = {
  sound: string,
  sound_blob: Blob
}

export interface InteractionWithLocales {
  getAll(localeCode: any): Promise<any>
  findByPk(value: any, localeCode?: LocaleCode): Promise<any>
  filter(cb: (item: any, index?: number) => boolean, localeCode?: LocaleCode): Promise<any>
}