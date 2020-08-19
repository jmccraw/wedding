/**
 * Sticky Header TS
 */
import trackAnalyticsEvent from '../../utilities/TrackAnalytics.js';

const _logo = document.querySelector( '.fpi-sticky-logo' );
const _facebookButton = document.querySelector( '.fpi-sticky-facebook-button' );
const _twitterButton = document.querySelector( '.fpi-sticky-twitter-button' );

/**
 * Share page to Facebook
 */
function shareToFacebook() {
  const _meta = document.querySelector( 'meta[property="fb:app_id"]' );
  const fbAppId = _meta ? _meta.getAttribute( 'content' ) : '116656161708917';
  const facebookShareURL = 'https://www.facebook.com/dialog/share?app_id=';
  const shareLink = window.encodeURIComponent( window.location.href );
  const shareURL = `${facebookShareURL}${fbAppId}&display=popup&href=${shareLink}`;

  window.open( shareURL, 'Share to Facebook', 'width=600,height=577' );
  trackAnalyticsEvent( 'share:facebook' );
}

/**
 * Share page to Twitter
 */
function shareToTwitter() {
  const twitterShareURL = 'https://twitter.com/intent/tweet?text=';
  const pageTitle = document.querySelector( 'meta[property="og:title"]' ).getAttribute( 'content' );
  const shareLink = window.encodeURIComponent( window.location.href );
  const encodePageTitle = window.encodeURIComponent( pageTitle );
  const shareURL = `${twitterShareURL}${encodePageTitle}&url=${shareLink}`;

  window.open( shareURL, 'Share to Twitter', 'width=500,height=300' );
  trackAnalyticsEvent( 'share:twitter' );
}

/**
 * Tracks a click on the logo
 */
function trackLogoClick() {
  trackAnalyticsEvent( 'logo:click' );
}

/**
 * Attach various event listeners
 */
function attachEventListeners() {
  _logo.addEventListener( 'click', trackLogoClick, { passive: true } );
  _facebookButton.addEventListener( 'click', shareToFacebook, { passive: true } );
  _twitterButton.addEventListener( 'click', shareToTwitter, { passive: true } );
}

/**
 * Initialize the Sticky Header
 */
export default function init() {
  attachEventListeners();
}
