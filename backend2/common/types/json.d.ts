/** @noResolution */
declare module "json" {
  function decode<ReturnType>(this: void, jsonString: string): ReturnType
  function encode(this: void, data: unknown): string
}
