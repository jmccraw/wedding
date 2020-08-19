/**
 * Sticky Bits TS
 * A sticky section that scrolls into view, fixes a series of images in the background,
 * as text scrolls to the side (desktop) or on top (mobile). After the text is finished,
 * the content unfixes and scrolls away.
 */
import trackAnalyticsEvent from '../../../utilities/TrackAnalytics.js';
const _stickyBitContainers = document.querySelectorAll( '.fpi-week__sticky-bits' );
const stickyBits = [];

/**
 * Create the StickyBit class and attach various functionality to each
 */
class StickyBit {

  /**
   * Construct the StickyBit
   * @param {Object} _el The selector for this StickyBits
   * @param {Number} index The index of the StickyBit
   */
  constructor( _el, index: number ) {
    this._el = _el;
    this._stickyBits = _el.querySelectorAll( '.sticky-bits__container' );
    this.index = index;
    this.timeline = window.gsap.timeline();
  }

  /**
   * Registers the StickyBit animations for each of the different slide elements
   */
  registerStickyBitsAnimation() {
    const self = this;

    self._stickyBits.forEach( ( _stickyBit ) => {
      self.timeline.from( _stickyBit, { yPercent: 100 } );
    } );

    window.ScrollTrigger.create( {
      animation: self.timeline,
      trigger: self._el,
      start: 'top top',
      end: `+=${self._stickyBits.length * 100}vh`,
      scrub: true,
      pin: true,
      markers: true
    } );
  }

  /**
   * Attaches various event listeners to the StickyBit
   */
  attachEventListeners() {
    window.console.log( this.index );
  }

  /**
   * Initialize the StickyBit
   */
  init() {
    this.registerStickyBitsAnimation();
    this.attachEventListeners();
  }
}

/**
 * Generates all the StickyBit objects
 */
function constructStickyBits() {
  _stickyBitContainers.forEach( ( _stickyBit, index ) => {
    const sticky = new StickyBit( _stickyBit, index );
    sticky.init();
    stickyBits.push( sticky );
  } );
}

/**
 * Initialize the Sticky Bits functionality
 */
export default function init() {
  constructStickyBits();
}
