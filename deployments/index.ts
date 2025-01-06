import * as pulumi from "@pulumi/pulumi"
import * as ao from "@ao-tools/pulumi-ao"

const stackName = pulumi.getStack()

// ---- Code for user owned processes ----

const accountCode = new ao.ProcessCode("account-code", {
  name: `account-code-${stackName}`,
  filePath: "../backend/build/account.lua",
})

const dispatcherCode = new ao.ProcessCode("dispatcher-code", {
  name: `dispatcher-code-${stackName}`,
  filePath: "../backend/build/dispatcher.lua",
})

const topPagesReportCode = new ao.ProcessCode("top-pages-report-code", {
  name: `top-pages-report-code-${stackName}`,
  filePath: "../backend/build/top-pages-report.lua",
})

// ---- Code for protected proceesses----

const codeRegistryCode = new ao.ProcessCode("code-registry-code", {
  name: `code-registry-code-${stackName}`,
  filePath: "../backend/build/code-registry.lua",
})
const codeRegistryProcess = new ao.Process("code-registry-process", {
  name: `code-registry-process-${stackName}`,
  codeId: codeRegistryCode.id,
  environment: {
    accountCodeId: accountCode.id,
    dispatcherCodeId: dispatcherCode.id,
    topPagesReportCodeId: topPagesReportCode.id,
  },
})
export const codeRegistryProcessId = codeRegistryProcess.id
export const codeRegistryAoLinkUrl = pulumi.interpolate`https://ao.link/#/entity/${codeRegistryProcess.id}`

// ---- REGISTRY ----

const registryCode = new ao.ProcessCode("registry-code", {
  name: `registry-code-${stackName}`,
  filePath: "../backend/build/registry.lua",
})
const registryProcess = new ao.Process("registry-process", {
  name: `registry-process-${stackName}`,
  codeId: registryCode.id,
})
export const registryProcessId = registryProcess.id
export const registryAoLinkUrl = pulumi.interpolate`https://ao.link/#/entity/${registryProcess.id}`
