<script lang="ts">
  import { Heading, Spinner, TabItem, Tabs } from 'flowbite-svelte'

  import { pushState } from '$app/navigation'
  import { page } from '$app/state'

  import Sidebar from '../../../Sidebar.svelte'
  import * as AppState from '$lib/state/app.svelte'

  import AccountSettings from './AccountSettings.svelte'
  import ReportSettings from './ReportSettings.svelte'
  import AvailableReports from './AvailableReports.svelte'

  const appState = AppState.getContext()

  appState.codeRegistry.load()
  appState.account.load()
</script>

<div class="flex">
  <Sidebar />
  <div class="container px-10 pt-5">
    <Heading class="mb-5"
      >Settings {#if appState.account.loading || appState.codeRegistry.loading}<Spinner
        />{/if}</Heading
    >
    <Tabs tabStyle="full" defaultClass="flex">
      <TabItem
        class="w-full"
        open={page.params.tabName === 'account'}
        title="Account"
        onclick={(e) => pushState('account')}
      >
        <AccountSettings {...appState} />
      </TabItem>

      <TabItem
        class="w-full"
        open={page.params.tabName === 'reports'}
        title="Deployed Reports ({appState.account.reportsArray.length})"
        onclick={(e) => pushState('reports')}
      >
        <ReportSettings {...appState} />
      </TabItem>

      <TabItem
        class="w-full"
        open={page.params.tabName === 'available-reports'}
        title="Available Reports ({appState.codeRegistry.codeTxIdArray.length})"
        onclick={(e) => pushState('available-reports')}
      >
        <AvailableReports {...appState} />
      </TabItem>
    </Tabs>
  </div>
</div>
