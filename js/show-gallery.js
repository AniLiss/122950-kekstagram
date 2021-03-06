'use strict';
window.showGalleryItem = function (url, likes, comments) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var closeGalleryBtn = galleryOverlay.querySelector('.gallery-overlay-close');

  galleryOverlay.classList.remove('invisible');
  galleryOverlay.querySelector('.gallery-overlay-image').src = url;
  galleryOverlay.querySelector('.gallery-overlay-controls-like').innerText = likes;
  galleryOverlay.querySelector('.gallery-overlay-controls-comments').innerText = comments;

  var closeGalleryOverlay = function (galleryOverlayData) {
    return function (e) {
      if (e.keyCode === window.keyCodes.escKeyCode || e.keyCode === window.keyCodes.enterKeyCode || e.which === 1) {
        window.closeGalleryOverlayCb(galleryOverlayData);
      }
    };
  };
  closeGalleryBtn.addEventListener('click', closeGalleryOverlay(galleryOverlay));
  closeGalleryBtn.addEventListener('keydown', closeGalleryOverlay(galleryOverlay));
  galleryOverlay.addEventListener('keydown', closeGalleryOverlay(galleryOverlay));
};
