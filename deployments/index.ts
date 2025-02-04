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

const reportBrowsersCode = new ao.ProcessCode("report-browsers-code", {
  name: `report-browsers-code-${stackName}`,
  filePath: "../backend/build/report-browsers.lua",
})

const reportDevicesCode = new ao.ProcessCode("report-devices-code", {
  name: `report-devices-code-${stackName}`,
  filePath: "../backend/build/report-devices.lua",
})

const reportGatewaysCode = new ao.ProcessCode("report-gateways-code", {
  name: `report-gateways-code-${stackName}`,
  filePath: "../backend/build/report-gateways.lua",
})
const reportNetworksCode = new ao.ProcessCode("report-networks-code", {
  name: `report-networks-code-${stackName}`,
  filePath: "../backend/build/report-networks.lua",
})
const reeportTopPagesCode = new ao.ProcessCode("report-pages-code", {
  name: `report-pages-code-${stackName}`,
  filePath: "../backend/build/report-pages.lua",
})
const reportWalletsCode = new ao.ProcessCode("report-wallets-code", {
  name: `report-wallets-code-${stackName}`,
  filePath: "../backend/build/report-wallets.lua",
})

// ---- Code for protected processes----

const codeRegistryCode = new ao.ProcessCode("code-registry-code", {
  name: `code-registry-code-${stackName}`,
  filePath: "../backend/build/code-registry.lua",
})
const codeRegistryProcess = new ao.Process("code-registry-process", {
  name: `code-registry-process-${stackName}`,
  codeId: codeRegistryCode.id,
  environment: {
    account: accountCode.id,
    dispatcher: dispatcherCode.id,
    browsers: reportBrowsersCode.id,
    devices: reportDevicesCode.id,
    gateways: reportGatewaysCode.id,
    networks: reportNetworksCode.id,
    pages: reeportTopPagesCode.id,
    wallets: reportWalletsCode.id,
  },
})
export const codeRegistryProcessId = codeRegistryProcess.id
export const codeRegistryAoLinkUrl = pulumi.interpolate`https://ao.link/#/entity/${codeRegistryProcess.id}`

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
