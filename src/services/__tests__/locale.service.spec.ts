import { describe, expect, test } from "vitest";
import { localeService } from "../locale.service";

describe('locale service tests', () => {
  test('defined', () => {
    expect(localeService).toBeDefined()
  })
})