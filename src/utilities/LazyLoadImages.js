let _lazyPictures = null;

/**
 * Sets the _lazyPictures variable
 */
export function setLazyPictures( _els ) {
  _lazyPictures = _els;
}

/**
 * Checks for lazy images loading in
 */
function checkForLazyImages() {

  // Modified from https://codepen.io/GreenSock/pen/OJMaEOP

  window.gsap.utils.toArray( _lazyPictures ).forEach( ( _image ) => {
    let newSrc = _image.dataset.src;
    let _newImage = document.createElement("img");

    let loadImage = () => {
      _newImage.onload = () => {

        // Avoid recursion
        _newImage.onload = null;
        _image.setAttribute( 'src', newSrc );
        _image.classList.remove( 'is-lazy' );
        st && st.kill();
      }
      _newImage.setAttribute( 'src', newSrc );
    };

    let st = window.ScrollTrigger.create( {
      trigger: _image,
      start: '-50% bottom',
      onEnter: loadImage,

      // Make sure it works in either direction
      onEnterBack: loadImage
    } );
  } );
}

export function watchForLazyImages() {

  // Shim for forEach on NodeLists
  // From https://stackoverflow.com/a/46057817/1472477
  if ( typeof NodeList !== 'undefined' && NodeList.prototype && ! NodeList.prototype.forEach ) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  checkForLazyImages();
}
