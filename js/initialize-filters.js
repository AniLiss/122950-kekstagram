'use strict';
window.initializeFilters = (function () {
  return function (applyFilter) {
    var uploadForm = document.querySelector('.upload-filter');
    var filterControls = uploadForm.querySelector('.upload-filter-controls');
    var sliderHandlerBox = filterControls.querySelector('.upload-filter-level');

    var moveFilterSlider = function () {
      var sliderHandler = sliderHandlerBox.querySelector('.upload-filter-level-pin');
      var sliderFillLine = sliderHandlerBox.querySelector('.upload-filter-level-val');

      sliderHandler.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          var shift = {
            x: startCoords.x - moveEvt.clientX
          };

          startCoords = {
            x: moveEvt.clientX
          };

          var moveHandlerFillLine = function (handlerShiftVal) {
            if ((handlerShiftVal > 0) && (handlerShiftVal < 450)) {
              sliderHandler.style.left = handlerShiftVal + 'px';
              sliderFillLine.style.width = handlerShiftVal + 'px';
            } else if (handlerShiftVal > 450) {
              sliderHandler.style.left = 450 + 'px';
              sliderFillLine.style.width = 450 + 'px';
            } else if (handlerShiftVal < 0) {
              sliderHandler.style.left = 0 + 'px';
              sliderFillLine.style.width = 0 + 'px';
            }
          };
          var handlerShift = sliderHandler.offsetLeft - shift.x;
          moveHandlerFillLine(handlerShift);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          sliderHandlerBox.removeEventListener('mousemove', onMouseMove);
          sliderHandlerBox.removeEventListener('mouseup', onMouseUp);
        };

        sliderHandlerBox.addEventListener('mousemove', onMouseMove);
        sliderHandlerBox.addEventListener('mouseup', onMouseUp);
      });
    };

    moveFilterSlider();

    var showFilterSlider = function (targetFilter) {
      if (targetFilter === 'upload-filter-none') {
        if (!sliderHandlerBox.classList.contains('invisible')) {
          sliderHandlerBox.classList.add('invisible');
        }
      } else if (targetFilter !== 'upload-filter-none') {
        if (sliderHandlerBox.classList.contains('invisible')) {
          sliderHandlerBox.classList.remove('invisible');
        }
      }
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
