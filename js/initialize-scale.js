'use strict';
window.createScale = (function () {
  return function (resizeControls, zoomStep, zoomValue, zoomChangeCb) {
    var incSizeBtn = resizeControls.querySelector('.upload-resize-controls-button-inc');
    var decSizeBtn = resizeControls.querySelector('.upload-resize-controls-button-dec');

    var syncState = function (widgetRootElem) {
      displayZoomValue(widgetRootElem);
      zoomChangeCb(zoomValue);
    };

    function displayZoomValue(widgetRootElem) {
      var resizeControlsValue = widgetRootElem.querySelector('input');
      resizeControlsValue.value = zoomValue + '%';
    }

    syncState(resizeControls);
    var scaleUp = function (widgetRootElem, step) {
      return function () {
        if (zoomValue <= 100 - step) {
          zoomValue += step;
        } else {
          zoomValue = 100;
        }
        syncState(widgetRootElem);
      };
    };

    var scaleDown = function (widgetRootElem, step) {
      return function () {
        if (zoomValue > step) {
          zoomValue -= step;
        }
        syncState(widgetRootElem);
      };
    };
    decSizeBtn.addEventListener('click', scaleDown(resizeControls, zoomStep));
    incSizeBtn.addEventListener('click', scaleUp(resizeControls, zoomStep));
  };
})();
