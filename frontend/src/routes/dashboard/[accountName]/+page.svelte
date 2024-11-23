<script lang="ts">
  import Settings from './Settings.svelte'
  import Reporting from './Reporting.svelte'

  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte'
  import { ChartPieSolid, ArrowRightToBracketOutline, CogOutline } from 'flowbite-svelte-icons'
  import AppState from '$lib/appState.svelte'
  const accountId = document.location.pathname.split('/').pop()
  if (accountId) AppState.account.load(accountId)

  let tab = $state('reports')
  const setTab = (name: 'reports' | 'settings') => () => (tab = name)

  const logout = async () => {
    await AppState.wallet.disconnect()
    window.location.href = '/'
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)
</script>

<div class="flex">
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Reports" onclick={setTab('reports')}>
          <svelte:fragment slot="icon">
            <ChartPieSolid
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
  {:else}
    <Settings></Settings>
  {/if}
</div>
