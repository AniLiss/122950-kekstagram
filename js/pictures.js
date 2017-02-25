'use strict';
var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
var picturesList = [];
var onLoad = (function () {
  return function (evt) {
    var data = JSON.parse(evt.target.response);
    var picturesContainer = document.querySelector('.pictures');
    var templateElement = document.querySelector('#picture-template');
    var elementToClone = templateElement.content.querySelector('.picture');

    var showGalleryCb = function (url, comments, likes) {
      return function () {
        window.showGallery(url, comments, likes);
      };
    };

    var renderPicture = function (elemToCln, picCont) {
      data.forEach(function (object) {
        picturesList.push(object);
        var newElement = elemToCln.cloneNode(true);
        newElement.querySelector('img').src = object.url;
        newElement.querySelector('.picture-comments').innerText = object.comments;
        newElement.querySelector('.picture-likes').innerText = object.likes;
        picCont.appendChild(newElement);
        newElement.addEventListener('click', showGalleryCb(object.url, object.comments, object.likes));
      });
    };
    renderPicture(elementToClone, picturesContainer);
  };
})();

window.load(DATA_URL, onLoad);
