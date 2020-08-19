import trackAnalyticsEvent from './TrackAnalytics.js';
let documentHidden;
let visibilityChange;

/**
 * Returns the value of visibilityChange
 */
export function getVisibilityChange() {
  return visibilityChange;
}

/**
 * Figures out which version of document hidden to use for this browser
 */
function getDocumentHiddenVersion() {
  // Modified slightly from https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  if ( 'undefined' !== typeof document.hidden ) {
    documentHidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if ( 'undefined' !== typeof document.msHidden ) {
    documentHidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if ( 'undefined' !== typeof document.webkitHidden ) {
    documentHidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }
}

/**
 * Tracks when the user switches window visibility by changing tabs
 */
export function trackVisibilityChange() {
  const isFocusLost = document[documentHidden];

  trackAnalyticsEvent( isFocusLost ? 'tab-focus-lost' : 'tab-focus-gained' );
}
