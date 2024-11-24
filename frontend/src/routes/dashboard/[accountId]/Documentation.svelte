<script lang="ts">
  import { Heading, Li, List, P, Textarea } from 'flowbite-svelte'

  import AppState from '$lib/appState.svelte'
  const accountId = document.location.pathname.split('/').pop()
  if (accountId) AppState.account.load(accountId)

  let trackingScript = $state(
    `<script
  type="module"
  src="https://junction.ar.io/sdk/browser.js"
  data-dispatcher-id="${AppState.account.dispatcherId}">
</` + 'script>' // Svelte won't allow closing script tags in a string?!
  )
</script>

<div class="mb-40 max-w-3xl pt-5">
  <Heading class="mb-4">Documentation</Heading>
  <P class="lg mb-4">
    Here you can learn how to set up tracking for your website with Junction and how it all works in
    the backgroun.
  </P>
  <Heading tag="h2" class="mb-4">Including the Tracking Script</Heading>
  <P class="lg mb-4">
    To start tracking, you must include the tracking script with the dispatcher ID of your account
    into every page of your website.
  </P>
  <Textarea value={trackingScript} style="height: 125px" class="font-mono" />
  <P class="lg my-4">
    You can pass the following options via data attributes. Both are disabled by default.
  </P>
  <List>
    <Li>
      <code>data-debug="true"</code>
      will log tracking information in the browser console.
    </Li>
    <Li
      ><code>data-track-url-hashes="true"</code>
      will track changes to the URL hash.
    </Li>
  </List>
  <P class="lg my-4">Junction requires HTTPS to work.</P>
  <Heading tag="h2" class="my-4">How the Tracking Works</Heading>
  <P class="lg mb-4">
    The tracking script will generate a random Arweave wallet on the first visit and store it inside <code
      >localStorage</code
    > for subsequent visits. The script use this wallet to sign the tracking messages it sends to your
    accounts dispatcher AO process.
  </P>
  <P class="lg mb-4">
    The dispatcher process assigns the messages to the report processes, which, in turn, calculate
    records with the website metrics. The records have a granularity of one hour, meaning all events
    are aggregated to the hour they occurred.
  </P>
  <P class="lg mb-4">
    The dashboard will load the records via a dryrun from the report processes and display them. It
    also fills in hours without records with zeros.
  </P>
  <Heading tag="h2" class="my-4">Available Reports</Heading>
  <P class="lg mb-4">
    The overall report includes page views, visitors, and Web3 visitors. The Web3 visitors are users
    with an installed Arweave, Ethereum, or Solana wallet.
  </P>
  <P class="lg mb-4">
    The top pages report includes page views, visitors, Web3 visitors, load time, and bounce rate.
  </P>
  <P class="lg mb-4">Both report views are using the same AO process.</P>
  <Heading tag="h2" class="my-4">Tracked Data</Heading>
  <P class="lg mb-4">The tracking script will send the following data to the dispatcher process:</P>
  <List>
    <Li>Timestamp</Li>
    <Li>Event name</Li>
    <Li>Arweave wallet address (randomly generated)</Li>
    <Li>URL</Li>
    <Li>User Agent</Li>
    <Li>Language</Li>
    <Li>Timezone</Li>
    <Li>Page Load Time</Li>
    <Li>
      Installed Arweave wallet (address not used for tracking)
      <List class="ml-5">
        <Li>Name</Li>
        <Li>Version</Li>
        <Li>Connection</Li>
      </List>
    </Li>
    <Li>
      Installed Ethereum wallet (address not used for tracking)
      <List class="ml-5">
        <Li>Name</Li>
        <Li>Connection</Li>
        <Li>Chain ID</Li>
      </List>
    </Li>
    <Li>
      Installed Solana wallet (address not used for tracking)
      <List class="ml-5">
        <Li>Name</Li>
        <Li>Connection</Li>
      </List>
    </Li>
  </List>
</div>
