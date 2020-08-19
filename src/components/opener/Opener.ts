/**
 * Opener TS
 */
import trackAnalyticsEvent from '../../utilities/TrackAnalytics.js';
const _opener = document.querySelector( '.fpi-opener' );
const _openerImages = document.querySelectorAll( '.fpi-opener__image' );
const _openerJumpButton = _opener.querySelector( '.fpi-opener__button' );
const openerImageLength = _openerImages.length;

let oldVH: number = -1;
let openerImageCompletions: number = 0;

/**
 * Sets the mobile viewport height to be equivalent to 1% of the viewable screen space,
 * which includes browser chrome. Modified from CSS Tricks: http://bit.ly/2rMEhzN
 */
function setCustomViewportHeight() {
  const customVH: number = window.innerHeight;

  if ( ( oldVH > customVH && oldVH - customVH > 120 )
    || ( oldVH < customVH && customVH - oldVH > 120 ) ) {
    oldVH = customVH;
    document.documentElement.style.setProperty( '--fpi-vh', `${customVH}px` );
  }
}

/**
 * Jumps to the introduction section of the piece
 */
function jumpToIntro() {
  const _offsetTarget: number = document.querySelector( '.fpi-introduction' ).offsetTop;

  window.gsap.to( window, {
    duration: 0.25,
    scrollTo: { y: _offsetTarget, autoKill: false }
  } );

  trackAnalyticsEvent( 'jump-button:click' );
}

/**
 * Begins the opening sequence animation set, including transitioning in loaded images and text
 */
function playOpenerSequence() {
  _opener.classList.add( 'is-active' );
}

/**
 * Increments the number of loaded images for the opener sequence
 */
function checkOpenerSequence() {
  openerImageCompletions++;

  // If all the images are loaded in, start the sequence
  if ( openerImageCompletions === openerImageLength ) {
    playOpenerSequence();
  }
}

/**
 * Goes through the opener landing screen animation sequence on load
 */
function initiateOpenerSequence() {
  _openerImages.forEach( ( _openerImage ) => {
    _openerImage.addEventListener( 'load', checkOpenerSequence, { passive: true } );
    if ( _openerImage.complete ) {
      checkOpenerSequence();
    }
  } );

  // As a fallback, just load it after 7 seconds
  window.setTimeout( playOpenerSequence, 7000 );
}

/**
 * Resets the custom CSS variable
 */
function resetVariables() {
  setCustomViewportHeight();
}

/**
 * Attaches various event listeners to things
 */
function attachEventListeners() {
  _openerJumpButton.addEventListener( 'click', jumpToIntro, { passive: true } );
  window.addEventListener( 'resize', resetVariables, { passive: true } );
}

/**
 * Opener functions
 */
export default function init() {
  setCustomViewportHeight();
  attachEventListeners();
  document.addEventListener( 'DOMContentLoaded', initiateOpenerSequence, { passive: true } );
}
