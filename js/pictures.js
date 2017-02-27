'use strict';
(function () {
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var picturesList = [];

  var prapareGalleryItemToShow = function (e) {
    e.preventDefault();
    var url = e.target.parentNode.querySelector('img').src;
    var comment = e.target.parentNode.querySelector('.picture-comments').innerText;
    var likes = e.target.parentNode.querySelector('.picture-likes').innerText;
    window.showGalleryItem(url, likes, comment);
  };

  var renderPictures = function (pictures) {
    var picturesContainer = document.querySelector('.pictures');
    var templateElement = document.querySelector('#picture-template');
    var elementToClone = templateElement.content.querySelector('.picture');

    picturesContainer.innerHTML = '';

    var renderPicture = function (dataObject) {
      var newElement = elementToClone.cloneNode(true);
      newElement.querySelector('img').src = dataObject.url;
      newElement.querySelector('.picture-comments').innerText = dataObject.comments.length;
      newElement.querySelector('.picture-likes').innerText = dataObject.likes;
      picturesContainer.appendChild(newElement);
    };

    pictures.forEach(function (object) {
      renderPicture(object);
    });

    picturesContainer.addEventListener('click', prapareGalleryItemToShow);
  };

  var candidateNotPresentInResult = function (list, candidate) {
    for (var j = 0; j < list.length; j++) {
      if (list[j] === candidate) {
        return false;
      }
    }
    return true;
  };

  var createRandomPictureList = function (picturesListToRandom) {
    var result = [];
    while (result.length < 10) {
      var randomIndex = Math.floor(Math.random() * (picturesListToRandom.length));
      var candidate = picturesList[randomIndex];
      if (candidateNotPresentInResult(result, candidate)) {
        result.push(candidate);
      }
    }
    return result;
  };

  var sortByCommentNumber = function (picturesListArray) {
    var sortedByCommentNumber = picturesListArray.slice(0);
    sortedByCommentNumber.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return sortedByCommentNumber;
  };

  var sortPhotos = (function () {
    return function (e) {
      var filterValue = e.target.htmlFor;
      var randomPictures = [];
      if (filterValue === 'filter-popular') {
        renderPictures(picturesList);
      } else if (filterValue === 'filter-new') {
        randomPictures = createRandomPictureList(picturesList);
        renderPictures(randomPictures);
      } else if (filterValue === 'filter-discussed') {
        var sortedArray = sortByCommentNumber(picturesList);
        renderPictures(sortedArray);
      }
    };
  })();

  var enableFilters = function () {
    var filters = document.querySelector('.filters');
    filters.classList.remove('hidden');
    filters.addEventListener('click', sortPhotos);
  };

  var onLoad = (function () {
    return function (evt) {
      var data = JSON.parse(evt.target.response);
      picturesList = data;
      renderPictures(picturesList);
      enableFilters();
    };
  })();

  window.load(DATA_URL, onLoad);
}());
