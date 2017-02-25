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

  var checkElementExistence = function (randomPictures, currentPicture) {
    for (var j = 0; j < randomPictures.length; j++) {
      if (randomPictures[j] === currentPicture) {
        return false;
      }
    }
    return randomPictures.push(currentPicture);
  };

  var createRandomPictureList = function (randomPictures, currentPicturesList) {
    while (randomPictures.length < 10) {
      var randomIndex = Math.floor(Math.random() * (currentPicturesList.length));
      var currentPicture = currentPicturesList[randomIndex];
      checkElementExistence(randomPictures, currentPicture);
    }
  };

  var sortPhotos = (function () {
    return function (e) {
      var filterValue = e.target.htmlFor;
      var randomPictures = [picturesList[0]];
      if (filterValue === 'filter-popular') {
        renderPictures(picturesList);
      } else if (filterValue === 'filter-new') {
        createRandomPictureList(randomPictures, picturesList);
        renderPictures(randomPictures);
      } else if (filterValue === 'filter-discussed') {
        var sortedByCommentNumber = picturesList;
        for (var i = 0; i < picturesList.length; i++) {
          sortedByCommentNumber.sort(function (a, b) {
            if (a.comments.length > b.comments.length) {
              return 1;
            }
            if (a.comments.length < b.comments.length) {
              return -1;
            }
            return 0;
          });
        }
        renderPictures(sortedByCommentNumber);
      }
    };
  })();

  var filterPhotos = function () {
    var filters = document.querySelector('.filters');
    filters.classList.remove('hidden');
    filters.addEventListener('click', sortPhotos);
  };

  var onLoad = (function () {
    return function (evt) {
      var data = JSON.parse(evt.target.response);
      picturesList = data;
      renderPictures(picturesList);
      filterPhotos();
    };
  })();

  window.load(DATA_URL, onLoad);
}());
