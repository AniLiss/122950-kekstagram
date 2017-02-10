/**
 * Created by Elizabeth Anatskaya on 31.01.2017.
 */
'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancelBtn = uploadOverlay.querySelector('.upload-form-cancel');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFileBtn = uploadSelectImage.querySelector('#upload-file');
var uploadFileLabel = uploadSelectImage.querySelector('.upload-file');
var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
var incSizeBtn = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var decSizeBtn = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeControlsValue = uploadOverlay.querySelector('input');
var ZOOM_STEP = 25;

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;
filterImagePreview.style = 'transform: scale(0.55)';

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
};

uploadFormCancelBtn.addEventListener('click', closeUploadOverlay);
uploadOverlay.addEventListener('keydown', function (e) {
  if (e.keyCode === ESC_KEY_CODE) {
    closeUploadOverlay();
  }
});

var showUploadOverlay = function () {
  filterImagePreview.style = 'transform: scale(0.55)';
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');

};

uploadFileBtn.addEventListener('change', showUploadOverlay);

uploadFileLabel.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEY_CODE) {
    showUploadOverlay();
  }
});

filterControls.addEventListener('click', switchFilter);

filterControls.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEY_CODE) {
    var labelElements = e.currentTarget.querySelectorAll('.upload-filter-label');
    for (var i = 0; i < labelElements.length; i++) {
      labelElements[i].attributes['aria-checked'].nodeValue = false;
    }
    e.target.attributes['aria-checked'].nodeValue = true;
    window.switchFilter(e);
  }
});

incSizeBtn.addEventListener('click', window.increasePhotoSize(ZOOM_STEP));

decSizeBtn.addEventListener('click', window.decreasePhotoSize(ZOOM_STEP));
