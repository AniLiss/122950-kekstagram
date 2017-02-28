'use strict';
window.initializeForm = (function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancelBtn = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadFileBtn = uploadSelectImage.querySelector('#upload-file');
  var uploadFileLabel = uploadSelectImage.querySelector('.upload-file');
  var resizeControls = document.querySelector('.upload-resize-controls');
  var filterImagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var ZOOM_STEP = 25;
  var ZOOM_VALUE = 55;

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
  };

  uploadFormCancelBtn.addEventListener('click', closeUploadOverlay);
  uploadOverlay.addEventListener('keydown', function (e) {
    if (e.keyCode === window.keyCodes.escKeyCode) {
      closeUploadOverlay();
    }
  });

  var showUploadOverlay = function () {
    uploadOverlay.classList.remove('invisible');
    uploadSelectImage.classList.add('invisible');

  };

  uploadFileBtn.addEventListener('change', showUploadOverlay);
  uploadFileLabel.addEventListener('keydown', function (e) {
    if (e.keyCode === window.keyCodes.enterKeyCode) {
      showUploadOverlay();
    }
  });

  var applyFilter = function (filterName, filterFactor) {
    filterImagePreview.className = 'filter-image-preview';
    filterImagePreview.classList.add(filterName);

    if (filterImagePreview.classList.contains('filter-chrome')) {
      filterImagePreview.style.filter = 'grayscale(' + filterFactor + ')';
    } else if (filterImagePreview.classList.contains('filter-sepia')) {
      filterImagePreview.style.filter = 'sepia(' + filterFactor + ')';
    } else if (filterImagePreview.classList.contains('filter-marvin')) {
      filterImagePreview.style.filter = 'invert(' + filterFactor + ')';
    } else if (filterImagePreview.classList.contains('filter-phobos')) {
      filterImagePreview.style.filter = 'blur(' + filterFactor * 100 + 'px)';
    } else if (filterImagePreview.classList.contains('filter-heat')) {
      filterImagePreview.style.filter = 'saturate(' + filterFactor * 10 + ')';
    } else if (filterImagePreview.classList.contains('filter-none')) {
      filterImagePreview.style.filter = '';
    }
  };

  var zoomChangeCb = function (zoom) {
    filterImagePreview.style.transform = 'scale(' + zoom / 100 + ')';
  };

  window.initializeFilters(applyFilter);
  window.createScale(resizeControls, ZOOM_STEP, ZOOM_VALUE, zoomChangeCb);
})();

