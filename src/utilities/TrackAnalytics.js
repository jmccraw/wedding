import { getIsMobile } from './IsMobile.js';

/**
 * Track a custom link event in Adobe Analytics
 * @param {String} customEvent The type of event that is happening (e.g., profile:previous:click)
 */
export default function trackAnalyticsEvent( customEvent ) {
  const device = getIsMobile() ? 'mobile:' : 'desktop:';

  // if ( window.espn && window.espn.track ) {
  //   window.espn.track.trackLink( {
  //     linkPos: `espncom:nfl-fpi:${device}${customEvent}`,
  //     linkId: null
  //   } );
  // }
  window.console.log( `espncom:nfl-fpi:${device}${customEvent}` );
}
