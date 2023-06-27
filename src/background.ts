let tabCDNProviderStorage = {} // FIXME: Perhaps NO GLOBAL VAR

enum CDNProviderEnum {
  Cloudflare = 'Cloudflare',
  CDN77 = 'cdn77',
  GoogleCDN = 'googlecdn',
  CloudFront = 'cloudfront',
  BunnyCDN = 'bunnycdn',
  Vercel = 'vercel',
  NoCDN = 'nocdn',
}

chrome.webRequest.onHeadersReceived.addListener(
  (resp) => {
    let providerType;
    console.log(resp)
    const headers = Object.fromEntries(resp.responseHeaders.map(item => [item.name, item.value]))
    if (headers['server'] === 'cloudflare') { // cloudflare: {server: cloudflare}
      providerType = CDNProviderEnum.Cloudflare
    } else if (headers['server'].toLowerCase().includes('cdn77')) {
      providerType = CDNProviderEnum.CDN77
    } else if (headers['server'] === 'Google-Edge-Cache') {
      providerType = CDNProviderEnum.GoogleCDN
    } else if (headers['via'].toLowerCase().includes('cloudfront')) {
      providerType = CDNProviderEnum.CloudFront
    } else if (headers['server'].toLowerCase().includes('bunnycdn')) {
      providerType = CDNProviderEnum.BunnyCDN
    } else if (headers['server'] === 'Vercel') {
      providerType = CDNProviderEnum.Vercel
    } else {
      providerType = CDNProviderEnum.NoCDN
    }
    tabCDNProviderStorage[resp.tabId] = providerType
  },
  {types: ["main_frame"], urls: ["<all_urls>"]},
  ["responseHeaders"]
)

chrome.tabs.onActivated.addListener((tabId) => {
  // TODO: Add CDN subscript
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  delete tabCDNProviderStorage[tabId]
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (typeof message === "object" && message !== null && message.type === 'query') {
    const tabId = message.tabId
    const type = tabCDNProviderStorage[tabId]
    sendResponse(type)
  }
})

export { CDNProviderEnum }