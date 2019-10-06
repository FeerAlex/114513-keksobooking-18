'use strict';

var TIMES = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var map = document.querySelector('.map');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var announcements = [];

var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * max) + min);
};

var getRandomElement = function () {
  var x = getRandomNumber(0, map.offsetWidth);
  var y = getRandomNumber(130, 630);

  return {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
      offer: {
        title: 'Милая квартира',
        address: x + ', ' + y,
        price: getRandomNumber(1, 4) * 1000000,
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 20),
        checkin: TIMES[getRandomNumber(0, TIMES.length - 1)],
        checkout: TIMES[getRandomNumber(0, TIMES.length - 1)],
        features: FEATURES.slice(0).splice(0, getRandomNumber(1, FEATURES.length)),
        description: 'Описание квартиры',
        photos: PHOTOS.slice(0).splice(0, getRandomNumber(1, PHOTOS.length)),
      },
      location: {
        x: x,
        y: y,
      }
    }
  }
}

var getRandomAnnouncementsArray = function () {
  var randomAnnouncements = [];

  for (var i = 0; i < 8; i++) {
    randomAnnouncements.push(getRandomElement());
  }

  return randomAnnouncements;
};

var createPin = function (pin) {
  var element = template.cloneNode(true);
  var avatar = element.querySelector('img');

  element.style.left = pin.author.location.x - 25 + 'px';
  element.style.top = pin.author.location.y - 70 + 'px';
  avatar.setAttribute('src', pin.author.avatar);
  avatar.setAttribute('alt', pin.author.offer.title);

  return element;
};

var insertPins = function () {
  var container = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < announcements.length; i++) {
    fragment.appendChild(createPin(announcements[i]));
  }

  container.appendChild(fragment);
};

announcements = getRandomAnnouncementsArray();

insertPins();

map.classList.remove('map--faded');
