/**
 * Helper functions to accommodate creation of a Polaroid experience
 */
import { throttle } from '../../utilities/Throttle';
import { getIsMobile } from '../../utilities/IsMobile';

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
      trigger: self._el,
      start: 'top center',
      end: 'bottom top',
      once: true,
      scrub: false,
      pin: false,
      markers: false,
      onEnter: () => self.setTimelineAnimationStates(),
      onLeaveBack: () => self.setTimelineAnimationStates(),
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
    const isMobile = getIsMobile();

    self._polaroids.forEach((_polaroid: any, index: number) => {
      const offset = +_polaroid.dataset.offset;
      let restingOffset;

      if (isMobile) {
        restingOffset = 0;
      } else if (index === length) {
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
    const isMobile = getIsMobile();
    const innerWidth = window.innerWidth;

    self._polaroids.forEach((_polaroid: any) => {
      let offset = +_polaroid.dataset.offset;

      if (offset > 0) {
        offset = isMobile ? innerWidth * 0.8 : innerWidth - offset;
      } else {
        offset = isMobile ? innerWidth * -0.8 : offset;
      }

      window.gsap.set(_polaroid, {
        x: offset,
      });
    });
  }

  recalculateLocations() {
    const self = this;

    self.timeline.kill();
    self.timeline.invalidate();
    window.ScrollTrigger.refresh();
    self.setTimelineAnimationStates();
  }

  bringToFront(frontIndex: number) {
    const self = this;
    let maxZIndex = 1;

    if (getIsMobile()) return;

    self._polaroids.forEach((_polaroid: HTMLElement) => {
      const polaroidZIndex = +_polaroid.style.zIndex;
      if (polaroidZIndex > maxZIndex) maxZIndex = polaroidZIndex;
    });

    window.gsap.to(self._polaroids[frontIndex], {
      zIndex: maxZIndex + 1,
      delay: 0,
      duration: 0,
    });
  }

  attachEventListener() {
    const self = this;
    const throttledRecalc = throttle(self.recalculateLocations, 200, self);
    let oldHeight = window.innerHeight;

    // @ts-ignore
    window.addEventListener('resize', () => {
      if (!getIsMobile() || (getIsMobile() && Math.abs(oldHeight - window.innerHeight) > 100)) {
        throttledRecalc();
      }
    }, { passive: true });

    self._polaroids.forEach((_polaroid, index) => {
      _polaroid.addEventListener('click', () => self.bringToFront(index), { passive: true });
    });
  }

  /**
   * Initialize the Polaroid
   */
  init() {
    this.setInitialOpenerStates();
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
