import trackAnalyticsEvent from './TrackAnalytics.js';
let _lazyPictures = null;
let lazyImagesObserver = null;

/**
 * Sets the _lazyPictures variable
 */
export function setLazyPictures( _els ) {
  _lazyPictures = _els;
}

/**
 * Loads all of the images as a fallback for older browsers
 */
function loadImagesFallback() {
  _lazyPictures.forEach( ( _lazyPicture ) => {
    const _source = _lazyPicture.querySelector( 'source' );
    const _img = _lazyPicture.querySelector( 'img' );

    if ( _source ) {
      _source.setAttribute( 'srcset', _source.dataset.srcset );
    }

    _img.setAttribute( 'src', _img.dataset.src );
    _lazyPicture.classList.remove( 'is-lazy' );
  } );

  trackAnalyticsEvent( 'no-intersectionobserver' );
}

/**
 * Checks for images that need lazy loading (have the data-src attribute and 'is-lazy' attribute)
 * @param {Array} observersArray The IntersectionObserver objects
 */
function checkForLazyLoadImages( observersArray ) {
  observersArray.forEach( ( observedItem ) => {
    let _lazyPicture;
    let _source;
    let _img;

    if ( observedItem.isIntersecting ) {
      _lazyPicture = observedItem.target;
      _source = _lazyPicture.querySelector( 'source' );
      _img = _lazyPicture.querySelector( 'img' );

      if ( _source ) {
        _source.setAttribute( 'srcset', _source.dataset.srcset );
      }

      _img.setAttribute( 'src', _img.dataset.src );
      window.setTimeout( () => {
        _lazyPicture.classList.remove( 'is-lazy' );
        _lazyPicture.classList.add( 'is-loaded' );
      }, 350 );
      lazyImagesObserver.unobserve( _lazyPicture );
    }
  } );
}

export function watchForLazyImages() {

  // Shim for forEach on NodeLists
  // From https://stackoverflow.com/a/46057817/1472477
  if ( typeof NodeList !== 'undefined' && NodeList.prototype && ! NodeList.prototype.forEach ) {
    NodeList.prototype.forEach = Array.prototype.forEach;

    window.setTimeout( () => {
      trackAnalyticsEvent( 'no-foreach' );
    }, 3500 );
  }

  // Checks if the browser supports the IntersectionObserver and uses that, else,
  // just loads all the images and hides the Tallies
  // Modified from: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  if ( window.IntersectionObserver ) {
    lazyImagesObserver = new IntersectionObserver( checkForLazyLoadImages );
    _lazyPictures.forEach( ( _lazyPicture ) => {
      lazyImagesObserver.observe( _lazyPicture );
    } );
  } else {
    loadImagesFallback();
  }
}
