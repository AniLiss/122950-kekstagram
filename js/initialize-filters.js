'use strict';
window.initializeFilters = function () {
  var uploadForm = document.querySelector('.upload-filter');
  var filterControls = uploadForm.querySelector('.upload-filter-controls');

  var switchFilter = function (e) {
    var targetFilter = e.target.parentNode.htmlFor ? e.target.parentNode.htmlFor : e.target.htmlFor;
    if (targetFilter) {
      var filterValue = e.currentTarget.querySelector('#' + targetFilter).value;
      var filterName = 'filter-' + filterValue;
      window.filterImagePreview.className = 'filter-image-preview';
      window.filterImagePreview.classList.add(filterName);
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
