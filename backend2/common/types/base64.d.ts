/** @noResolution */
declare module ".base64" {
  type Base64String = string

  function decode<ReturnType>(
    this: void,
    base64string: string,
    decoder?: Record<string, unknown>,
    usecache?: boolean
  ): ReturnType
  function encode(
    this: void,
    data: unknown,
    encoder?: Record<string, unknown>,
    usecache?: boolean
  ): string

  function makeencoder(
    this: void,
    s62?: string,
    s63?: string,
    spad?: string
  ): Record<string, unknown>

  function makedecoder(
    this: void,
    s62?: string,
    s63?: string,
    spad?: string
  ): Record<string, unknown>
}
