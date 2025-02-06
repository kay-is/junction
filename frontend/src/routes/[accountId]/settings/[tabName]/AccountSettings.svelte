<script lang="ts">
  import {
    A,
    Button,
    Card,
    Heading,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow
  } from 'flowbite-svelte'
  import type { Account } from '$lib/state/account.svelte'
  import type { CodeRegistry } from '$lib/state/codeRegistry.svelte'
  import { Wallet } from '$lib/state/wallet.svelte'
  import { appState } from '$lib/state/app.svelte'

  type AccountSettingsProps = {
    account: Account
    codeRegistry: CodeRegistry
    wallet: Wallet
  }
  const props: AccountSettingsProps = $props()

  const updateAccount = async () => {
    await props.account.updateProcess(props.codeRegistry.codeTxIds.account)
  }

  const updateDispatcher = async () => {
    await props.account.dispatcher.updateProcess(props.codeRegistry.codeTxIds.dispatcher)
  }
</script>

<div class="flex flex-row">
  <Card class="space-y-4" size="lg">
    <Heading tag="h5">
      Account
      {#if props.account.loading}<Spinner size="6" />{/if}
    </Heading>
    {#if props.account.codeTxId === props.codeRegistry.codeTxIds.account}
      Account is up to date.
    {:else}
      <Button size="sm" onclick={updateAccount} disabled={props.account.loading}>
        Update Account
      </Button>
    {/if}
    <Table>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell>ID</TableBodyCell>
          <TableBodyCell class="font-mono">
            <A target="_blank" href="https://www.ao.link/#/entity/{props.account.id}">
              {props.account.id}
            </A>
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Name</TableBodyCell>
          <TableBodyCell>{props.account.name}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Description</TableBodyCell>
          <TableBodyCell>{props.account.description}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Reports ({props.account.reportsArray.length})</TableBodyCell>
          <TableBodyCell>
            {props.account.reportsArray.map((r) => r.name.split('-')[0]).join(', ')}
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Members ({props.account.membersArray.length})</TableBodyCell>
          <TableBodyCell>
            {props.account.membersArray
              .map((m) => (m[0] === props.wallet.address ? `${m[1]} (You)` : m[0]))
              .join(', ')}
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Registry ID</TableBodyCell>
          <TableBodyCell class="font-mono">
            <A target="_blank" href="https://www.ao.link/#/entity/{props.account.registryId}">
              {props.account.registryId}
            </A>
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Dispatcher ID</TableBodyCell>
          <TableBodyCell class="font-mono">
            <A target="_blank" href="https://www.ao.link/#/entity/{props.account.dispatcher?.id}">
              {props.account.dispatcher?.id}
            </A>
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Memory Usage</TableBodyCell>
          <TableBodyCell>{props.account.memoryUsage / 1024} MB</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  </Card>

  <Card class="space-y-4" size="lg">
    <Heading tag="h5">
      Dispatcher
      {#if props.account.dispatcher.loading}<Spinner size="6" />{/if}
    </Heading>
    {#if props.account.dispatcher.codeTxId === props.codeRegistry.codeTxIds.dispatcher}
      Dispatcher is up to date.
    {:else}
      <Button size="sm" onclick={updateDispatcher} disabled={props.account.loading}
        >Update Dispatcher</Button
      >
    {/if}
    <Table>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell>ID</TableBodyCell>
          <TableBodyCell class="font-mono">
            <A target="_blank" href="https://www.ao.link/#/entity/{props.account.dispatcher.id}">
              {props.account.dispatcher.id}
            </A>
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Name</TableBodyCell>
          <TableBodyCell>{props.account.dispatcher.name}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Received Events</TableBodyCell>
          <TableBodyCell>{props.account.dispatcher.receivedEventCount}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Report IDs ({props.account.dispatcher.reportIds.length})</TableBodyCell>
          <TableBodyCell>{props.account.dispatcher.reportIds.join(', ')}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Members ({props.account.dispatcher.membersArray.length})</TableBodyCell>
          <TableBodyCell>
            {props.account.dispatcher.membersArray.map((m) =>
              m[0] === props.wallet.address ? `${m[1]} (You)` : m[0]
            )}
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Memory Usage</TableBodyCell>
          <TableBodyCell>{props.account.dispatcher.memoryUsage / 1024} MB</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  </Card>
</div>
