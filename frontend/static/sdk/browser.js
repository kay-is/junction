import { Junction } from './junction.js'

const start = Date.now()

async function main() {
  const scriptTag = document.querySelector('script[data-account-id]')

  if (!scriptTag) throw new Error('[Junction] Script tag not found')

  const accountId = scriptTag.getAttribute('data-account-id')

  if (!accountId) throw new Error('[Junction] Script tag missing data-account-id attribute')

  const trackUrlHashes = scriptTag.getAttribute('data-track-url-hashes') === 'true'

  const junction = await Junction.initialize({ accountId, trackUrlHashes })

  junction.page()

  window.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      junction.track('click', {
        id: event.target.id,
        text: event.target.innerText,
        href: event.target.href
      })
    } else if (event.target instanceof HTMLButtonElement) {
      junction.track('click', {
        id: event.target.id,
        text: event.target.innerText
      })
    }
  })

  window.addEventListener('load', () => junction.track('load', { duration: Date.now() - start }))

  window.addEventListener('popstate', () => junction.page())
  window.addEventListener('pushState', () => junction.page())
  window.addEventListener('replaceState', () => junction.page())

  if (trackUrlHashes) window.addEventListener('hashchange', () => junction.page())

  window.addEventListener('error', (event) =>
    junction.track('error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  )

  window.addEventListener('beforeunload', () => junction.track('beforeunload'))
}

main()
