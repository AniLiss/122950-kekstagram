'use strict';
var ZOOM_VALUE;
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

function createScale(widgetRootElem, step, initialValue) {
  var incSizeBtn = widgetRootElem.querySelector('.upload-resize-controls-button-inc');
  var decSizeBtn = widgetRootElem.querySelector('.upload-resize-controls-button-dec');
  ZOOM_VALUE = initialValue;

  incSizeBtn.addEventListener('click', scaleUp(widgetRootElem, step));
  decSizeBtn.addEventListener('click', scaleDown(widgetRootElem, step));

  syncState(widgetRootElem);
}

window.createScale = createScale;
