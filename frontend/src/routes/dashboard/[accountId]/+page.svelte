<script lang="ts">
  import Reporting from './Reporting.svelte'
  import Documentation from './Documentation.svelte'
  import Settings from './Settings.svelte'

  import {
    Button,
    ButtonGroup,
    Heading,
    Input,
    P,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte'
  import {
    ArrowRightToBracketOutline,
    CogOutline,
    BookOutline,
    UsersOutline,
    ChartMixedOutline
  } from 'flowbite-svelte-icons'
  import AppState from '$lib/appState.svelte'
  const accountId = document.location.pathname.split('/').pop()
  if (accountId) AppState.account.load(accountId)

  let tab = $state('reports')
  const setTab = (name: 'reports' | 'settings' | 'docs' | 'members') => () => (tab = name)

  const logout = async () => {
    await AppState.wallet.disconnect()
    window.location.href = '/'
  }

  let memberName = $state('')
  let memberAddress = $state('')
  const addMember = async (event: Event) => {
    event.preventDefault()
    AppState.account.members[memberAddress] = memberName
    memberName = ''
    memberAddress = ''
    await AppState.account.save()
  }
  const removeMember = (address: string) => async () => {
    if (!confirm('Do you really want to remove this member?')) return
    delete AppState.account.members[address]
    await AppState.account.save()
  }
</script>

<div class="flex">
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Reports" onclick={setTab('reports')}>
          <svelte:fragment slot="icon">
            <ChartMixedOutline
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>

        <SidebarItem label="Members" onclick={setTab('members')}>
          <svelte:fragment slot="icon">
            <UsersOutline
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>

        <SidebarItem label="Docs" onclick={setTab('docs')}>
          <svelte:fragment slot="icon">
            <BookOutline
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>

        <SidebarItem label="Settings" onclick={setTab('settings')}>
          <svelte:fragment slot="icon">
            <CogOutline
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>

        <SidebarItem label="Sign Out" onclick={logout}>
          <svelte:fragment slot="icon">
            <ArrowRightToBracketOutline
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>

  {#if tab === 'reports'}
    <Reporting></Reporting>
  {:else if tab === 'docs'}
    <Documentation></Documentation>
  {:else if tab === 'members'}
    <div class="w-full p-5">
      <Heading class="mb-4">Members</Heading>
      <P class="mb-4">
        These are the wallet addresses that can modify your account, they will see this account when
        logging in.
      </P>

      <form onsubmit={addMember}>
        <ButtonGroup class="w-full">
          <Input bind:value={memberName} required size="lg" placeholder="Enter name..." />
          <Input
            bind:value={memberAddress}
            required
            size="lg"
            placeholder="Enter Arweave address..."
            class="font-mono"
          />
          <Button type="submit" size="lg" color="primary">Add&nbsp;Member</Button>
        </ButtonGroup>
      </form>
      <Table striped>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Address</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each Object.entries(AppState.account.members) as [address, name]}
            <TableBodyRow>
              <TableBodyCell>{name}</TableBodyCell>
              <TableBodyCell class="font-mono">{address}</TableBodyCell>
              <TableBodyCell>
                <Button
                  onclick={removeMember(address)}
                  color="red"
                  disabled={Object.entries(AppState.account.members).length === 1}
                >
                  Remove
                </Button>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  {:else}
    <Settings></Settings>
  {/if}
</div>
