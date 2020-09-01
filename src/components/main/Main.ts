/**
 * Main TS
 */
import { setIsMobile, getIsMobile } from '../../utilities/IsMobile.js';
import { trackVisibilityChange, getVisibilityChange } from '../../utilities/TrackTabFocus.js';
import { trackOrientationChange } from '../../utilities/TrackOrientation.js';

/**
 * Attach various event listeners
 */
function attachEventListeners() {
  const visibilityChange = getVisibilityChange();

  window.addEventListener( 'orientationchange', ( event ) => {
    trackOrientationChange( event, false );
  }, { passive: true } );
  window.addEventListener( visibilityChange, trackVisibilityChange, { passive: true } );
}

/**
 * Initialize Main
 */
export default function init() {
  setIsMobile( 767 );
  attachEventListeners();
  window.setTimeout( () => {
    trackOrientationChange( null, true );
  }, 3500 );
}
