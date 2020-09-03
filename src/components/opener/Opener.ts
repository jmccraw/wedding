/**
 * Opener TS
 */
import trackAnalyticsEvent from '../../utilities/TrackAnalytics.js';
const _opener: Element = document.querySelector( '.fpi-opener' );
const _openerFigure: Element = _opener.querySelector( '.fpi-opener__figure' );
const _openerHed: Node = _opener.querySelector( '.fpi-opener__hed' );
const _openerDek: Node = _opener.querySelector( '.fpi-opener__dek' );
const _openerImages: NodeList = document.querySelectorAll( '.fpi-opener__image' );
const _openerJumpButton: Node = _opener.querySelector( '.fpi-opener__button' );
const openerImageLength: number = _openerImages.length;
let openerImageCompletions: number = 0;

/**
 * Jumps to the introduction section of the piece
 * TODO FIXME Still seems a bit funky on Chrome for whatever reason
 */
function jumpToIntro() {
  const _target: any = document.querySelector( '.fpi-introduction' );

  window.gsap.to( window, {
    duration: 0.25,
    ease: 'expo.out',
    overwrite: true,
    scrollTo: { y: _target, autoKill: false },
    delay: 0
  } );

  trackAnalyticsEvent( 'jump-button:click' );
}

/**
 * Begins the opening sequence animation set, including transitioning in loaded images and text
 */
function playOpenerSequence() {
  const timeline = window.gsap.timeline( { repeat: 0 } );
  _opener.classList.add( 'is-active' );

  timeline.from( _openerFigure, {
    duration: 0.5,
    opacity: 0,
    delay: 0.25
  } );

  _openerImages.forEach( ( _openerImage ) => {
    timeline.to( _openerImage, {
      duration: 0.35,
      opacity: 1,
      x: 0
    } );
  } );

  timeline.to( _openerHed, {
      duration: 0.25,
      opacity: 1,
      y: 0
    }, '-=0.75' )
    .to( _openerDek, {
      duration: 0.25,
      opacity: 1,
      y: 0
    }, '-=0.5' )
    .to( _openerJumpButton, {
      duration: 0.25,
      opacity: 1,
      y: 0
    }, '-=0.25' );
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
  initiateOpenerSequence();
}
