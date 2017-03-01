'use strict';
window.initializeFilters = (function () {
  return function (applyFilter) {
    var uploadForm = document.querySelector('.upload-filter');
    var filterControls = uploadForm.querySelector('.upload-filter-controls');
    var sliderHandlerBox = filterControls.querySelector('.upload-filter-level');
    var sliderLine = sliderHandlerBox.querySelector('.upload-filter-level-line');
    var filterFactor = 0.3; // this is not a constant value; the value of this variable changes everytime when applyFilterValue function is called (string 12)
    var filterName;

    var applyFilterValue = function (maxFilterValue, currentFilterFactor) {
      filterFactor = (currentFilterFactor / maxFilterValue).toFixed(2);
      applyFilter(filterName, filterFactor);
    };

    var initializeFilterSlider = function (sliderRootElem) {
      var sliderHandler = sliderRootElem.querySelector('.upload-filter-level-pin');
      var sliderFillLine = sliderRootElem.querySelector('.upload-filter-level-val');
      var MIN_FILTER_VAL = 0;
      var MAX_FILTER_VAL = 450;
      var handlerIsDragged = false;

      var moveHandlerFillLine = function (handlerShiftVal) {
        if (handlerShiftVal > MAX_FILTER_VAL) {
          sliderHandler.style.left = MAX_FILTER_VAL + 'px';
          sliderFillLine.style.width = MAX_FILTER_VAL + 'px';
        } else if (handlerShiftVal < MIN_FILTER_VAL) {
          sliderHandler.style.left = MIN_FILTER_VAL + 'px';
          sliderFillLine.style.width = MIN_FILTER_VAL + 'px';
        } else {
          sliderHandler.style.left = handlerShiftVal + 'px';
          sliderFillLine.style.width = handlerShiftVal + 'px';
        }
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        if (handlerIsDragged) {
          var currentCordX = moveEvt.clientX;
          var handlerShift = currentCordX - sliderLine.getBoundingClientRect().left;

          moveHandlerFillLine(handlerShift);
          applyFilterValue(MAX_FILTER_VAL, handlerShift);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        handlerIsDragged = false;
      };

      var onMouseDown = function (evt) {
        evt.preventDefault();
        handlerIsDragged = true;
      };

      sliderHandler.addEventListener('mousedown', onMouseDown);
      sliderHandler.addEventListener('mouseup', onMouseUp);
      sliderHandlerBox.addEventListener('mouseup', onMouseUp);
      sliderRootElem.addEventListener('mousemove', onMouseMove);
    };


    var showFilterSlider = function (targetFilter) {

      if (targetFilter === 'upload-filter-none') {
        sliderHandlerBox.classList.add('invisible');
      } else {
        sliderHandlerBox.classList.remove('invisible');
      }
    };

    var switchFilter = function (e) {
      var targetFilter;
      if (e.target.parentNode.htmlFor) {
        targetFilter = e.target.parentNode.htmlFor;
      } else if (e.target.htmlFor) {
        targetFilter = e.target.htmlFor;
      } else if (e.target.id) {
        targetFilter = e.target.id;
      }
      showFilterSlider(targetFilter);
      if (targetFilter) {
        var filterValue = e.currentTarget.querySelector('#' + targetFilter).value;
        filterName = 'filter-' + filterValue;
        applyFilter(filterName, filterFactor);
      }
    };

    filterControls.addEventListener('keydown', function (e) {
      if (e.keyCode === window.keyCodes.enterKeyCode) {
        var labelElements = e.currentTarget.querySelectorAll('.upload-filter-label');
        for (var i = 0; i < labelElements.length; i++) {
          labelElements[i].attributes['aria-checked'].nodeValue = false;
        }
        e.target.attributes['aria-checked'].nodeValue = true;
        switchFilter(e);
      }
    });

    filterControls.addEventListener('click', switchFilter);
    initializeFilterSlider(sliderHandlerBox);
  };
})();
