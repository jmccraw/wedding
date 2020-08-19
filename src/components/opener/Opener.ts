/**
 * Opener TS
 */
import trackAnalyticsEvent from '../../utilities/TrackAnalytics.js';

const _opener = document.querySelector( '.fpi-opener' );
const _openerJumpButton = _opener.querySelector( '.fpi-opener__button' );

/**
 * Jumps to the introduction section of the piece
 */
function jumpToIntro() {
  const _offsetTarget = document.querySelector( '.fpi-introduction' ).offsetTop;

  window.TweenLite.to( window, 0.5, {
    scrollTo: { y: _offsetTarget, autoKill: false }
  } );

  trackAnalyticsEvent( 'jump-button:click' );
}

/**
 * Trigger the opener animation
 */
function triggerOpener() {
  _opener.classList.add( 'is-active' );
}

/**
 * Attaches various event listeners to things
 */
function attachEventListeners() {
  _openerJumpButton.addEventListener( 'click', jumpToIntro, { passive: true } );
}

/**
 * Opener functions
 */
export default function init() {
  attachEventListeners();
  document.addEventListener( 'DOMContentLoaded', triggerOpener, { passive: true } );
}










/**
 * Be Water editorial feature JavaScript
 */
( function() {
  'use strict';

  return false;

  const _openerContainer = document.querySelector( '.water-opener' );
  const _openerButton = _openerContainer.querySelector( '.water-opener-button' );
  const _waterIntroduction = document.querySelector( '.water-introduction' );
  const _timelineContainer = document.querySelector( '.water-timeline-container' );
  const _lazyImages = document.querySelectorAll( '.is-lazy[data-src]' );
  const _posterContainers = document.querySelectorAll( '.water-container' );
  const _posterVideoContainers = document.querySelectorAll( '.water-video-container' );
  const _posterImageContainers = document.querySelectorAll( '.water-image-container' );
  const _relatedStoriesLinks = document.querySelectorAll( '.water-related-stories-link' );
  const _inlineStoryLinks = document.querySelectorAll( '.water-text-container .body-text a' );
  const _facebookButton = document.querySelector( '.water-opener-sticky-facebook-button' );
  const _twitterButton = document.querySelector( '.water-opener-sticky-twitter-button' );
  const posterArray = [];

  let isMobile = false;
  let currPosterIndex = 0;
  let openerImageLength = 0;
  let openerImageCompletions = 0;
  let lazyImagesObserver;
  let posterObserver;
  let documentHidden;
  let windowWidth;
  let windowHeight;

  /**
   * Sets whether the current viewport is a mobile one or not
   */
  function setIsMobile() {
    isMobile = windowWidth < 636;
  }

  /**
   * Sets some ancillary helper variables
   */
  function setAncillaryVariables() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  /**
   * Resets variables
   */
  function resetVariables() {
    setIsMobile();
    setAncillaryVariables();
  }

  /**
   * Track a custom link event in Adobe Analytics
   * @param {String} customEvent The type of event that is happening (e.g., profile:previous:click)
   */
  function trackAnalyticsEvent( customEvent ) {
    const device = isMobile ? 'mobile:' : 'desktop:';

    if ( window.espn && window.espn.track ) {
      window.espn.track.trackLink( {
        linkPos: `espncom:be-water:${device}${customEvent}`,
        linkId: null
      } );
    }
  }


  /**
   * Constructor for individual water videos to toggle play controls and auto-start/stop
   * @param {Object} _el The element representing the poster video container
   * @param {Number} index The index for the current container
   */
  const BeWaterPoster = function( _el, index ) {
    this._parent = _el;
    this._video = _el.querySelector( '.water-video' );
    this._cover = _el.querySelector( '.water-video-cover' );
    this.index = index + 1;
    this.isWithinBounds = false;
    this.hasLoaded = false;
    this.hasPlayed = false;
    this.isSinglePlay = _el.classList.contains( 'is-single-play' );
  };

  /**
   * Extend the BeWaterPoster to include various helper functions
   */
  BeWaterPoster.prototype = {

    /**
     * Checks to see if the video is greater than 7 away from the current index and deletes the
     * src so that it can be garbage collected to reduce memory drain on smaller devices
     */
    checkForGarbageCollection: function() {
      const self = this;
      const plusTen = currPosterIndex + 9;
      const minusTen = currPosterIndex - 9;

      // If within the proper bounds of ~7 water from the current
      if ( ( plusTen > self.index && minusTen > self.index ) || ( plusTen < self.index && minusTen < self.index ) ) {
        self._video.pause();
        self._video.removeAttribute( 'src' );
        self._video.load();
        self.hasLoaded = false;
      }
    },

    /**
     * Once the video ends, set the flag
     */
    setHasEnded: function() {
      this.hasPlayed = true;
    },

    /**
     * Play the video
     */
    playVideo: function() {
      const self = this;
      const modifier = self.isSinglePlay ? ! self.hasPlayed : true;
      let videoPlay;

      if ( self.isWithinBounds && modifier ) {
        videoPlay = self._video.play();

        // If the video play promise fails in here, then reset the src so the video reloads
        // Potential mobile video playback fix
        if ( undefined !== videoPlay ) {
          videoPlay.then( () => {} ).catch( () => {
            self._video.src = self._video.dataset.src;
            self.playVideo.bind( self );
          } );
        }

        trackAnalyticsEvent( `poster-seen:${self.index}` );
      }
    },

    /**
     * Pause the video
     */
    pauseVideo: function() {
      this._video.pause();
    },

    /**
     * Checks the scroll position of the video and starts or stops it depending on if it's in view
     */
    checkScrollPosition: function() {
      const self = this;
      const boundingVideoRect = self._video.getBoundingClientRect();
      const videoThreeFourthHeight = boundingVideoRect.height * 0.75;
      const modifier = windowHeight < 750 ? -1 * videoThreeFourthHeight : 0;

      // Set the boundaries to be within a half-window height of activating on descent
      const upperBound = 0 < boundingVideoRect.top + videoThreeFourthHeight;
      const lowerBound = windowHeight > boundingVideoRect.bottom + modifier;

      // Load in the video source, if it hasn't been already
      if ( ! self.hasLoaded && upperBound && lowerBound ) {
        self._video.src = self._video.dataset.src;
        self.hasLoaded = true;
      }

      if ( self._video.duration !== self._video.currentTime && self._video.paused && upperBound && lowerBound ) {
        self.playVideo();
        self.isWithinBounds = true;
        currPosterIndex = self.index;
      } else if ( ! self.isSinglePlay && ! self._video.paused && ( ! upperBound || ! lowerBound ) ) {
        self.pauseVideo();
        self.isWithinBounds = false;
      } else if ( ! self.isSinglePlay && self.hasLoaded && ( ! upperBound || ! lowerBound ) ) {
        self.checkForGarbageCollection();
      }
    },

    /**
     * Add various event listeners to this object's elements
     */
    addEventListeners: function() {
      const self = this;

      self._cover.addEventListener( 'mouseup', self.playVideo.bind( self ), { passive: true } );
      self._cover.addEventListener( 'touchend', self.playVideo.bind( self ), { passive: true } );
      _timelineContainer.addEventListener( 'mouseup', self.playVideo.bind( self ), { passive: true } );
      _timelineContainer.addEventListener( 'touchstart', self.playVideo.bind( self ), { passive: true } );

      if ( ! self.isSinglePlay ) {
        self._cover.addEventListener( 'mousedown', self.pauseVideo.bind( self ), { passive: true } );
        self._cover.addEventListener( 'touchstart', self.pauseVideo.bind( self ), { passive: true } );
      }

      self._video.addEventListener( 'ended', self.setHasEnded.bind( self ), { passive: true } );
      document.addEventListener( 'scroll', throttle( self.checkScrollPosition.bind( self ), 150 ), { passive: true } );
    },

    init: function() {
      this.addEventListeners();
    }
  };

  /**
   * Loads all of the images as a fallback for older browsers
   */
  function loadImagesFallback() {
    _lazyImages.forEach( ( _lazyImage ) => {
      const src = _lazyImage.dataset.src;

      _lazyImage.classList.remove( 'is-lazy' );
      _lazyImage.setAttribute( 'src', src );
      _lazyImage.parentElement.classList.add( 'is-loaded' );
    } );
    trackAnalyticsEvent( 'no-intersectobs' );
  }

  /**
   * Loads all of the poster containers and images as a fallback for older browsers
   */
  function loadposterContainers() {
    _posterContainers.forEach( ( _posterContainer ) => {
      _posterContainer.classList.add( 'is-visible' );
    } );
    _posterImageContainers.forEach( ( _posterImage ) => {
      _posterImage.classList.add( 'is-visible' );
    } );
    trackAnalyticsEvent( 'no-intersectobs' );
  }

  /**
   * Checks for images that need lazy loading (have the data-src attribute and 'is-lazy' attribute)
   * @param {Array} observersArray The IntersectionObserver objects
   */
  function checkForLazyLoadImages( observersArray ) {
    observersArray.forEach( ( observedItem ) => {
      let _lazyImage;
      let src;

      if ( observedItem.isIntersecting ) {
        _lazyImage = observedItem.target;
        src = _lazyImage.dataset.src;

        _lazyImage.setAttribute( 'src', src );
        window.setTimeout( () => {
          _lazyImage.classList.remove( 'is-lazy' );
          _lazyImage.parentElement.classList.add( 'is-loaded' );
        }, 250 );
        lazyImagesObserver.unobserve( _lazyImage );
      }
    } );
  }

  /**
   * Checks for the poster containers and poster images that need to be animated in somehow
   * @param {Array} observersArray The IntersectionObserver objects
   */
  function checkForposterContainers( observersArray ) {
    observersArray.forEach( ( observedItem ) => {
      let _posterContainer;

      if ( observedItem.isIntersecting ) {
        _posterContainer = observedItem.target;
        _posterContainer.classList.add( 'is-visible' );
      }
    } );
  }

  /**
   * Eases into the main timeline container area,
   * used by jumpToIntro
   */
  function scrollToIntro() {
    const _offsetTarget = _waterIntroduction.offsetTop;

    window.TweenLite.to( window, 0.5, {
      scrollTo: { y: _offsetTarget, autoKill: false }
    } );
  }

  /**
   * Unflip all the poster containers by removing the class to flip it
   */
  function unflipposterContainers() {
    _posterContainers.forEach( ( _poster ) => {
      _poster.classList.remove( 'is-flipped' );
    } );
  }

  /**
   * Give every-other visible poster container a class to flip it
   */
  function flipposterContainers() {
    const _visiblewater = document.querySelectorAll( '.water-container:not(.is-hidden)' );

    _visiblewater.forEach( ( _poster, index ) => {
      if ( 0 === ++index % 2 ) {
        _poster.classList.add( 'is-flipped' );
      }
    } );
  }

  /**
   * Jumps the opener landing page to the introductory text area
   */
  function jumpToIntro() {
    scrollToIntro();
    trackAnalyticsEvent( 'intro-jump:click' );
  }

  /**
   * Construct the poster videos
   */
  function constructposterVideoes() {
    _posterVideoContainers.forEach( ( _posterVideoContainer, index ) => {
      const posterVideo = new BeWaterPoster( _posterVideoContainer, index );
      posterVideo.init();
      posterArray.push( posterVideo );
    } );
  }

  /**
   * Determines the orientation and tracks that, on change
   * @event event (Required) The orientationchange event (not used)
   * @param {boolean} isInitialOrientation (Optional) Whether this is the first visit (true) or not (false/null)
   */
  function trackOrientationChange( event, isInitialOrientation ) {
    const twist = window.orientation;

    // Only care about tracking mobile
    if ( ! isMobile ) {
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

  /**
   * Tracks when the user switches window visibility by changing tabs
   */
  function trackVisibilityChange() {
    const isFocusLost = document[documentHidden];

    // If the focus is lost, pause all the videos
    if ( isFocusLost ) {
      posterArray.forEach( ( BeWaterPoster ) => {
        BeWaterPoster.pauseVideo();
      } );
    }

    trackAnalyticsEvent( isFocusLost ? 'tab-focus-lost' : 'tab-focus-gained' );
  }

  /**
   * Tracks the individual Related Stories link that was clicked
   * @event event The click event
   */
  function trackRelatedStoriesLink( event ) {
    const _target = event.target;
    let targetURL;

    if ( 'span' === _target.nodeName.toLowerCase() ) {
      targetURL = _target.parentElement.href;
    } else {
      targetURL = _target.href;
    }

    trackAnalyticsEvent( `related-story:click:${targetURL}` );
  }

  /**
   * Tracks the individual links within the body text that were clicked
   * @event event The click event
   */
  function trackInlineStoryLink( event ) {
    const _target = event.target;
    const targetURL = _target.href;

    trackAnalyticsEvent( `inline-link:click:${targetURL}` );
  }


  /**
   * Begins the opening sequence animation set, including transitioning in loaded images and text
   */
  function playOpenerSequence() {
    _openerContainer.classList.add( 'is-active' );
  }

  /**
   * Increments the number of loaded images for the opener sequence
   */
  function checkOpenerSequence() {
    openerImageCompletions++;

    // If all the images are loaded in, start the sequence
    if ( openerImageCompletions === openerImageLength ) {
      playOpenerSequence();
    }
  }

  /**
   * Goes through the opener landing screen animation sequence on load
   */
  function initiateOpenerSequence() {
    const viewportClass = isMobile ? '.is-mobile' : '.is-desktop';
    const _openerImages = _openerContainer.querySelectorAll( `.water-opener-image${viewportClass}` );
    openerImageLength = _openerImages.length;

    _openerImages.forEach( ( _openerImage ) => {
      _openerImage.addEventListener( 'load', checkOpenerSequence, { passive: true } );
      if ( _openerImage.complete ) {
        checkOpenerSequence();
      }
    } );

    // As a fallback, just load it after 7 seconds
    window.setTimeout( playOpenerSequence, 7000 );
  }

  /**
   * Adds various page-level event listeners
   */
  function addEventListeners() {
    let visibilityChange;

    window.addEventListener( 'resize', resetVariables, { passive: true } );
    window.addEventListener( 'orientationchange', trackOrientationChange, { passive: true } );

    _openerButton.addEventListener( 'click', jumpToIntro, { passive: true } );
    _facebookButton.addEventListener( 'click', shareToFacebook, { passive: true } );
    _twitterButton.addEventListener( 'click', shareToTwitter, { passive: true } );

    // Checks if the browser supports the IntersectionObserver and uses that, else,
    // just loads all the images and hides the Tallies
    // Modified from: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    if ( window.IntersectionObserver ) {
      lazyImagesObserver = new IntersectionObserver( checkForLazyLoadImages );
      _lazyImages.forEach( ( _lazyImage ) => {
        lazyImagesObserver.observe( _lazyImage );
      } );

      posterObserver = new IntersectionObserver( checkForposterContainers );
      _posterContainers.forEach( ( _posterContainer ) => {
        posterObserver.observe( _posterContainer );
      } );
      _posterImageContainers.forEach( ( _posterImage ) => {
        posterObserver.observe( _posterImage );
      } );
    } else {
      loadImagesFallback();
      loadposterContainers();
    }

    _relatedStoriesLinks.forEach( ( _relatedStoryLink ) => {
      _relatedStoryLink.addEventListener( 'click', trackRelatedStoriesLink, { passive: true } );
    } );

    _inlineStoryLinks.forEach( ( _inlineLink ) => {
      _inlineLink.addEventListener( 'click', trackInlineStoryLink, { passive: true } );
    } );

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

    window.addEventListener( visibilityChange, trackVisibilityChange, { passive: true } );
  }

  /**
   * Initialization function
   */
  function init() {
    // Shim for forEach on NodeLists
    // From https://stackoverflow.com/a/46057817/1472477
    if ( typeof NodeList !== 'undefined' && NodeList.prototype && ! NodeList.prototype.forEach ) {
      NodeList.prototype.forEach = Array.prototype.forEach;
      window.setTimeout( function() {
        trackAnalyticsEvent( 'older-ie:' );
      }, 3500 );
    }

    resetVariables();
    addEventListeners();
    constructposterVideoes();
    unflipposterContainers();
    flipposterContainers();

    window.setTimeout( () => {
      trackOrientationChange( null, true );
    }, 3500 );

    window.setTimeout( initiateOpenerSequence, 500);
    window.setTimeout( resetVariables, 2000 );
  }

  document.addEventListener( 'DOMContentLoaded', init, false );
}() );
