local json = require("json")

Name = Name or ao.env.Process.Tags.Name
PaymentAddresses = PaymentAddresses or {
  [ao.env.Process.Tags.Creator] = "AccountCreator"
}
PageCount = PageCount or 1
ImageCount = ImageCount or 0
Pages = Pages or {
  ["page-1"] = {
    Id = "page-1",
    Title = "First Page",
    Description = "My first Junction page.",
    AvatarImageId = 1,
    TemplateId = 1,
    PaymentAddress = "",
    ArnsName = "",
    Undername = "",
    Links = {},
    PublicationTxId = "",
    PublicationTime = 0,
    UpdateTime = 0
  }
}
AvatarImages = AvatarImages or {}
ArnsNames = ArnsNames or {}
Members = Members or {
  [ao.env.Process.Tags.Creator] = "AccountCreator"
}
Analytics = Analytics or {}

function Protected(handler)
  return function(message)
    if message.From ~= Owner and not Members[message.From] then
      return message.reply({ Status = "Error", Error = "Unauthorized" })
    end

    handler(message)
  end
end

Handlers.add("info",
  { Action = "Info" },
  function(message)
    local info = json.encode({
      Name = Name,
      PaymentAddresses = PaymentAddresses,
      Pages = Pages,
      AvatarImages = AvatarImages,
      ArnsNames = ArnsNames,
      Members = Members,
      Analytics = Analytics
    })

    message.reply({ Status = "Success", Data = info })
  end
)

---------- Payment Management ----------

Handlers.add("addPaymentAddress",
  { Action = "Add-Payment-Address" },
  Protected(function(message)
    if not message.Tags.PaymentAddress then
      return message.reply({ Status = "Error", Error = "PaymentAddress is required" })
    end

    if not message.Tags.PaymentAddressName then
      return message.reply({ Status = "Error", Error = "PaymentAddressName is required" })
    end

    PaymentAddresses[message.Tags.PaymentAddress] = message.Tags.PaymentAddressName

    message.reply({ Status = "Success" })
  end)
)

Handlers.add("removePaymentAddress",
  { Action = "Remove-Payment-Address" },
  Protected(function(message)
    if not message.Tags.PaymentAddress then
      return message.reply({ Status = "Error", Error = "PaymentAddress is required" })
    end

    PaymentAddresses[message.Tags.PaymentAddress] = nil

    message.reply({ Status = "Success" })
  end)
)

---------- Page Management ----------

Handlers.add("addPage",
  { Action = "Add-Page" },
  Protected(function(message)
    PageCount = PageCount + 1
    local newPageId = "page-" .. PageCount
    local newPage = {
      Id = newPageId,
      Title = "New Page " .. PageCount,
      Description = "This is a new page.",
      AvatarImageId = 1,
      TemplateId = 1,
      PaymentAddress = "",
      ArnsName = "",
      Undername = "",
      Links = {},
      PublicationTxId = "",
      PublicationTime = 0,
      UpdateTime = 0
    }

    Pages[newPageId] = newPage

    message.reply({ Status = "Success", Data = json.encode(newPage) })
  end)
)

Handlers.add("updatePage",
  { Action = "Update-Page" },
  Protected(function(message)
    if not message.Tags.PageId then
      return message.reply({ Status = "Error", Error = "PageId is required" })
    end

    if not Pages[message.Tags.PageId] then
      return message.reply({ Status = "Error", Error = "Page not found" })
    end

    local newPageVersion = json.decode(message.Data)

    Pages[message.Tags.PageId] = newPageVersion

    message.reply({ Status = "Success", Data = json.encode(Pages[message.Tags.PageId]) })
  end)
)

Handlers.add("removePage",
  { Action = "Remove-Page" },
  Protected(function(message)
    if not message.Tags.PageId then
      return message.reply({ Status = "Error", Error = "PageId is required" })
    end

    Pages[message.Tags.PageId] = nil

    message.reply({ Status = "Success" })
  end)
)

---------- Avatar Image Management ----------

