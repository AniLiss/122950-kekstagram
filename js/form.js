/**
 * Created by Elizabeth Anatskaya on 31.01.2017.
 */
'use strict';
var uploadFormCancelBtn = window.uploadOverlay.querySelector('.upload-form-cancel');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFileBtn = window.uploadSelectImage.querySelector('#upload-file');
var uploadFileLabel = uploadSelectImage.querySelector('.upload-file');
var filterImagePreview = window.uploadOverlay.querySelector('.filter-image-preview');
var ZOOM_STEP = 25;

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
};

uploadFormCancelBtn.addEventListener('click', closeUploadOverlay);
window.uploadOverlay.addEventListener('keydown', function (e) {
  if (e.keyCode === ESC_KEY_CODE) {
    closeUploadOverlay();
  }
});

var showUploadOverlay = function () {
  // filterImagePreview.style = 'transform: scale(0.55)';
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');

};

uploadFileBtn.addEventListener('change', showUploadOverlay);
uploadFileLabel.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEY_CODE) {
    showUploadOverlay();
  }
});


window.initializeFilters();
window.createScale(filterImagePreview, ZOOM_STEP);
