/**
 * Opener TS
 */

/**
 * Opener animation sequence and scroll triggers
 * Modified from Tom Miller's CodePen
 * {@link https://codepen.io/creativeocean/pen/qBbBLyB}
 */
function initiateOpenerSequence() {
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

  window.gsap.set('.opener__scroller', {
    height: '170vh',
    width: '100%',
  });

  const j = window.gsap.timeline({ scrollTrigger:
      {
        end: 'bottom bottom',
        scrub: 0.5,
        start: 'top top',
        trigger: '.opener__scroller',
      }
    })
    .fromTo('.opener__background', { y: 0 },{ y: -200 }, 0)
    .fromTo('.opener__fixed', { y: -10 }, { y: -800 }, 0)
    .fromTo('.opener__honeysuckle', { y: -100 }, { y: -500 }, 0)
    .fromTo('.opener__garden', { y: -50 }, { y: -650 }, 0)
    .fromTo('.opener__center', { y: -10 }, { y: -150 }, 0)
    .fromTo('.opener__justin', { y: -20, x: -10 }, { y: -500, x: 0 }, 0)
    .fromTo('.opener__tyler', { y: -50, x: 10 }, { y: -550, x: 0}, 0)
    .fromTo('.opener__acceent-line', { opacity: 0, y: -50 }, { delay: 0.2, opacity: 1, y: 0 }, 0);
  const k = window.gsap.timeline({
      scrollTrigger: {
        end: 'bottom +=10vh',
        scrub: 0.5,
        start: 'bottom bottom',
        trigger: '.opener__scroller',
      }
    })
    .fromTo('.opener__container', { opacity: 1 }, { opacity: 0 }, 0);
  // TODO FIXME Need to figure out a way to render this sequence if the user is already scrolled down
  // to trigger the page to fade away
  j.invalidate();
  k.invalidate();
  window.ScrollTrigger.refresh();

  window.setTimeout(() => {
    window.gsap.to('.opener__container', { opacity: 1, duration: 2 });
  }, 500);

  window.setTimeout(() => {
    document.querySelector('.opener__justin').classList.remove('is-hidden');
  }, 1000);

  window.setTimeout(() => {
    document.querySelector('.opener__tyler').classList.remove('is-hidden');
  }, 1500);

  window.setTimeout(() => {
    document.querySelector('.opener__names').classList.remove('is-hidden');
  }, 2000);
}

export default function init() {
  initiateOpenerSequence();
}
