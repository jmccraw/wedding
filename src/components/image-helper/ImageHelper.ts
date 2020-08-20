import { setLazyPictures, watchForLazyImages } from '../../utilities/LazyLoadImages.js';

/**
 * Initialize the Image Helper
 */
export default function init() {
  const _lazyImages = document.querySelectorAll( '.is-lazy[data-src]' );
  setLazyPictures( _lazyImages );
  watchForLazyImages();
}