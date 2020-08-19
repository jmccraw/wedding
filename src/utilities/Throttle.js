
/**
 * Throttle helper to reduce event calls
 * Modified from Remy Sharp: https://remysharp.com/2010/07/21/throttling-function-calls
 * @param fn
 * @param threshhold
 * @param scope
 * @returns {Function}
 */
export function throttle( fn, threshhold, scope ) {
  threshhold || ( threshhold = 250 );
  let last;
  let deferTimer;
  return function() {
    const context = scope || this;

    let now = +new Date;
    let args = arguments;
    if ( last && now < last + threshhold ) {
      window.clearTimeout( deferTimer );
      deferTimer = window.setTimeout( function() {
        last = now;
        fn.apply( context, args );
      }, threshhold );
    } else {
      last = now;
      fn.apply( context, args );
    }
  };
}
