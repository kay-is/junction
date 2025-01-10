<script lang="ts">
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte'
  import {
    ArrowRightToBracketOutline,
    BookOutline,
    CogOutline,
    ChartMixedOutline
  } from 'flowbite-svelte-icons'
  import { page } from '$app/state'
  import AppState from '$lib/state/app.svelte'

  const logout = async () => {
    await AppState.wallet.disconnect()
    window.location.href = '/'
  }
</script>

<div class="flex">
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Overview" href="/dashboard/{page.params.accountId}">
          <svelte:fragment slot="icon">
            <ChartMixedOutline
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem label="Documentation" href="/docs/{page.params.accountId}">
          <svelte:fragment slot="icon">
            <BookOutline
              class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>

        <SidebarItem label="Settings" href="/settings/{page.params.accountId}">
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
</div>
