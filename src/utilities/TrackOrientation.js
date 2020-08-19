import { getIsMobile } from './IsMobile.js';
import trackAnalyticsEvent from './TrackAnalytics.js';

/**
 * Determines the orientation and tracks that, on change
 * @event event (Required) The orientationchange event (not used)
 * @param {boolean} isInitialOrientation (Optional) Whether this is the first visit (true) or not (false/null)
 */
export function trackOrientationChange( event, isInitialOrientation ) {
  const twist = window.orientation;

  // Only care about tracking mobile
  if ( ! getIsMobile() ) {
    return;
  }

  if ( isInitialOrientation && ( 90 === twist || -90 === twist ) ) {
    trackAnalyticsEvent( 'orientation:initial:landscape' );
  } else if ( isInitialOrientation ) {
    trackAnalyticsEvent( 'orientation:initial:portrait' );
  } else if ( 90 === twist || -90 === twist ) {
    trackAnalyticsEvent( 'orientation:landscape' );
  } else {
    trackAnalyticsEvent( 'orientation:portrait' );
  }
}
