/**
 * Week Opener image logic TS
 */
import { getIsMobile } from '../../../utilities/IsMobile.js';
const _openerFigures: NodeListOf<Element> = document.querySelectorAll( '.fpi-week__opener-figure' );

/**
 * Create a Week Opener class to deal with animating the opener images
 */
class WeekOpener {
  _el: Element;
  _openerImages: NodeListOf<Element>;
  _mobileImages: NodeListOf<Element>;
  _desktopImages: NodeListOf<Element>;
  length: number;
  hasTrophy: boolean;
  timeline: any;
  scrollTrigger: any;
  index: number;

  /**
   * Week Opener constructor
   * @param {Element} _el The selector housing the opener images
   * @param {Number} index The index of the selector
   */
  constructor( _el: Element, index: number ) {
    this._el = _el;
    this._openerImages = _el.querySelectorAll( '.fpi-week__opener-image' );
    this._mobileImages = _el.querySelectorAll( '.fpi-week__opener-image.is-mobile' );
    this._desktopImages = _el.querySelectorAll( '.fpi-week__opener-image.is-desktop' );
    this.length = this._openerImages.length * 0.5;
    this.hasTrophy = _el.classList.contains( 'is-trophy' );
    this.timeline = window.gsap.timeline( { repeat: 0 } );
    this.scrollTrigger = null;
    this.index = index;
  }

  /**
   * Triggers the timeline animation to run
   */
  triggerTimelineAnimation() {
    const self = this;

    self.scrollTrigger && self.scrollTrigger.kill();
    self.timeline.play();

      // let st = window.ScrollTrigger.create( {
      //   trigger: _image,
      //   start: '-50% bottom',
      //   onEnter: loadImage,

      //   // Make sure it works in either direction
      //   onEnterBack: loadImage
  }

  /**
   * Adds the ScrollTrigger event for when to animate in the Week Opener sequence
   */
  watchForScrollTrigger() {
    const self = this;

    // self.scrollTrigger = window.ScrollTrigger.create( {
    //   // animation: self.timeline,
    //   trigger: self._el,
    //   start: 'top center',
    //   markers: true,
    //   // once: true,
    //   // anticipatePin: 1
    //   onEnter: self.triggerTimelineAnimation.bind( self ),
    //   onEnterBack: self.triggerTimelineAnimation.bind( self )
    // } );

    // self.scrollTrigger = window.gsap.to( self._el, {
    //   scrollTrigger: {
    //     markers: true,
    //     trigger: self._el,
    //     start: 'top center',
    //     end: 'bottom top',
    //     once: true,
    //     onEnter: () => {
    //       self.triggerTimelineAnimation();
    //     },
    //     onEnterBack: () => {
    //       self.triggerTimelineAnimation();
    //     }
    //   }
    // } );


    window.ScrollTrigger.create( {
      animation: self.timeline,
      trigger: self._el,
      start: 'top center',
      end: 'bottom top',
      once: true,
      scrub: false,
      pin: false,
      markers: false,
    } );
  }

  /**
   * Determines whether the currrent index is a trophy element or not
   * @param {Number} index The index of the Week Opener image
   * @return {boolean}
   */
  getTrophyStatus( index: number ): boolean {
    // return this.hasTrophy && ( index === this.length - 1 || index === this.length * 2 - 1 );

    return this.hasTrophy && index === this.length - 1;
  }

  /**
   * Creates timeline addition based on the given selector and index
   * @param {Element} _image The image to add to the timeline
   * @param {Number} index The index of the image
   */
  addToTimeline( _image: any, index: number ) {
    const self = this;
    const durationOffset = self.getTrophyStatus( index ) ? 1 : 0.35;

    self.timeline.to( _image, {
      duration: durationOffset,
      opacity: 1,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1
    } );
  }

  /**
   * Begins the opening sequence animation set, including transitioning in loaded images and text
   */
  constructTimeline() {
    const self = this;

    if ( getIsMobile() ) {
      self._mobileImages.forEach( self.addToTimeline.bind( self ) );
    } else {
      self._desktopImages.forEach( self.addToTimeline.bind( self ) );
    }
  }

  /**
   * Sets the initial starting positions for the various images
   */
  setInitialOpenerStates() {
    const self = this;

    self._openerImages.forEach( ( _openerImage: any, index: number ) => {
      const scaleOffset = self.getTrophyStatus( index ) ? 0.75 : 1;

      window.gsap.set( _openerImage, {
        opacity: 0,
        x: _openerImage.dataset.xOffset,
        y: _openerImage.dataset.yOffset,
        scaleX: scaleOffset,
        scaleY: scaleOffset
      } );
    } );
  }

  /**
   * Initialize the WeekOpener
   */
  init() {
    this.setInitialOpenerStates();
    this.constructTimeline();
    this.watchForScrollTrigger();
  }
};

/**
 * Creates all of the WeekOpener elements
 */
function constructWeekOpeners() {
  _openerFigures.forEach( ( _figure: Element, index: number ) => {
    const weekOpener = new WeekOpener( _figure, index );
    weekOpener.init();
  } );
}

/**
 * Opener functions
 */
export default function init() {
  constructWeekOpeners();
}
