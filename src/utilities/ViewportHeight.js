let oldVH = -1;
let variableName = '';

/**
 * Sets the variableName
 */
export function setViewportHeightVariableName( newName ) {
  if ( 0 < newName.length ) {
    variableName = newName;
  }
}

/**
 * Sets the mobile viewport height to be equivalent to 1% of the viewable screen space,
 * which includes browser chrome. Modified from CSS Tricks: http://bit.ly/2rMEhzN
 */
function setCustomViewportHeight() {
  const customVH = window.innerHeight;

  if ( ( oldVH > customVH && oldVH - customVH > 90 )
    || ( oldVH < customVH && customVH - oldVH > 90 ) ) {
    oldVH = customVH;
    document.documentElement.style.setProperty( variableName, `${customVH}px` );
  }
}

/**
 * Initialize the viewport height JS
 */
export function initViewportHeight() {
  setCustomViewportHeight();
  window.addEventListener( 'resize', setCustomViewportHeight, { passive: true } );
}
