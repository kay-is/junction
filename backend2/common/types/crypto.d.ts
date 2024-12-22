/** @noResolution */
declare module ".crypto" {
  function random(this: void, min: number, max: number, seed?: string): number

  namespace utils {
    type Result = {
      asBytes: (this: void) => unknown[]
      asHex: (this: void) => string
      asString: (this: void) => string
    }

    namespace array {
      type Array = unknown[]
      function fromString(this: void, text: string): Array
      function fromHex(this: void, bytes: string): Array
      function fromStream(this: void, stream: stream.Stream): Array
      function readFromQueue<ItemType>(
        this: void,
        queue: queue.Queue<ItemType>,
        size: number
      ): Array

      function toString(this: void, array: Array): string
      function toHex(this: void, array: Array): string
      function toStream(this: void, array: Array): stream.Stream
      function writeToQueue<ItemType>(
        this: void,
        queue: queue.Queue<ItemType>,
        array: Array
      ): void

      function size(this: void, a: Array): number

      function concat(this: void, a: Array, b: Array): Array
      function truncate(this: void, array: Array, length: number): Array
      function XOR(this: void, a: Array, b: Array): Array
      function substitute(this: void, a: Array, b: Array): Array
      function permute(this: void, a: Array, b: Array): Array
      function copy(this: void, a: Array): Array
      function slice(this: void, a: Array, start: number, end: number): Array
    }

    namespace stream {
      type Stream = {}
      function fromString(this: void, text: string): Stream
      function fromArray(this: void, array: array.Array): Stream
      function fromHex(this: void, hextString: string): Stream

      function toString(this: void, stream: Stream): string
      function toArray(this: void, stream: Stream): array.Array
      function toHex(this: void, stream: Stream): string
    }

    namespace hex {
      function hexToString(this: void, hexString: string): string
      function stringToHex(this: void, text: string): string
    }

    function queue<ItemType>(): queue.Queue<ItemType>
    namespace queue {
      type Queue<ItemType> = {
        push: (this: void, item: ItemType) => void
        pop: (this: void) => ItemType
        size: (this: void) => number
        getHead: (this: void) => number
        getTail: (this: void) => number
        reset: (this: void) => void
      }
    }
  }

  namespace digest {
    function md2(this: void, stream: utils.stream.Stream): utils.Result
    function md4(this: void, stream: utils.stream.Stream): utils.Result
    function md5(this: void, stream: utils.stream.Stream): utils.Result

    function sha1(this: void, stream: utils.stream.Stream): utils.Result
    function sha2_256(this: void, stream: utils.stream.Stream): utils.Result
    function sha2_512(this: void, text: string): utils.Result
    function sha3_256(this: void, text: string): utils.Result

    function keccak256(this: void, text: string): utils.Result
    function keccak512(this: void, text: string): utils.Result

    function blake2b(
      this: void,
      text: string,
      outputLength?: number,
      key?: string
    ): utils.Result
  }

  namespace cipher {
    namespace aes {
      type Mode = "CBC" | "ECB" | "CFB" | "OFB" | "CTR"

      function encrypt(
        this: void,
        plainText: string,
        encryptionKey: string,
        initVector: string,
        mode: Mode,
        keyLength?: number
      ): utils.Result

      function decrypt(
        this: void,
        cipherTextHexString: string,
        encryptionKey: string,
        initVector: string,
        mode: Mode,
        keyLength?: number
      ): utils.Result
    }

    namespace issac {
      function encrypt(
        this: void,
        plainText: string,
        encryptionKey: string
      ): utils.Result

      function decrypt(
        this: void,
        cipherTextHexString: string,
        encryptionKey: string
      ): utils.Result

      function random(
        this: void,
        min: number,
        max: number,
        seed?: string
      ): utils.Result
    }

    namespace morus {
      function encrypt(
        this: void,
        encryptionKey: string,
        initValueOrNonce: string,
        plainText: string,
        additionalData?: string
      ): utils.Result

      function decrypt(
        this: void,
        encryptionKey: string,
        initValueOrNonce: string,
        cipherText: string,
        additionalDataLength?: number
      ): utils.Result
    }

    namespace norx {
      function encrypt(
        this: void,
        encryptionKey: string,
        nonce: string,
        plainText: string,
        header?: string,
        trailer?: string
      ): utils.Result

      function decrypt(
        this: void,
        encryptionKey: string,
        nonce: string,
        cipherText: string,
        additionalData?: string
      ): utils.Result
    }
  }

  type Algorithm = "sha1" | "sha256"

  namespace mac {
    function createHmac(
      this: void,
      stream: utils.stream.Stream,
      key: utils.array.Array,
      algorithm?: Algorithm
    ): utils.Result
  }

  namespace kdf {
    function pbkdf2(
      this: void,
      password: utils.array.Array,
      salt: utils.array.Array,
      iterations: number,
      keylength: number,
      algorithm?: Algorithm
    ): utils.Result
  }
}
