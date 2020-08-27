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
 * TODO FIXME Would be better to base this off a scroll
 */
function loadImagesFallback() {
  _lazyPictures.forEach( ( _lazyPicture ) => {
    _lazyPicture.setAttribute( 'src', _lazyPicture.dataset.src );
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
    let _img;

    if ( observedItem.isIntersecting ) {
      _img = observedItem.target;
      _img.setAttribute( 'src', _img.dataset.src );
      window.setTimeout( () => {
        _img.classList.remove( 'is-lazy' );
      }, 350 );
      lazyImagesObserver.unobserve( _img );
    }
  } );
}

/**
 * Load the lazy image
 */
function loadImage( _image, st ) {
}

/**
 * Checks for lazy images loading in
 */
function checkForLazyImages() {

  // Modified from https://codepen.io/GreenSock/pen/OJMaEOP
  // const lazyImageScrollTrigger = new window.ScrollTrigger.config( { limitCallbacks: true } );

  window.gsap.utils.toArray( _lazyPictures ).forEach( ( _image ) => {
    let newSrc = _image.dataset.src;
    let _newImage = document.createElement("img");

    let loadImage = () => {
      _newImage.onload = () => {

        // Avoid recursion
        _newImage.onload = null;
        _image.setAttribute( 'src', newSrc );
        _image.classList.remove( 'is-lazy' );
        st && st.kill();

        // If this is the first time coming into the FPI Week container, then refresh the ScrollTrigger points
        if ( _image.classList.contains( 'fpi-week__opener-image' ) && ! _image.parentElement.classList.contains( 'is-refreshed' ) ) {
          _image.parentElement.classList.add( 'is-refreshed' );
          window.ScrollTrigger.refresh();
        }
      }
      _newImage.setAttribute( 'src', newSrc );
    };

    let st = window.ScrollTrigger.create( {
      trigger: _image,
      start: '-50% bottom',
      onEnter: loadImage,

      // Make sure it works in either direction
      onEnterBack: loadImage
    } );
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

checkForLazyImages();


/*

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

  */
}
