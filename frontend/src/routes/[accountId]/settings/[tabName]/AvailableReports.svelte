<script lang="ts">
  import type { Account } from '$lib/state/account.svelte'
  import type { CodeRegistry } from '$lib/state/codeRegistry.svelte'
  import {
    Heading,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Button
  } from 'flowbite-svelte'

  type AvailableReportsProps = {
    account: Account
    codeRegistry: CodeRegistry
  }
  const props: AvailableReportsProps = $props()

  const deployReport = (reportName: string) => async () => {
    await props.account.addReport(reportName)
    alert('Report deployed: ' + reportName)
  }

  const updateReport = (reportName: string) => async () => {}
</script>

<Heading tag="h3">Available Reports</Heading>
<Table>
  <TableHead>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Action</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each props.codeRegistry.codeTxIdArray.filter((c) => c.name.includes('report')) as report}
      <TableBodyRow>
        <TableBodyCell>{report.name.split('-')[1]}</TableBodyCell>
        <TableBodyCell>
          {#if !!props.account.reports[report.name]}
            {#if props.account.reports[report.name].codeTxId === props.codeRegistry.codeTxIds[report.name]}
              Deployed and up to date.
            {:else}
              <Button
                size="sm"
                onclick={updateReport(report.name)}
                disabled={props.account.loading}
              >
                Update
              </Button>
            {/if}
          {:else}
            <Button size="sm" onclick={deployReport(report.name)} disabled={props.account.loading}>
              Deploy
            </Button>
          {/if}
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
