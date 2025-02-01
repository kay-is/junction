<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte'
  import { Heading, P } from 'flowbite-svelte'
</script>

<div class="flex">
  <Sidebar />
  <div class="max-w-3xl p-8">
    <Heading class="mb-4">Documentation</Heading>

    <Heading tag="h2">HTML Implementation</Heading>
    <P>Add this script tag to your HTML head:</P>
    <pre class="my-4">
      <code>{`<scrip${''}t src="https://junction.ar.io/libs/tracker.js" defer></script>`}</code>
    </pre>
  </div>
</div>
