/**
 * Opener TS
 */
import trackAnalyticsEvent from '../../utilities/TrackAnalytics.js';
const _opener: Element = document.querySelector( '.fpi-opener' );
const _openerHed: Node = _opener.querySelector( '.fpi-opener__hed' );
const _openerDek: Node = _opener.querySelector( '.fpi-opener__dek' );
const _openerImages: NodeList = document.querySelectorAll( '.fpi-opener__image' );
const _openerJumpButton: Node = _opener.querySelector( '.fpi-opener__button' );
const openerImageLength: number = _openerImages.length;
let openerImageCompletions: number = 0;

/**
 * Jumps to the introduction section of the piece
 */
function jumpToIntro() {
  const _target: any = document.querySelector( '.fpi-introduction' );
  const _offsetTarget: number = _target.offsetTop;

  // TODO FIXME Fix the above offset, which used to be .offsetTop

  window.gsap.to( window, {
    duration: 0.25,
    ease: 'linear',
    scrollTo: { y: _offsetTarget, autoKill: false }
  } );

  trackAnalyticsEvent( 'jump-button:click' );
}

/**
 * Begins the opening sequence animation set, including transitioning in loaded images and text
 */
function playOpenerSequence() {
  const timeline = window.gsap.timeline( { repeat: 0 } );
  _opener.classList.add( 'is-active' );

  _openerImages.forEach( ( _openerImage ) => {
    timeline.to( _openerImage, {
      duration: 0.5,
      opacity: 1,
      x: 0
    } );
  } );

  timeline.to( _openerHed, {
    duration: 0.25,
    opacity: 1,
    y: 0
  } );

  timeline.to( _openerDek, {
    duration: 0.25,
    opacity: 1,
    y: 0
  } );

  timeline.to( _openerJumpButton, {
    duration: 0.25,
    opacity: 1,
    y: 0
  } );
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
  window.gsap.set( [ _openerHed, _openerDek, _openerJumpButton ], {
    opacity: 0,
    y: 15
  } );

  _openerImages.forEach( ( _openerImage: any ) => {
    _openerImage.addEventListener( 'load', checkOpenerSequence, { passive: true } );
    if ( _openerImage.complete ) {
      checkOpenerSequence();
    }

    window.gsap.set( _openerImage, {
      opacity: 0,
      x: _openerImage.dataset.xOffset
    } );
  } );

  // As a fallback, just load it after 7 seconds
  window.setTimeout( playOpenerSequence, 7000 );
}

/**
 * Attaches various event listeners to things
 */
function attachEventListeners() {
  _openerJumpButton.addEventListener( 'click', jumpToIntro, { passive: true } );
}

/**
 * Opener functions
 */
export default function init() {
  attachEventListeners();
  document.addEventListener( 'DOMContentLoaded', initiateOpenerSequence, { passive: true } );
}
