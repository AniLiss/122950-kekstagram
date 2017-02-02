/**
 * Created by Elizabeth Anatskaya on 31.01.2017.
 */
'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancelBtn = uploadOverlay.querySelector('.upload-form-cancel');

var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
var incSizeBtn = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var decSizeBtn = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeControlsValue = uploadOverlay.querySelector('input');
var zoomStep = 25;
filterImagePreview.style = 'transform: scale(0.55)';

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
};

uploadFormCancelBtn.addEventListener('click', closeUploadOverlay);

var showUploadOverlay = function () {
  filterImagePreview.style = 'transform: scale(0.55)';
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
};

uploadFile.addEventListener('change', showUploadOverlay);

var switchFilter = function (e) {
  var targetFilter = e.target.parentNode.htmlFor;
  if (targetFilter !== undefined) {
    var filterName = 'filter-' + e.currentTarget.querySelector('#' + targetFilter).value;
    filterImagePreview.className = 'filter-image-preview';
    filterImagePreview.classList.add(filterName);
  }
};

filterControls.addEventListener('click', switchFilter, false);

var increasePhotoSize = function () {
  var zoomValue = +resizeControlsValue.value.slice(0, -1);
  if ((zoomValue + zoomStep) >= 100) {
    resizeControlsValue.value = 100 + '%';
    filterImagePreview.style = 'transform: scale(1)';
  } else {
    resizeControlsValue.value = (zoomValue += zoomStep) + '%';
    filterImagePreview.style = 'transform: scale(0.' + zoomValue + ')';
  }
};

incSizeBtn.addEventListener('click', increasePhotoSize);

var decreasePhotoSize = function () {
  var zoomValue = +resizeControlsValue.value.slice(0, -1);
  if ((zoomValue - zoomStep) <= zoomStep) {
    resizeControlsValue.value = zoomStep + '%';
    filterImagePreview.style = 'transform: scale(0.25)';
  } else {
    resizeControlsValue.value = (zoomValue -= zoomStep) + '%';
    filterImagePreview.style = 'transform: scale(0.' + zoomValue + ')';
  }
};

decSizeBtn.addEventListener('click', decreasePhotoSize);
