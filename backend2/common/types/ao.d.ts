/**
 * The primary interface of the AO runtime.
 */
declare const ao: ao.Ao

/**
 * The name of the process.
 */
declare let Name: string

/**
 * The wallet address of the process owner.
 */
declare let Owner: string

/**
 * A list of errors that occurred.
 */
declare let Errors: string[]

/**
 * Unhandled messages this process received.
 */
declare let Inbox: ao.message.Received[]

/**
 * Contains the CLI colors of the process.
 */
declare let Colors: Record<string, string>
declare const Seeded: boolean

/**
 * Returns the AOS version.
 */
declare function Version(): string

/**
 * Returns the currently configured prompt of the process.
 *
 * Can be overridden for customization.
 */
declare function Prompt(): string

/**
 * Returns a message that was a reply to a message this process sent.
 *
 * Uses Lua co-routines to wait for the reply.
 */
declare function Receive(pattern: ao.handlers.Pattern): ao.message.Received

/**
 * Converts the tag array of a message to a key-value object.
 */
declare function Tab(message: ao.message.Received): Record<string, string>

/**
 * Manages process' message handlers.
 */
declare const Handlers: ao.handlers.Handlers

/**
 * Types for the global objects and functions provided by the AO runtime.
 */
declare namespace ao {
  type Tag = { name: string; value: string }
  type TagsObject = Record<string, string>

  namespace message {
    type Spawn =
      | {
          "On-Boot"?: string | "data"
          "Memory-Limit"?: string
          "Compute-Limit"?: string
          Data?: string
          Tags?: TagsObject
        }
      | Record<string, string>

    type Reply =
      | {
          Data?: string
          Action?: string
          Tags?: TagsObject
        }
      | Record<string, string>

    type Send =
      | {
          Target: string
          Data?: string
          Action?: string
          Tags?: TagsObject
        }
      | Record<string, string>

    type Processed = Readonly<{
      Cron: boolean
      Data: string
      Epoch: number
      From: string
      Id: string
      Nonce: number
      Owner: string
      Signature: string
      Tags: {
        Type: string
        Variant: string
        "Data-Protocol": string
        "From-Module": string
        "From-Process": string
        [tag: string]: string
      }
      Target: string
      Timestamp: number
      "Block-Height": number
      "Forwarded-By": string
      "Hash-Chain": string
      reply: (this: void, message: Reply) => void
    }>

    type Received = Processed

    type Outbox = {
      Target: string
      Anchor: string
      Data?: string
      Tags: Tag[]
    }
  }

  type Assignable = {
    name: string
    pattern: handlers.Pattern
  }

  type Assignment = {
    Processes: string[]
    Message: string
  }

  type Ao = {
    _version: string
    _module: string
    id: string
    assignables: Assignable[]
    nonForwardableTags: string[]
    nonExtractableTags: string[]
    reference: number
    authorities: string[]
    outbox: {
      Assignments: Assignment[]
      Messages: message.Outbox[]
      Spawns: message.Outbox[]
      Error?: string
      Output: {
        data: string
        prompt: string
        print: boolean
      }
    }
    env: {
      Module: {
        Owner: string
        Id: string
        Tags: Tag[]
      }
      Process: {
        Owner: string
        Id: string
        Tags: TagsObject
      }
    }

    /**
     * Logs a message to the AO runtime log.
     */
    log: (this: void, text: unknown) => void

    /**
     * Sends a message to an AO process.
     */
    send: (this: void, message: message.Send) => message.Processed

    /**
     * Starts a new AO process owned by the current process.
     */
    spawn: (
      this: void,
      moduleId: string,
      initialMessage: message.Spawn
    ) => message.Processed

    /**
     * Assigns a message to a process.
     *
     * Similar to `ao.send`, but the message isn't copied and won't change the
     * `From` field.
     */
    assign: (
      this: void,
      assignment: { Processes: string[]; Message: string }
    ) => void

    /**
     * Allows other processes to assign messages with specific tags to this
     * process.
     */
    addAssignable: (this: void, name: string, tags: TagsObject) => void
    isAssignable: (this: void, message: message.Processed) => boolean

    /**
     * Checks if a message was assinged instead of sent.
     */
    isAssignment: (this: void, message: message.Processed) => boolean
    removeAssignable: (this: void, name: string) => void
    /**
     * Checks if a message came from a SU in the `ao.authorities` list.
     */
    isTrusted: (this: void, message: message.Processed) => boolean
    clearOutbox: (this: void) => void
  }

  namespace handlers {
    type Handler = (
      this: void,
      message: message.Received,
      environment?: ao.Ao["env"]
    ) => void
    type Pattern =
      | string
      | Record<string, string | ((message: message.Received) => boolean)>
    type HandlerSetter = (
      this: void,
      name: string,
      pattern: Pattern,
      handler: Handler,
      maxRuns?: number
    ) => void
    type Handlers = {
      add: HandlerSetter
      append: HandlerSetter
      once: HandlerSetter
      prepend: HandlerSetter
      before: (this: void, name: string) => { add: HandlerSetter }
      after: (this: void, name: string) => { add: HandlerSetter }
      remove: (this: void, name: string) => void
    }
  }
}
