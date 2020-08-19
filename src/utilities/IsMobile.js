let isMobile = false;
let oldViewport = 768;

/**
 * Sets the status of isMobile
 * @param {Number} viewport The viewport, in pixels, to determine if something lower is mobile
 */
export function setIsMobile( viewport = 768 ) {
  oldViewport = viewport;
  isMobile = window.innerWidth < viewport;
}

/**
 * Returns the status of
 */
export function getIsMobile() {
  return isMobile;
}

/**
 * Attach event listeners that help determine whether if this is mobile
 */
function attachEventListeners() {
  window.addEventListener( 'resize', () => {
    setIsMobile( oldViewport );
  }, { passive: true } );
}

/**
 * Initialize the event handlers and set the initial value of isMobile
 */
function init() {
  attachEventListeners();
}

init();
