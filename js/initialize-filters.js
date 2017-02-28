'use strict';
window.initializeFilters = (function () {
  return function (applyFilter) {
    var uploadForm = document.querySelector('.upload-filter');
    var filterControls = uploadForm.querySelector('.upload-filter-controls');

    var initializeFilterSlider = function (sliderHandlerBox) {
      // var sliderHandlerBox = filterControls.querySelector('.upload-filter-level');
      var sliderHandler = sliderHandlerBox.querySelector('.upload-filter-level-pin');
      var sliderFillLine = sliderHandlerBox.querySelector('.upload-filter-level-val');
      var MIN_FILTER_VAL = 0;
      var MAX_FILTER_VAL = 450;

      var applyFilterValue = function (maxFilterValue, currentFilterFactor) {
        var filterFactor = (currentFilterFactor / maxFilterValue).toFixed(2);
        return filterFactor;
      };

      var moveHandlerFillLine = function (handlerShiftVal) {
        if ((handlerShiftVal > MIN_FILTER_VAL) && (handlerShiftVal < MAX_FILTER_VAL)) {
          sliderHandler.style.left = handlerShiftVal + 'px';
          sliderFillLine.style.width = handlerShiftVal + 'px';
        } else if (handlerShiftVal > MAX_FILTER_VAL) {
          sliderHandler.style.left = MAX_FILTER_VAL + 'px';
          sliderFillLine.style.width = MAX_FILTER_VAL + 'px';
        } else if (handlerShiftVal < MIN_FILTER_VAL) {
          sliderHandler.style.left = MIN_FILTER_VAL + 'px';
          sliderFillLine.style.width = MIN_FILTER_VAL + 'px';
        }
      };

      var onMouseMove = function (startCordX) {
        return function (moveEvt) {
          moveEvt.preventDefault();
          var currentCordX = moveEvt.clientX;
          var shift = startCordX - currentCordX;
          var handlerShift = sliderHandler.offsetLeft - shift;
          moveHandlerFillLine(handlerShift);
          applyFilterValue(MAX_FILTER_VAL, handlerShift);
        };
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        sliderHandlerBox.removeEventListener('mousemove', onMouseMove);
        sliderHandlerBox.removeEventListener('mouseup', onMouseUp);
      };

      sliderHandler.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCordX = evt.clientX;

        sliderHandlerBox.addEventListener('mousemove', onMouseMove(startCordX));
        sliderHandlerBox.addEventListener('mouseup', onMouseUp);
      });
    };

    var showFilterSlider = function (targetFilter) {
      var sliderHandlerBox = filterControls.querySelector('.upload-filter-level');

      if (targetFilter === 'upload-filter-none') {
        if (!sliderHandlerBox.classList.contains('invisible')) {
          sliderHandlerBox.classList.add('invisible');
        }
      } else if (targetFilter !== 'upload-filter-none') {
        if (sliderHandlerBox.classList.contains('invisible')) {
          sliderHandlerBox.classList.remove('invisible');
        }
      }
      initializeFilterSlider(sliderHandlerBox);
    };

    var switchFilter = function (e) {
      var targetFilter = e.target.parentNode.htmlFor ? e.target.parentNode.htmlFor : e.target.id;
      showFilterSlider(targetFilter);
      if (targetFilter) {
        var filterValue = e.currentTarget.querySelector('#' + targetFilter).value;
        var filterName = 'filter-' + filterValue;
        applyFilter(filterName);
      }
    };

    filterControls.addEventListener('keydown', function (e) {
      if (e.keyCode === window.ENTER_KEY_CODE) {
        var labelElements = e.currentTarget.querySelectorAll('.upload-filter-label');
        for (var i = 0; i < labelElements.length; i++) {
          labelElements[i].attributes['aria-checked'].nodeValue = false;
        }
        e.target.attributes['aria-checked'].nodeValue = true;
        switchFilter(e);
      }
    });

    filterControls.addEventListener('click', switchFilter);
  };
})();
