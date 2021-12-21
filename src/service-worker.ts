import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'product-tile-image position-relative ls-is-cached lazyloaded', // CSS selector syntax - just like you would use with document.querySelector()
        maxMatches: 1, // limits the number of matched elements to prefetch to 1 per page
        attribute: 'src', // the attribute holding the URL to prefetching
        as: 'image', // the type of asset being prefetched
      },
      {
        selector: 'nav-custom-image', // CSS selector syntax - just like you would use with document.querySelector()
        maxMatches: 1, // limits the number of matched elements to prefetch to 1 per page
        attribute: 'src', // the attribute holding the URL to prefetching
        as: 'image', // the type of asset being prefetched
      },
      {
        selector: '.component-image.position-absolute.promotion-impression-img',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImages,
      },
      {
        selector: '.plp-banner-top-inner img.plp-banner-top-image',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImagesHero,
      },
      {
        selector: 'img.product-tile-image.position-relative',
        maxMatches: 2,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImagesTwo,
      },
    ]),
  ],
})
  .route()
  // .cache(/^https:\/\/assets-global\.website-files\.com\/.*/)
  // ENTER REGULAR EXPRESSION SELECTOR FOR IMAGES YOU WANT TO PREFETCH //
  // (usualy as CDN base domain name followed by ".*" as general selecor) //

///////////////////////////////////////////////
// Callback function for PLP image selector //
function deepFetchPLPImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP Hero 1: "+url+"\n")
  prefetch(url, 'image')
}

function deepFetchPLPImagesHero({ $el, el, $ }: DeepFetchCallbackParam) {
  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP Hero 2: "+url+"\n")
  prefetch(url, 'image')
}

function deepFetchPLPImagesTwo({ $el, el, $ }: DeepFetchCallbackParam) {
  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP: "+url+"\n")
  prefetch(url, 'image')
}



// function logPrefetchedContent({$el}) { // for testing
//   // console.log("[][]][][[][]][][][][][[]][[][][]")
//   console.log("content '"+$el.attr('src')+"' has been prefetched...")
// }
