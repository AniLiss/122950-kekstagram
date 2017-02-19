'use strict';
window.uploadOverlay = document.querySelector('.upload-overlay');
var resizeControlsValue = window.uploadOverlay.querySelector('input');
var incSizeBtn = window.uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var decSizeBtn = window.uploadOverlay.querySelector('.upload-resize-controls-button-dec');

var increasePhotoSize = function (elem, zoomStep) {
  return function () {
    var zoomValue = +resizeControlsValue.value.slice(0, -1);
    if ((zoomValue + zoomStep) >= 100) {
      resizeControlsValue.value = 100 + '%';
      elem.style = 'transform: scale(1)';
    } else {
      resizeControlsValue.value = (zoomValue += zoomStep) + '%';
      elem.style = 'transform: scale(0.' + zoomValue + ')';
    }
  };
};

var decreasePhotoSize = function (elem, zoomStep) {
  return function () {
    var zoomValue = +resizeControlsValue.value.slice(0, -1);
    if ((zoomValue - zoomStep) <= zoomStep) {
      resizeControlsValue.value = zoomStep + '%';
      elem.style = 'transform: scale(0.25)';
    } else {
      resizeControlsValue.value = (zoomValue -= zoomStep) + '%';
      elem.style = 'transform: scale(0.' + zoomValue + ')';
    }
  };
};

function createScale(elem, step) {
  incSizeBtn.addEventListener('click', increasePhotoSize(elem, step));
  decSizeBtn.addEventListener('click', decreasePhotoSize(elem, step));
}
window.createScale = createScale;
