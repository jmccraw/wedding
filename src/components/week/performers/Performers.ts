/**
 * Performers section animations TS
 */
import trackAnalyticsEvent from '../../../utilities/TrackAnalytics.js';
const _performers: NodeListOf<Element> = document.querySelectorAll( '.fpi-performers' );

/**
 * Creates a Performer class that will control the animation sequence
 * for each of the different sections
 */
class Performer {
  _el: Element;
  _performers: NodeList;
  timeline: any;
  index: number;

  /**
   * Construct the Performer
   * @param {Element} _el The selector for this Performer
   * @param {Number} index The index of the Performer
   */
  constructor( _el: Element, index: number ) {
    this._el = _el;
    this._performers = _el.querySelectorAll( '.fpi-performers__profile' );
    this.timeline = window.gsap.timeline( { repeat: 0 } );
    this.index = index;
  }

  /**
   * Track that the animation sequence triggered
   */
  trackTrigger() {
    trackAnalyticsEvent( `performers-${this.index}:trigger` );
  }

  /**
   * Sets the animation sequence for this Performer group and when to trigger it
   */
  setAnimationTrigger() {
    const self = this;

    self._performers.forEach( ( _performer: Element ) => {
      self.timeline.from( _performer, 0.35, {
        opacity: 0,
        y: 15
      } );
    } );

    window.ScrollTrigger.create( {
      animation: self.timeline,
      trigger: self._el,
      start: 'top +75%',
      end: 'bottom bottom',
      once: true,
      scrub: false,
      pin: false,
      markers: false,
      onEnter: self.trackTrigger.bind( self )
    } );
  }

  /**
   * Initialize this specific Performer
   */
  init() {
    this.setAnimationTrigger();
  }
}

/**
 * Create all of the Performers we need
 */
function instantiatePerformers() {
  _performers.forEach( ( _performer: Element, index: number ) => {
    const performer: Performer = new Performer( _performer, index );
    performer.init();
  } );
}

/**
 * Initiate the Performers
 */
export default function init() {
  instantiatePerformers();
}
