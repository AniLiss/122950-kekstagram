'use strict';
var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
var onLoad = function (evt) {
  var data = JSON.parse(evt.target.response);
  var pictures = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var elementToClone = templateElement.content.querySelector('.picture');

  data.forEach(function (object) {
    var newElement = elementToClone.cloneNode(true);
    newElement.querySelector('img').src = object.url;
    newElement.querySelector('.picture-comments').innerText = object.comments;
    newElement.querySelector('.picture-likes').innerText = object.likes;
    pictures.appendChild(newElement);
  });
  window.console.log(data);
};
window.load(DATA_URL, onLoad);
