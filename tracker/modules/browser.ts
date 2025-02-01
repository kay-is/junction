import Junction from "."
async function main() {
  const scriptTag = document.querySelector("script[data-dispatcher-id]")

  if (!scriptTag)
    throw new Error(
      "[Junction] Script tag missing data-dispatcher-id attribute"
    )

  const dispatcherId = scriptTag.getAttribute("data-dispatcher-id")

  if (!dispatcherId)
    throw new Error(
      "[Junction] Script tag missing data-dispatcher-id attribute"
    )

  const trackUrlHashes =
    scriptTag.getAttribute("data-track-url-hashes") === "true"
  const debug = scriptTag.getAttribute("data-debug") === "true"

  const junction = await Junction.initialize({
    dispatcherId,
    trackUrlHashes,
    debug,
  })

  window.addEventListener("load", () => {
    let loadTime: number
    try {
      loadTime = window.performance
        .getEntriesByType("navigation")
        // @ts-ignore
        .pop()?.domContentLoadedEventEnd
    } catch (e) {
      try {
        loadTime =
          window.performance.timing.loadEventEnd -
          window.performance.timing.navigationStart
      } catch (e) {
        loadTime = 0
      }
    }

    junction.page({ lt: Math.ceil(loadTime) })
  })

  if (trackUrlHashes) {
    // @ts-ignore
    window.navigation.addEventListener("navigate", () => junction.page())
  } else {
    let lastPath = window.location.pathname
    // @ts-ignore
    window.navigation.addEventListener("navigate", () => {
      if (window.location.pathname === lastPath) return
      lastPath = window.location.pathname
      junction.page()
    })
  }
}

main()
