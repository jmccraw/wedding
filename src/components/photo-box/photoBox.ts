/**
 * Helper functions to accomodate creation of a Polaroid experience
 */
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

    self.scrollTrigger && self.scrollTrigger.kill();
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
   * Sets the initial starting positions for the various images
   */
  setInitialOpenerStates() {
    const self = this;
    const durationOffset = 0.35;
    const length = self._polaroids.length - 1;

    self._polaroids.forEach((_polaroid: any, index: number) => {
      const offset: number = +_polaroid.dataset.offset;
      let restingOffset: number;

      if (index === length) {
        restingOffset = 50;
      } else {
        restingOffset = offset > 0 ? 250 : -80;
      }

      window.gsap.set(_polaroid, {
        x: offset > 0 ? window.innerWidth - offset : offset,
      });

      self.timeline.to(_polaroid, {
        duration: durationOffset,
        x: restingOffset,
      });
    });
  }

  /**
   * Initialize the Polaroid
   */
  init() {
    this.setInitialOpenerStates();
    this.watchForScrollTrigger();
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
