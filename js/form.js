/**
 * Created by Elizabeth Anatskaya on 31.01.2017.
 */
'use strict';

var uploadFormCancel = document.querySelector('.upload-form-cancel');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = document.querySelector('#upload-file');
var uploadFilters = document.querySelectorAll('input[name="upload-filter"]');
var filterImagePreview = document.querySelector('.filter-image-preview');

var uploadResizeControls = document.querySelector('.upload-resize-controls');
var uploadResizeControlsValue = document.querySelector('.upload-resize-controls > input');

uploadFormCancel.onclick = function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
}

var showUploadOverlay = function () {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
}

uploadFile.addEventListener('change', showUploadOverlay);

var changeFilter = function (e) {
  filterImagePreview.className = 'filter-image-preview';
  var filterName = 'filter-' + e.currentTarget.value;
  filterImagePreview.classList.add(filterName);
}

for (var i = 0; i < uploadFilters.length; i++) {
  uploadFilters[i].addEventListener('click', changeFilter);
}

filterImagePreview.style = 'transform: scale(0.55)';

var changePhotoSize = function (e) {

  var zoomValue = +uploadResizeControlsValue.value.slice(0, -1);
  if (e.target.classList.contains('upload-resize-controls-button-inc') && zoomValue < 100) {
    if ((zoomValue + 25) >= 100) {
      uploadResizeControlsValue.value = 100 + '%';
      zoomValue = 100;
      filterImagePreview.style = 'transform: scale(1)';
    } else {
      uploadResizeControlsValue.value = (zoomValue += 25) + '%';
      filterImagePreview.style = 'transform: scale(0.' + zoomValue +')';
    }

  } else if (e.target.classList.contains('upload-resize-controls-button-dec') && zoomValue > 0) {
    if ((zoomValue - 25) <= 25) {
      uploadResizeControlsValue.value = 25 + '%';
      filterImagePreview.style = 'transform: scale(0.25)';
      zoomValue = 25;
    } else {
      uploadResizeControlsValue.value = (zoomValue -= 25) + '%';
      filterImagePreview.style = 'transform: scale(0.' + zoomValue +')';
    }
  }
}

uploadResizeControls.addEventListener('click', changePhotoSize);






