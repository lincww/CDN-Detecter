# CDN Detector

A simple Chrome extension for detect which CDN does website use and got meta info

## Supported CDN provider

- [x] Cloudflare
- [x] CDN77
- [x] Google Cloud CDN
- [x] CloudFront
- [ ] Fastly
- [x] Bunny.net
- [x] Vercel
- [ ] Gcore
- [ ] CDN.net
- [ ] Edgio
- [ ] Haproxy Edge
- [ ] Cachefly
- [ ] OVH Cloud

## How to?

By now, the method I detect CDN is via HTTP Header responded by remote server. Different CDN provider have different HTTP header.

## What's more?
I think I could add varieties of functions such as `a tailwind-css style popup page` or `dynamically change the icon`.
But I am not going to try on them right now, which makes the project much compacted and I have no ability to do that now.