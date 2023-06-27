import {CDNProviderEnum} from './background'

const dataDiv = document.getElementById('data')
// Get CDN provider
chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
  if (tabs.length !== 1) {
    throw new Error("Error tab number")
  }
  const tab = tabs[0]
  const tabId = tab.id
  chrome.runtime.sendMessage({type: 'query', tabId},result => {
    switch (result) {
      case CDNProviderEnum.Cloudflare:
        // Factor cdn-cgi/trace url
        const traceURL = new URL('/cdn-cgi/trace', tab.url)
        fetch(traceURL).then(
          resp=>{
            if (resp.ok) {
              return resp.text()
            }
          }
        ).then(text=>{
          dataDiv.innerText = text
        })
    }
  })
})