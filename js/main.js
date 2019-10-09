'use strict';

var TIMES = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ROOMS = [1, 2, 3, 4];
var PRICES = [300000, 400000, 600000];
var GUESTS = [5, 10, 15, 20];

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var announcements = [];

var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * max) + min);
};

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var getAnnouncementsArray = function () {
  for (var i = 0; i < 8; i++) {
    var x = getRandomNumber(0, map.offsetWidth);
    var y = getRandomNumber(130, 630);

    announcements.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
        offer: {
          title: 'Милая квартира',
          address: x + ', ' + y,
          price: getRandomElement(PRICES),
          type: getRandomElement(TYPES),
          rooms: getRandomElement(ROOMS),
          guests: getRandomElement(GUESTS),
          checkin: getRandomElement(TIMES),
          checkout: getRandomElement(TIMES),
          features: FEATURES.slice(0).splice(0, getRandomNumber(1, FEATURES.length)),
          description: 'Описание квартиры',
          photos: PHOTOS.slice(0).splice(0, getRandomNumber(1, PHOTOS.length)),
        },
        location: {
          x: x,
          y: y,
        }
      }
    });
  }
};

var createCard = function (announcement) {
  var element = cardTemplate.cloneNode(true);
  var offer = announcement.author.offer;
  var types = {'flat': 'Квартира', 'bungalo': 'Бунгало', 'house': 'Дом', 'palace': 'Дворец'};
  var title = element.querySelector('.popup__title');
  var address = element.querySelector('.popup__text--address');
  var price = element.querySelector('.popup__text--price');
  var type = element.querySelector('.popup__type');
  var capacity = element.querySelector('.popup__text--capacity');
  var time = element.querySelector('.popup__text--time');
  var features = element.querySelector('.popup__features');
  var description = element.querySelector('.popup__description');
  var photos = element.querySelector('.popup__photos');
  var avatar = element.querySelector('.popup__avatar');

  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = offer.price + '₽/ночь';
  type.textContent = types[offer.type];
  capacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  description.textContent = offer.description;
  avatar.setAttribute('src', announcement.author.avatar);

  features.innerHTML = '';

  offer.features.map(function (el) {
    var li = document.createElement('li');

    li.classList.add('popup__feature', 'popup__feature--' + el);
    features.appendChild(li);
  });

  photos.innerHTML = '';

  offer.photos.map(function (el) {
    var img = document.createElement('img');

    img.setAttribute('width', 45);
    img.setAttribute('height', 40);
    img.setAttribute('alt', 'Фотография жилья');
    img.setAttribute('src', el);
    img.classList.add('popup__photo');
    photos.appendChild(img);
  });

  return element;
};

var createPin = function (pin) {
  var element = pinTemplate.cloneNode(true);
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

getAnnouncementsArray();

insertPins();

map.classList.remove('map--faded');

map.insertBefore(createCard(announcements[0]), mapFiltersContainer);