Handlers.add("addAvatarImage",
  { Action = "Add-Avatar-Image" },
  Protected(function(message)
    if not message.Tags.AvatarImageTitle then
      return message.reply({ Status = "Error", Error = "AvatarImageTitle is required" })
    end

    if not message.Tags.AvatarImageTxId then
      return message.reply({ Status = "Error", Error = "AvatarImageTxId is required" })
    end

    ImageCount = ImageCount + 1
    local newAvatarImage = {
      Id = "avatar-image-" .. ImageCount,
      Title = message.Tags.AvatarImageTitle,
      TxId = message.Tags.AvatarImageTxId
    }

    AvatarImages[newAvatarImage.Id] = newAvatarImage

    message.reply({ Status = "Success", Data = json.encode(newAvatarImage) })
  end)
)

Handlers.add("removeAvatarImage",
  { Action = "Remove-Avatar-Image" },
  Protected(function(message)
    if not message.Tags.AvatarImageId then
      return message.reply({ Status = "Error", Error = "AvatarImageId is required" })
    end

    AvatarImages[message.Tags.AvatarImageId] = nil

    message.reply({ Status = "Success" })
  end)
)

---------- ArNS Management ----------

Handlers.add("addArnsName",
  { Action = "Add-Arns-Name" },
  Protected(function(message)
    if not message.Tags.ArnsName then
      return message.reply({ Status = "Error", Error = "ArnsName is required" })
    end

    if not message.Tags.AntAddress then
      return message.reply({ Status = "Error", Error = "AntAddress is required" })
    end

    ArnsNames[message.Tags.ArnsName] = message.Tags.AntAddress

    message.reply({ Status = "Success" })
  end)
)

Handlers.add("removeArnsName",
  { Action = "Remove-Arns-Name" },
  Protected(function(message)
    if not message.Tags.ArnsName then
      return message.reply({ Status = "Error", Error = "ArnsName is required" })
    end

    ArnsNames[message.Tags.ArnsName] = nil

    message.reply({ Status = "Success" })
  end)
)
---------- Member Management ----------

Handlers.add("addMember",
  { Action = "Add-Member" },
  Protected(function(message)
    if not message.Tags.MemberName then
      return message.reply({ Status = "Error", Error = "MemberName is required" })
    end

    if not message.Tags.MemberAddress then
      return message.reply({ Status = "Error", Error = "MemberAddress is required" })
    end

    Members[message.Tags.MemberAddress] = message.Tags.MemberName

    message.reply({ Status = "Success" })
  end)
)

Handlers.add("removeMember",
  { Action = "Remove-Member" },
  Protected(function(message)
    if not message.Tags.MemberAddress then
      return message.reply({ Status = "Error", Error = "MemberAddress is required" })
    end

    Members[message.Tags.MemberAddress] = nil

    message.reply({ Status = "Success" })
  end)
)


---------- Analytics Management ----------

Handlers.add("track",
  { Action = "Track" },
  function(message)
    if not message.Tags.Operation then
      return message.reply({ Status = "Error", Error = "Operation is required" })
    end

    if not message.Tags.Element then
      return message.reply({ Status = "Error", Error = "Element is required" })
    end

    if not message.Tags.Value then
      return message.reply({ Status = "Error", Error = "Value is required" })
    end

    if not message.Tags.PageId then
      return message.reply({ Status = "Error", Error = "PageId is required" })
    end

    if not Pages[message.Tags.PageId] and not Analytics[message.Tags.PageId] then
      return message.reply({ Status = "Error", Error = "Page not found" })
    end

    if not Analytics[message.Tags.PageId] then
      Analytics[message.Tags.PageId] = {}
    end

    if not Analytics[message.Tags.PageId][message.Tags.Element] then
      Analytics[message.Tags.PageId][message.Tags.Element] = {}
    end

    if not Analytics[message.Tags.PageId][message.Tags.Element][message.Tags.Operation] then
      Analytics[message.Tags.PageId][message.Tags.Element][message.Tags.Operation] = 0
    end

    Analytics[message.Tags.PageId][message.Tags.Element][message.Tags.Operation] = Analytics[message.Tags.PageId]
        [message.Tags.Element][message.Tags.Operation] + tonumber(message.Tags.Value)
  end
)

Send({ Target = Owner, Action = "Account-Ready", Status = "Success" })
