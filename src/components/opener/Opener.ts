// /**
//  * Opener TS
//  */
// const _opener: Element = document.querySelector( '.opener' );
// const _openerFigure: Element = _opener.querySelector( '.opener__figure' );
// const _openerHed: Node = _opener.querySelector( '.opener__hed' );
// const _openerImages: NodeList = document.querySelectorAll( '.opener__image' );
// const openerImageLength: number = _openerImages.length;
// let openerImageCompletions: number = 0;

// /**
//  * Begins the opening sequence animation set, including transitioning in loaded images and text
//  */
// function playOpenerSequence() {
//   const timeline = window.gsap.timeline( { repeat: 0 } );
//   _opener.classList.add( 'is-active' );

//   timeline.from( _openerFigure, {
//     duration: 0.5,
//     opacity: 0,
//     delay: 0.25
//   } );

//   // _openerImages.forEach( ( _openerImage ) => {
//   //   timeline.to( _openerImage, {
//   //     duration: 0.35,
//   //     opacity: 1,
//   //     x: 0
//   //   } );
//   // } );
//   _openerImages.forEach(_openerImage => {
//     timeline.to(_openerImage, {
//       scrollTrigger: {
//         trigger: _openerImage,
//         toggleActions: 'play none none none',
//         start: 'bottom bottom',
//         end: '=+500'
//       },
//       duration: 2,
//       opacity: 1,
//       y: -100
//     });
//   })

//   timeline.to( _openerHed, {
//       duration: 0.25,
//       opacity: 1,
//       y: 0
//     }, '-=0.75' );
// }

// /**
//  * Increments the number of loaded images for the opener sequence
//  */
// function checkOpenerSequence() {
//   openerImageCompletions++;

//   // If all the images are loaded in, start the sequence
//   if ( openerImageCompletions === openerImageLength ) {
//     playOpenerSequence();
//   }
// }

// /**
//  * Goes through the opener landing screen animation sequence on load
//  */
// function initiateOpenerSequence() {
//   window.gsap.set( [ _openerHed ], {
//     opacity: 0,
//     y: 15
//   } );

//   _openerImages.forEach( ( _openerImage: any ) => {
//     _openerImage.addEventListener( 'load', checkOpenerSequence, { passive: true } );
//     if ( _openerImage.complete ) {
//       checkOpenerSequence();
//     }

//     // window.gsap
//     // // .set(_openerImage, {
//     // //   opacity: 0,
//     // //   y: -100
//     // // })
//     // .to(_openerImage, {
//     //   scrollTrigger: _openerImage,
//     //   duration: 2000,
//     //   opacity: 1,
//     //   y: 0
//     // });
//   } );

//   // As a fallback, just load it after 7 seconds
//   window.setTimeout( playOpenerSequence, 7000 );
// }

/**
 * Opener functions
 */
export default function init() {
  // initiateOpenerSequence();

  window.gsap.set('.main', {position:'fixed', width:'100%', height:'100%', top:0, left:'50%', x:'-50%', z:'0', opacity: 0});
  window.gsap.set('.scrollDist', {width:'100%', height:'170vh'});
  const j = window.gsap.timeline({scrollTrigger:{trigger:'.scrollDist', start:'top top', end:'bottom bottom', scrub: 0.5}})
      .fromTo('.sky', {y:0},{y:-200}, 0)
      .fromTo('.cloud1', {y:-10},{y:-800}, 0)
      .fromTo('.cloud2', {y:-100},{y:-500}, 0)
      .fromTo('.cloud3', {y:-50},{y:-650}, 0)
      .fromTo('.mountBg', {y:-10},{y:-150}, 0)
      .fromTo('.mountMg', {y:-20, x:-10},{y:-500, x: 0}, 0)
      .fromTo('.mountFg', {y:-50, x:10},{y:-550, x: 0}, 0)
      .fromTo('.date-line', {opacity: 0, y: -50}, {delay: 0.2, opacity: 1, y: 0}, 0);
  const k = window.gsap.timeline({
      scrollTrigger: {
        trigger: '.scrollDist',
        start: 'bottom bottom',
        end: 'bottom +=10vh',
        scrub: 0.5,
      }
    })
    .fromTo('.main', {opacity: 1}, {opacity: 0}, 0);
  // TODO FIXME Need to figure out a way to render this sequence if the user is already scrolled down
  // to trigger the page to fade away
  j.invalidate();
  k.invalidate();
  window.ScrollTrigger.refresh();

  document.getElementById('arrowBtn').addEventListener('mouseenter', (e)=>{ window.gsap.to('.arrow', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
  document.getElementById('arrowBtn').addEventListener('mouseleave', (e)=>{ window.gsap.to('.arrow', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
  document.getElementById('arrowBtn').addEventListener('click', (e)=>{ window.gsap.to(window, {scrollTo:innerHeight, duration:1.5, ease:'power1.inOut'}); })

  window.setTimeout(() => {
    window.gsap
      .to('.main', {opacity: 1, duration: 2});
  }, 500);

  window.setTimeout(() => {
    document.querySelector('.mountMg').classList.remove('is-hidden');
  }, 1000);

  window.setTimeout(() => {
    document.querySelector('.mountFg').classList.remove('is-hidden');
  }, 1500);

  window.setTimeout(() => {
    document.querySelector('.names').classList.remove('is-hidden');
  }, 2000);
}
