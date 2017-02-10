/**
 * Created by Elizabeth Anatskaya  on 06.02.2017.
 */
'use strict';
window.switchFilter = function (e) {
  var targetFilter = e.target.parentNode.htmlFor ? e.target.parentNode.htmlFor : e.target.htmlFor;
  if (targetFilter) {
    var filterValue = e.currentTarget.querySelector('#' + targetFilter).value;
    var filterName = 'filter-' + filterValue;
    filterImagePreview.className = 'filter-image-preview';
    filterImagePreview.classList.add(filterName);
  }
};
