'use strict';
(function () {

// плавный скролл якорей

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.13;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        var t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}

// При нажатии на "поиск и категории" 
// появляется строка поиска и разворачивается облако категорий и тегов.

const tagsElement = document.querySelector('.header__tags')
const searchInputElement = document.querySelector('.search__input')
const searchLabelElement = document.querySelector('.search__label')
const tagsLinkElements = document.querySelectorAll('.tags__link');
const searchResetElement = document.querySelector('.search__reset')

searchInputElement.addEventListener('click', function () {
  tagsElement.classList.add('active');
  searchResetElement.classList.add('active');
  searchLabelElement.classList.add('opacity--0');
})

searchResetElement.addEventListener('click', function () {
    tagsElement.classList.remove('active');
    searchLabelElement.classList.remove('opacity--0');
    searchResetElement.classList.remove('active');
    tagsLinkElements.forEach(element => {
      element.classList.remove('active')
    })
})

// Категории / теги : После нажатия на значение оно меняет цвет на черный. При повторном нажатии выбор отменяется. 
// Возможно одновременно выбрать сколько угодно значений.

tagsLinkElements.forEach(element => {
  element.addEventListener('click', function () {
    element.classList.toggle('active')
  })
})

const notesNumArr = [... document.querySelectorAll('.article-page__note-num')];
const notesPopupArr = [... document.querySelectorAll('.article-page__note-popup')];
const notesPopupCloseArr = document.querySelectorAll('.article-page__note-close');

// открытие попапов ссылок

const closePopup = function(popup) {
  setTimeout(function () {
    popup.classList.add('opacity--0');
  }, 0);
  setTimeout(function () {
    popup.classList.remove('active');
  }, 600);
}

const openPopup = function (popup) {
  popup.classList.add('active');
  setTimeout(function () {
    popup.classList.remove('opacity--0');
  }, 0);
}

notesPopupCloseArr.forEach(element => {
  element.addEventListener('click', function(evt) {
    evt.stopPropagation();
    closePopup(element.parentNode);
  })
})

notesNumArr.forEach((element, i) => {
  element.addEventListener('click', (evt) => {
    openPopup(notesPopupArr[i]);
  })
})

const sharingArrow = document.querySelector('.sharing__link-arrow');

window.addEventListener('scroll', ()=>{
  if(window.pageYOffset <= 1000) {
    sharingArrow.classList.remove('active');
  } else sharingArrow.classList.add('active');
})

})();