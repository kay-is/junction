global record ReplyMessage 
  Data: string | nil 
  Tags:  {string: string} | nil
end

global record SendMessage 
  Target: string 
  Data: string | nil 
  Tags:  {string: string} | nil
end

global record ReceivedMessage
  Id: string
  From: string
  Target: string
  Tags: { string: string }
  Data: string
  Owner: string
  Reference: string
  reply: function(reply: ReplyMessage)
  forward: function(target: string, message: ReplyMessage)
end

global record Receiver
  receive: function(): ReceivedMessage
  onReply: function(callback: function(message: ReceivedMessage))
end

global record SpawnConfig 
  ["On-Boot"]: string
  ["Memory-Limit"]: string | nil 
  ["Compute-Limit"]: string | nil
  Tags: { string: string } | nil 
  Data: string | nil
end
global record SpawnReply
  Process: string
end
global record SpawnReceiver
  receive: function(): SpawnReply
  onReply: function(callback: function(message: SpawnReply))
end
global type Spawn = function(moduleId: string, config: SpawnConfig): SpawnReceiver
global type Send = function(message: SendMessage): Receiver
global type Receive = function(Matcher): ReceivedMessage

global type ActionMather = string 
global type TagMatcher = {string:string}
global type MatchFunction = function(message: ReceivedMessage): boolean
global type Matcher = ActionMather | TagMatcher | MatchFunction

global type MessageHandler = function(message: ReceivedMessage)

global record Handler 
  name: string 
  handle: function 
  pattern: Matcher
  maxRuns: integer | nil
end

global record Handlers
  add: function(name: string, matcher: Matcher, handler: MessageHandler)
  once: function(matcher: Matcher, handler: MessageHandler)
  remove: function(name: string)
  list: {Handler}
end

global record os 
  time: integer
end

global record Assignment
  Processes: {string}
  Message: string
end

global record ao
  id: string
  authorities: {string}
  addAssignable: function(name: string, tags: {string: string})
  removeAssignable: function(name: string)
  assign: function(assignment: Assignment)
  send: Send
  spawn: Spawn
  record env
    record Module
      Id: string
      Owneer: string 
      Tags: { string: string }
    end
    record Process
      Id: string
      Owner: string
      Tags: { string: string }
    end
  end
end

global Owner: string