export let _lazyThings = null;
let lazyThingObserver = null;

/**
 * Sets the _lazyThings variable
 */
export function setLazyThings( _els ) {
  _lazyThings = _els;
}

/**
 * Loads all of the lazy things as a fallback for older browsers
 */
function loadLazyThingFallback() {
  _lazyThings.forEach( ( _lazyThing ) => {
    _lazyThing.classList.remove( 'is-lazy-thing' );
  } );
}

/**
 * Checks for things that need lazy loaded in
 * @param {Array} observersArray The IntersectionObserver objects
 */
export function checkForLazyLoadThings( observersArray ) {
  observersArray.forEach( ( observedItem ) => {
    let _lazyThing;

    if ( observedItem.isIntersecting ) {
      _lazyThing = observedItem.target;
      _lazyThing.classList.remove( 'is-lazy-thing' );
      lazyThingObserver.unobserve( _lazyThing );
    }
  } );
}

export function watchForLazyThings() {

  // Shim for forEach on NodeLists
  // From https://stackoverflow.com/a/46057817/1472477
  if ( typeof NodeList !== 'undefined' && NodeList.prototype && ! NodeList.prototype.forEach ) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  // Checks if the browser supports the IntersectionObserver and uses that, else,
  // just loads all the images and hides the Tallies
  // Modified from: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  if ( window.IntersectionObserver ) {
    lazyThingObserver = new IntersectionObserver( checkForLazyLoadThings );
    _lazyThings.forEach( ( _lazyThing ) => {
      lazyThingObserver.observe( _lazyThing );
    } );
  } else {
    loadLazyThingFallback();
  }
}
