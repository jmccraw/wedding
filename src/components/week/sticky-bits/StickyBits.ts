/**
 * Sticky Bits TS
 * A sticky section that scrolls into view, fixes a series of images in the background,
 * as text scrolls to the side (desktop) or on top (mobile). After the text is finished,
 * the content unfixes and scrolls away.
 */
const _stickyBitContainers: NodeListOf<Element> = document.querySelectorAll( '.fpi-week__sticky-bits' );

/**
 * Create the StickyBit class and attach various functionality to each
 */
class StickyBit {
  _el: Element;
  _graphicsContainer: NodeListOf<Element>;
  _graphics: NodeListOf<Element>;
  _textContainer: Element;
  index: number;
  timeline: any;
  graphicLength: number;

  /**
   * Construct the StickyBit
   * @param {Element} _el The selector for this StickyBits
   * @param {Number} index The index of the StickyBit
   */
  constructor( _el: Element, index: number ) {
    this._el = _el;
    this._graphicsContainer = _el.querySelectorAll( '.sticky-bits__figure-container' );
    this._graphics = _el.querySelectorAll( '.sticky-bits__graphic-container' );
    this._textContainer = _el.querySelector( '.sticky-bits__text-container' );
    this.index = index;
    this.timeline = window.gsap.timeline();
    this.graphicLength = this._graphics.length;
  }

  /**
   * Registers the StickyBit animations for each of the different slide elements
   */
  registerStickyBitsAnimation() {
    const self = this;

    self._graphics.forEach( ( _graphic: Element, index: number ) => {
      if ( 0 !== index ) {
        self.timeline.from( _graphic, { visibility: 'hidden' } );
      }
    } );

    window.ScrollTrigger.create( {
      animation: self.timeline,
      trigger: self._textContainer,
      start: 'top top',
      end: 'bottom bottom', // `+=${( self.graphicLength - 1 ) * 100}%`,
      scrub: true,
      pin: self._graphicsContainer,
      markers: false,
      anticipatePin: 1
    } );
  }

  /**
   * Initialize the StickyBit
   */
  init() {
    this.registerStickyBitsAnimation();
  }
}

/**
 * Generates all the StickyBit objects
 */
function constructStickyBits() {
  _stickyBitContainers.forEach( ( _stickyBit: Element, index: number ) => {
    const sticky: StickyBit = new StickyBit( _stickyBit, index );
    sticky.init();
  } );
}

/**
 * Initialize the Sticky Bits functionality
 */
export default function init() {
  constructStickyBits();
}
