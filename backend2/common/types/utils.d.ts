/** @noResolution */
declare module ".utils" {
  function concat<InputType>(
    this: void,
    a: InputType[],
    b: InputType[]
  ): InputType[]

  function reduce<InputType, ReturnType>(
    this: void,
    fn: (this: void, accumulator: ReturnType, value: InputType) => ReturnType,
    initial: ReturnType,
    data: InputType[]
  ): ReturnType

  function map<InputType, ReturnType>(
    this: void,
    fn: (this: void, value: InputType, key?: number) => ReturnType,
    data: InputType[]
  ): ReturnType[]

  function filter<InputType>(
    this: void,
    fn: (this: void, value: InputType) => boolean,
    data: InputType[]
  ): InputType[]

  function find<InputType>(
    this: void,
    fn: (this: void, value: InputType) => boolean,
    data: InputType[]
  ): InputType | undefined

  function reverse<InputType>(this: void, data: InputType[]): InputType[]

  function includes<InputType>(
    this: void,
    needle: InputType,
    data: InputType[]
  ): boolean

  function keys<KeyType extends string | number | symbol>(
    this: void,
    data: Record<KeyType, unknown>
  ): KeyType[]

  function values<ValueType>(
    this: void,
    data: Record<string, ValueType>
  ): ValueType[]

  function propEq(
    this: void,
    key: string,
    value: unknown,
    data: Record<string, unknown>
  ): boolean

  function prop<ValueType>(
    this: void,
    key: string,
    data: Record<string, ValueType>
  ): ValueType | undefined

  function compose<ReturnType>(
    this: void,
    ...fns: Function[]
  ): (this: void, data: Record<string, unknown> | unknown[]) => ReturnType
}
