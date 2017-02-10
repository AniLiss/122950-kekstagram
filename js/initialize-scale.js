'use strict';

window.increasePhotoSize = function(zoomStep) {
  return function () {
    var zoomValue = +resizeControlsValue.value.slice(0, -1);
    if ((zoomValue + zoomStep) >= 100) {
      resizeControlsValue.value = 100 + '%';
      filterImagePreview.style = 'transform: scale(1)';
    } else {
      resizeControlsValue.value = (zoomValue += zoomStep) + '%';
      filterImagePreview.style = 'transform: scale(0.' + zoomValue + ')';
    }
  };
};

window.decreasePhotoSize = function(zoomStep) {
  return function () {
    var zoomValue = +resizeControlsValue.value.slice(0, -1);
    if ((zoomValue - zoomStep) <= zoomStep) {
      resizeControlsValue.value = zoomStep + '%';
      filterImagePreview.style = 'transform: scale(0.25)';
    } else {
      resizeControlsValue.value = (zoomValue -= zoomStep) + '%';
      filterImagePreview.style = 'transform: scale(0.' + zoomValue + ')';
    }
  };
};
