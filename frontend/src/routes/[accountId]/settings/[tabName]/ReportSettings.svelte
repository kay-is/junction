<script lang="ts">
  import {
    Heading,
    Tabs,
    TabItem,
    Table,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    A,
    P,
    Spinner
  } from 'flowbite-svelte'
  import type { Account } from '$lib/state/account.svelte'

  type ReportSettingsProps = {
    account: Account
  }

  const props: ReportSettingsProps = $props()
</script>

<Heading tag="h3">Deployed Reports</Heading>
<Tabs>
  {#each props.account.reportsArray as report}
    <TabItem open>
      <P slot="title">
        {report.name}&nbsp;
        {#if report.loading}<Spinner size={5} />{/if}
      </P>
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
  {:else}
    <P>No reports deployed to this account.</P>
  {/each}
</Tabs>
