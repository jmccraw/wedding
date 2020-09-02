/**
 * Weekly Winners Table TS
 */
import trackAnalyticsEvent from '../../../utilities/TrackAnalytics.js';
// import { getIsMobile } from '../../../utilities/IsMobile.js';
const _weeklyWinners: NodeListOf<Element> = document.querySelectorAll( '.fpi-weekly-winners__table' );

/**
 * Create the Table class and attach various functionality to each
 */
class WeeklyWinners {
  _el: Element;
  // _trs: NodeListOf<Element>;
  index: number;
  timeline: any;

  /**
   * Construct the Weekly Winners Table
   * @param {Element} _el The selector for this Weekly Winners Table
   * @param {Number} index The index of the Weekly Winners Table
   */
  constructor( _el: Element, index: number ) {
    this._el = _el;
    // this._trs = _el.querySelectorAll( 'tr' );
    this.index = index;
    this.timeline = window.gsap.timeline( { repeat: 0 } );
  }

  /**
   * Track that the animation sequence triggered
   */
  trackTrigger() {
    trackAnalyticsEvent( `weekly-winners-table-${this.index}:trigger` );
  }

  /**
   * Registers the Table animations for each table element
   */
  registerTableAnimation() {
    const self = this;
    // const isMobile = getIsMobile();

    // self._trs.forEach( ( _tr: Element, index: number ) => {
    //   const delay = 0 === index % 2 ? '-0.1' : 0;

    //   self.timeline.from( _tr, 0.10, {
    //     opacity: 0,
    //     y: 10,
    //     delay: isMobile ? 0 : delay
    //   } );
    // } );

    self.timeline.from( self._el, 0.25, {
      opacity: 0,
      y: 15
    } );

    window.ScrollTrigger.create( {
      animation: self.timeline,
      trigger: self._el,
      start: 'top bottom-=100',
      end: 'bottom bottom',
      once: true,
      scrub: false,
      pin: false,
      markers: false,
      onEnter: self.trackTrigger.bind( self )
    } );
  }

  /**
   * Initialize the Weekly Winners Table
   */
  init() {
    this.registerTableAnimation();
  }
}

/**
 * Generates all the Weekly Winners Table objects
 */
function constructWeeklyWinnersTables() {
  _weeklyWinners.forEach( ( _weeklyWinner: Element, index: number ) => {
    const weeklyWinner: WeeklyWinners = new WeeklyWinners( _weeklyWinner, index );
    weeklyWinner.init();
  } );
}

/**
 * Initialize the Weekly Winners Table functionality
 */
export default function init() {
  constructWeeklyWinnersTables();
}
