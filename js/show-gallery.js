'use strict';
window.showGallery = function (url, likes, comments) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  // var closeGalleryBtn = galleryOverlay.querySelector('.gallery-overlay-close');
  galleryOverlay.classList.remove('invisible');
  galleryOverlay.querySelector('.gallery-overlay-image').src = url;
  galleryOverlay.querySelector('.gallery-overlay-controls-like').innerText = likes;
  galleryOverlay.querySelector('.gallery-overlay-controls-comments').innerText = comments;

  // var closeGalleryOverlay = function () {
  //   galleryOverlay.classList.add('invisible');
  // };
  // closeGalleryBtn.addEventListener('click', closeGalleryOverlay);
};
