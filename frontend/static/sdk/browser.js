import { Junction } from './junction.js'

const start = Date.now()

async function main() {
  const scriptTag = document.querySelector('script[data-dispatcher-id]')
  const dispatcherId = scriptTag.getAttribute('data-dispatcher-id')

  if (!dispatcherId) throw new Error('[Junction] Script tag missing data-dispatcher-id attribute')

  const trackUrlHashes = scriptTag.getAttribute('data-track-url-hashes') === 'true'
  const debug = scriptTag.getAttribute('data-debug') === 'true'

  const junction = await Junction.initialize({ dispatcherId, trackUrlHashes, debug })

  window.addEventListener('load', () => junction.page({ lt: Date.now() - start }))
  window.addEventListener('popstate', () => junction.page({ lt: 0 }))
  window.addEventListener('pushState', () => junction.page({ lt: 0 }))
  window.addEventListener('replaceState', () => junction.page({ lt: 0 }))
  if (trackUrlHashes) window.addEventListener('hashchange', () => junction.page({ lt: 0 }))
}

main()
