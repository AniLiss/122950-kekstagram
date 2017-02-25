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

  var onLoad = (function () {
    return function (evt) {
      var data = JSON.parse(evt.target.response);
      picturesList = data;
      renderPictures(picturesList);
    };
  })();

  window.load(DATA_URL, onLoad);
}());

// var onLoad = (function () {
//   return function (evt) {
//     var data = JSON.parse(evt.target.response);
//     var picturesContainer = document.querySelector('.pictures');
//     var templateElement = document.querySelector('#picture-template');
//     var elementToClone = templateElement.content.querySelector('.picture');
//
//     var showGalleryItem = function (e) {
//       e.preventDefault();
//       var url = e.target.parentNode.querySelector('img').src;
//       var comment = e.target.parentNode.querySelector('.picture-comments').innerText;
//       var likes = e.target.parentNode.querySelector('.picture-likes').innerText;
//       window.console.log(likes);
//       window.showGallery(url, likes, comment);
//     };
//
//     var renderPicture = function (elemToCln, picCont) {
//       data.forEach(function (object) {
//         var newElement = elemToCln.cloneNode(true);
//         newElement.querySelector('img').src = object.url;
//         newElement.querySelector('.picture-comments').innerText = object.comments.length;
//         newElement.querySelector('.picture-likes').innerText = object.likes;
//         picCont.appendChild(newElement); });
//       picturesList = data;
//       picCont.addEventListener('click', showGalleryItem);
//
//     };
//     renderPicture(elementToClone, picturesContainer);
//   };
// })();
