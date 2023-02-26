/**
 * Helper functions to accomodate creation of a Polaroid experience
 */
import { throttle } from '../../utilities/Throttle';

const _photoBoxes: NodeListOf<Element> = document.querySelectorAll('.photo-box');

/**
 * Create a Polaroid class to deal with animating images
 */
class PhotoBox {
  _el: Element;
  _polaroids: NodeListOf<Element>;
  timeline: any;
  scrollTrigger: any;

  /**
   * Polaroid constructor
   * @param {Element} _el The selector housing the polaroids
   */
  constructor(_el: Element) {
    this._el = _el;
    this._polaroids = _el.querySelectorAll('.polaroids');
    this.timeline = window.gsap.timeline({ repeat: 0 });
    this.scrollTrigger = null;
  }

  /**
   * Triggers the timeline animation to run
   */
  triggerTimelineAnimation() {
    const self = this;

    self.timeline.play();
  }

  /**
   * Adds the ScrollTrigger event for when to animate in the Polaroid sequence
   */
  watchForScrollTrigger() {
    const self = this;

    window.ScrollTrigger.create({
      animation: self.timeline,
      trigger: self._el,
      start: 'top center',
      end: 'bottom top',
      once: true,
      scrub: false,
      pin: false,
      markers: false,
    });
  }

  /**
   * Register where the Polaroids should animate to
   */
  setTimelineAnimationStates() {
    const self = this;
    const durationOffset = 0.35;
    const length = self._polaroids.length - 1;
    const halfWindow = window.innerWidth / 2;

    self._polaroids.forEach((_polaroid: any, index: number) => {
      const offset = +_polaroid.dataset.offset;
      let restingOffset;

      if (index === length) {
        restingOffset = halfWindow - 350;
      } else {
        restingOffset = offset > 0 ? halfWindow - 250 : halfWindow - 500;
      }

      self.timeline.to(_polaroid, {
        duration: durationOffset,
        x: restingOffset,
      });
    });
  }

  /**
   * Sets the initial starting positions for the various images
   */
  setInitialOpenerStates() {
    const self = this;

    self._polaroids.forEach((_polaroid: any) => {
      const offset = +_polaroid.dataset.offset;

      window.gsap.set(_polaroid, {
        x: offset > 0 ? window.innerWidth - offset : offset,
      });
    });
  }

  recalculateLocations() {
    const self = this;

    self.timeline.kill();
    self.setTimelineAnimationStates();
  }

  attachEventListener() {
    const self = this;
    const throttledRecalc = throttle(self.recalculateLocations, 200, self);

    window.addEventListener('resize', throttledRecalc, { passive: true });
  }

  /**
   * Initialize the Polaroid
   */
  init() {
    this.setInitialOpenerStates();
    this.setTimelineAnimationStates();
    this.watchForScrollTrigger();
    this.attachEventListener();
  }
};

function constructPhotoBoxes() {
  _photoBoxes.forEach((_photoBox: Element) => {
    const photoBox = new PhotoBox(_photoBox);
    photoBox.init();
  });
}

export default function init() {
  constructPhotoBoxes();
}
