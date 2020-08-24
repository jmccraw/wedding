/**
 * Related Stories link tracking TS
 */
import trackAnalyticsEvent from '../../utilities/TrackAnalytics.js';
const _links: NodeListOf<Element> = document.querySelectorAll( '.fpi-related-stories__link' );

/**
 * Track any related story link clicks
 * @event event The click event
 */
function trackRelatedStoryClick( event: any ) {
  const txt: string = event.target.innerText;

  trackAnalyticsEvent( `related-stories:click:${txt}` );
}

/**
 * Adds event listeners to the homepage link
 */
function attachEventListeners() {
  _links.forEach( ( _link ) => {
    _link.addEventListener( 'click', trackRelatedStoryClick, { passive: true } );
  } );
}

/**
 * Default init function for Related Stories
 */
export default function init() {
  attachEventListeners();
}