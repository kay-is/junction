<script lang="ts">
  import {
    A,
    Card,
    Heading,
    TabItem,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    Tabs
  } from 'flowbite-svelte'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import * as AppState from '$lib/state/app.svelte'

  const appState = AppState.getContext()

  appState.account.load()
</script>

<div class="flex">
  <Sidebar />
  <div class="container px-10 pt-5">
    <Heading class="mb-5">Settings</Heading>

    <div class="flex flex-row">
      <div>
        <Card class="space-y-4" size="lg">
          <Heading tag="h5">Account</Heading>
          <Table>
            <TableBody>
              <TableBodyRow>
                <TableBodyCell>ID</TableBodyCell>
                <TableBodyCell class="font-mono">
                  <A target="_blank" href="https://www.ao.link/#/entity/{appState.account.id}">
                    {appState.account.id}
                  </A>
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Name</TableBodyCell>
                <TableBodyCell>{appState.account.name}</TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Description</TableBodyCell>
                <TableBodyCell>{appState.account.description}</TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Reports</TableBodyCell>
                <TableBodyCell>
                  {appState.account.reportsArray.map((r) => r.name).join(', ')}
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Members</TableBodyCell>
                <TableBodyCell>
                  {appState.account.membersArray
                    .map((m) => {
                      return m[0] === appState.wallet.address ? `${m[1]} (You)` : m[0]
                    })
                    .join(', ')}
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Registry ID</TableBodyCell>
                <TableBodyCell class="font-mono">
                  <A
                    target="_blank"
                    href="https://www.ao.link/#/entity/{appState.account.registryId}"
                  >
                    {appState.account.registryId}
                  </A>
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Dispatcher ID</TableBodyCell>
                <TableBodyCell class="font-mono">
                  <A
                    target="_blank"
                    href="https://www.ao.link/#/entity/{appState.account.dispatcher?.id}"
                  >
                    {appState.account.dispatcher?.id}
                  </A>
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Memory Usage</TableBodyCell>
                <TableBodyCell>{appState.account.memoryUsage / 1024} MB</TableBodyCell>
              </TableBodyRow>
            </TableBody>
          </Table>
        </Card>
      </div>
      <div>
        <Card class="space-y-4" size="lg">
          <Heading tag="h5">Dispatcher</Heading>
          <Table>
            <TableBody>
              <TableBodyRow>
                <TableBodyCell>ID</TableBodyCell>
                <TableBodyCell class="font-mono">
                  <A
                    target="_blank"
                    href="https://www.ao.link/#/entity/{appState.account.dispatcher.id}"
                  >
                    {appState.account.dispatcher.id}
                  </A>
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Name</TableBodyCell>
                <TableBodyCell>{appState.account.dispatcher.name}</TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Assigned Events</TableBodyCell>
                <TableBodyCell>{appState.account.dispatcher.assignedEventCount}</TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Report IDs</TableBodyCell>
                <TableBodyCell>{appState.account.dispatcher.reportIds.join(', ')}</TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Members</TableBodyCell>
                <TableBodyCell>
                  {appState.account.dispatcher.membersArray
                    .map((m) => `${m[1]} (${m[0]})`)
                    .join(', ')}
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Memory Usage</TableBodyCell>
                <TableBodyCell>{appState.account.dispatcher.memoryUsage / 1024} MB</TableBodyCell>
              </TableBodyRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
    <br />
    <Heading tag="h3">Reports</Heading>
    <Tabs>
      {#each appState.account.reportsArray as report}
        <TabItem open title={report.name}>
          <Table>
            <TableBody>
              <TableBodyRow>
                <TableBodyCell>ID</TableBodyCell>
                <TableBodyCell class="font-mono">
                  <A target="_blank" href="https://www.ao.link/#/entity/{report.id}">
                    {report.id}
                  </A>
                </TableBodyCell>
              </TableBodyRow>
              {#await report.load() then}
                <TableBodyRow>
                  <TableBodyCell>Dispatcher ID</TableBodyCell>
                  <TableBodyCell class="font-mono">
                    <A target="_blank" href="https://www.ao.link/#/entity/{report.dispatcherId}">
                      {report.dispatcherId}
                    </A>
                  </TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                  <TableBodyCell>Processed Events</TableBodyCell>
                  <TableBodyCell>{report.processedEventCount}</TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                  <TableBodyCell>Active Records</TableBodyCell>
                  <TableBodyCell>{report.activeRecords}</TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                  <TableBodyCell>Active Sessions</TableBodyCell>
                  <TableBodyCell>{report.activeSessions}</TableBodyCell>
                </TableBodyRow>
                <TableBodyRow>
                  <TableBodyCell>Memory Usage</TableBodyCell>
                  <TableBodyCell>{report.memoryUsage / 1024} MB</TableBodyCell>
                </TableBodyRow>
              {/await}

              <TableBodyRow>
                <TableBodyCell>Current Records</TableBodyCell>
                <TableBodyCell class="font-mono">
                  <pre>{JSON.stringify(
                      report.currentRecordsArray.filter((r) => Object.keys(r.records).length > 0),
                      null,
                      3
                    )}</pre>
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Reference Records</TableBodyCell>
                <TableBodyCell class="font-mono">
                  <pre>{JSON.stringify(
                      report.referenceRecordsArray.filter((r) => Object.keys(r.records).length > 0),
                      null,
                      3
                    )}</pre>
                </TableBodyCell>
              </TableBodyRow>
            </TableBody>
          </Table>
        </TabItem>
      {/each}
    </Tabs>
  </div>
</div>
