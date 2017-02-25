'use strict';
var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
var picturesList = [];
var onLoad = (function () {
  return function (evt) {
    var data = JSON.parse(evt.target.response);
    var picturesContainer = document.querySelector('.pictures');
    var templateElement = document.querySelector('#picture-template');
    var elementToClone = templateElement.content.querySelector('.picture');

    // var showGalleryCb = function (url, likes, comments) {
    //   return function () {
    //     window.showGallery(url, likes, comments);
    //   };
    // };

    var showGalleryItem = function (e) {
      // window.console.log(e.target.parentNode);
      // newEl.addEventListener('click', showGalleryCb(url, comments, likes));
      var url = e.target.parentNode.querySelector('img').src;
      var comment = e.target.parentNode.querySelector('.picture-comments').innerText;
      var likes = e.target.parentNode.querySelector('.picture-likes').innerText;
      window.console.log(likes);
      // showGalleryCb(url, likes, comment);
      window.showGallery(url, likes, comment);
    };

    var renderPicture = function (elemToCln, picCont) {
      data.forEach(function (object) {
        picturesList.push(object);
        var newElement = elemToCln.cloneNode(true);
        newElement.querySelector('img').src = object.url;
        newElement.querySelector('.picture-comments').innerText = object.comments;
        newElement.querySelector('.picture-likes').innerText = object.likes;
        picCont.appendChild(newElement);
        // showGalleryItem(newElement, object.url, object.comments, object.likes);
        // newElement.addEventListener('click', showGalleryCb(object.url, object.comments, object.likes));
      });
      picCont.addEventListener('click', showGalleryItem);

    };
    renderPicture(elementToClone, picturesContainer);

    // picturesContainer.addEventListener('click', showGalleryItem);
  };
})();

window.load(DATA_URL, onLoad);
