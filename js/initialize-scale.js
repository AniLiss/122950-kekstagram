'use strict';
window.createScale = (function () {
  return function (resizeControls, ZOOM_STEP, ZOOM_VALUE) {
    var incSizeBtn = resizeControls.querySelector('.upload-resize-controls-button-inc');
    var decSizeBtn = resizeControls.querySelector('.upload-resize-controls-button-dec');

    var syncState = function (widgetRootElem) {
      displayZoomValue(widgetRootElem);
      scaleZoomableElement();
    };

    function displayZoomValue(widgetRootElem) {
      var resizeControlsValue = widgetRootElem.querySelector('input');
      resizeControlsValue.value = ZOOM_VALUE + '%';
    }

    function scaleZoomableElement() {
      var scale = ZOOM_VALUE / 100;
      window.filterImagePreview.style = 'transform: scale(' + scale + ')';
    }

    syncState(resizeControls);
    var scaleUp = function (widgetRootElem, step) {
      return function () {
        if (ZOOM_VALUE <= 100 - step) {
          ZOOM_VALUE += step;
        } else {
          ZOOM_VALUE = 100;
        }
        syncState(widgetRootElem);
      };
    };

    var scaleDown = function (widgetRootElem, step) {
      return function () {
        if (ZOOM_VALUE > step) {
          ZOOM_VALUE -= step;
        }
        syncState(widgetRootElem);
      };
    };
    decSizeBtn.addEventListener('click', scaleDown(resizeControls, ZOOM_STEP));
    incSizeBtn.addEventListener('click', scaleUp(resizeControls, ZOOM_STEP));
  };
})();
