/**
 * Opener TS
 */

/**
 * Opener animation sequence and scroll triggers
 * Modified from Tom Miller's CodePen
 * {@link https://codepen.io/creativeocean/pen/qBbBLyB}
 */
function initiateOpenerSequence() {
  const _wedding = document.querySelector('.wedding');
  _wedding.classList.remove('is-loading');

  window.gsap.timeline({ scrollTrigger:
      {
        end: 'bottom bottom',
        scrub: 0.5,
        start: 'top top',
        trigger: '.opener__scroller',
      }
    })
    .fromTo('.opener__background', { y: 0 }, { y: -200 }, 0)
    .fromTo('.opener__fixed', { y: -10 }, { y: -800 }, 0)
    .fromTo('.opener__garden', { y: -50 }, { y: -650 }, 0)
    .fromTo('.opener__center', { y: -10 }, { y: -150 }, 0)
    .fromTo('.opener__justin', { y: -20, x: -10 }, { y: -500, x: 0 }, 0)
    .fromTo('.opener__tyler', { y: -50, x: 10 }, { y: -550, x: 0}, 0)
    .fromTo('.opener__accent-line', { opacity: 0, y: -50 }, { delay: 0.2, opacity: 1, y: 0 }, 0);

  window.setTimeout(() => {
    window.gsap.to('.opener__container', { opacity: 1, duration: 2 });
  }, 500);

  window.setTimeout(() => {
    window.gsap.to('.opener__justin', { opacity: 1, duration: 0.5 });
  }, 1000);

  window.setTimeout(() => {
    window.gsap.to('.opener__tyler', { opacity: 1, duration: 0.5 });
  }, 1500);

  window.setTimeout(() => {
    window.gsap.to('.opener__names', { opacity: 1, duration: 1 });
    window.gsap.to('.opener__arrow', { opacity: 1, y: 0, duration: 0.5, delay: 0.5 });
    window.ScrollTrigger.refresh();
  }, 2000);
}

function enterLoadingState() {
  const _images: NodeList = document.querySelectorAll('.image-load-check');
  let imagesToLoad = _images.length;

  _images.forEach((_image: SVGImageElement) => {
    const _newImage = document.createElement('img');

    _newImage.onload = () => {
      _newImage.onload = null;
      imagesToLoad--;
    };

    _newImage.setAttribute('src', _image.getAttribute('xlink:href'));
  });

  const checkInterval = window.setInterval(() => {
    if (0 === imagesToLoad) {
      clearIntervalAndInitiateOpener();
    }
  }, 100);

  const clearIntervalAndInitiateOpener = () => {
    window.clearInterval(checkInterval);
    initiateOpenerSequence();
  };

  window.setTimeout(() => {
    if (0 < imagesToLoad) clearIntervalAndInitiateOpener();
  }, 3000);
}

function setInitialGsapStates() {
  window.gsap.set('.opener__container', {
    height: '100%',
    left: '50%',
    opacity: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    x: '-50%',
    z: '0',
  });

  window.gsap.set(['.opener__justin', '.opener__tyler', '.opener__names'], {
    opacity: 0,
  });

  window.gsap.set('.opener__arrow', {
    opacity: 0,
    y: -10,
  });

  window.gsap.set('.opener__scroller', {
    height: '170vh',
    width: '100%',
  });
}

export default function init() {
  setInitialGsapStates();
  enterLoadingState();
}
