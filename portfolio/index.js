console.log("Portfolio 3: Предполагаемая оценка - 85 баллов \n Отзыв по пунктам ТЗ: \n Все пункты выполнены полностью!: \n 1. При кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием. Кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными\n 2. Перевод страницы на два языка \n 3. Переключение светлой и тёмной темы \n 3.1 тёмная тема приложения сменяется светлой \n 3.2 светлая тема приложения сменяется тёмной \n 3.3 после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) \n 4. выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы. Добавлены сложные эффекты для кнопок при наведении и клике");
import i18Obj from './js/translate.js';

const html = document.querySelector('html');
const hamburger = document.querySelector('.b-hamburger');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioBtn = document.querySelectorAll('.seasons');
const portfolioImage = document.querySelectorAll('.portfolio-image');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const data = document.querySelectorAll('[data-i18]');
const langBtns = document.querySelectorAll('.lang-btn');
const changeTheme = document.querySelector('.theme-btn');
const lightTheme = document.querySelectorAll('.light');
const lightThemeTitle = document.querySelectorAll('.light-title');
const lightBtn = document.querySelectorAll('.light-btn');
let lang = 'en';
let themeClass = ['active-theme', 'light-theme', 'light-nav', 'theme'];
let thems = 'dark';

function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) { 
        hamburger.classList.remove('is-active');
        nav.classList.remove('open');
    }
  }

function changeImage(e) {
    const tar = e.target;
    if(tar.classList.contains('seasons')) {
      portfolioImage.forEach((img, index) => img.src = `./assets/img/${tar.dataset.season}/${index + 1}.jpg`);
    }
}

function changeActiveBtn(e, Btns, childClass, activeClass) {
  const target = e.target;
  if(target.classList.contains(childClass)) {
    Btns.forEach((btn) => btn.classList.remove(activeClass));
    target.classList.add(activeClass);
  }
}

function changeBtn(Btns, lang, activeClass) {
  if (lang == 'ru') {
    Btns.forEach((btn) => btn.classList.toggle(activeClass));
  } 
}

function preloadSummerImages(season) {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i}.jpg`;
  }
}

function getTranslate(language) {
  data.forEach((elem) => {
    if (Object.keys(i18Obj[language]).includes(elem.dataset.i18) && (!elem.placeholder)) {
      elem.textContent = (i18Obj[language])[elem.dataset.i18];
    }
    if (elem.placeholder) {
      elem.placeholder = (i18Obj[language])[elem.dataset.i18];
      elem.textContent = '';
    }
  });
}

function changelang(e) {
  const tar = e.target;
  if(tar.classList.contains('lang-btn')) {
    lang = tar.dataset.language;
    setLocalStorage('lang', lang)
    getTranslate(lang);
  }
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
    changeBtn(langBtns, lang, 'active-btn-lang');
  }
  if (localStorage.getItem('thems')) {
    const thems = localStorage.getItem('thems');
    ActiveTheme(thems, ...themeClass);
  }
}

function clearStorage() {
  localStorage.clear();
}

function changeActiveTheme(event, activeTh, lightTh, lightNav,theme) {
  if (event.target.classList.contains('theme-btn') && thems === 'dark') {
    changeTheme.classList.add(activeTh);
    [lightTheme, lightThemeTitle, lightBtn].map(elem => (elem.forEach((theme) => theme.classList.add(lightTh))));
    [navList, hamburger].map(elem => elem.classList.add(lightNav));
    navLinks.forEach((th) => th.classList.add(lightNav));
    html.classList.add(theme);
    thems = 'light';
  } else if (event.target.classList.contains('theme-btn') && thems === 'light') {
    changeTheme.classList.remove(activeTh);
    [lightTheme, lightThemeTitle, lightBtn].map(elem => (elem.forEach((theme) => theme.classList.remove(lightTh))));
    [navList, hamburger].map(elem => elem.classList.remove(lightNav));
    navLinks.forEach((th) => th.classList.remove(lightNav));
    html.classList.remove(theme);
    thems = 'dark';
  }
}

function ActiveTheme(th, activeTh, lightTh, lightNav, theme) {
  if (th === 'dark') {
    changeTheme.classList.remove(activeTh);
    [lightTheme, lightThemeTitle, lightBtn].map(elem => (elem.forEach((theme) => theme.classList.remove(lightTh))));
    [navList, hamburger].map(elem => elem.classList.remove(lightNav));
    navLinks.forEach((th) => th.classList.remove(lightNav));
    html.classList.remove(theme);
  } else if (th === 'light') {
    changeTheme.classList.add(activeTh);
    [lightTheme, lightThemeTitle, lightBtn].map(elem => (elem.forEach((theme) => theme.classList.add(lightTh))));
    [navList, hamburger].map(elem => elem.classList.add(lightNav));
    navLinks.forEach((th) => th.classList.add(lightNav));
    html.classList.add(theme);
    thems = 'light';
  }
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active');
  nav.classList.toggle('open');
});
navLinks.forEach((el) => el.addEventListener('click', closeMenu));

portfolioBtn.forEach((elem) => elem.addEventListener('click', (elem) => {
  changeImage(elem);
  changeActiveBtn(elem, portfolioBtn, 'seasons', 'portfolio-active');
}));

langBtns.forEach((btn) => btn.addEventListener('click', (langVariant) => {
  changelang(langVariant);
  changeActiveBtn(langVariant, langBtns, 'lang-btn', 'active-btn-lang');
}));

seasons.forEach((season) => preloadSummerImages(season));

window.addEventListener('load', getLocalStorage);
setTimeout(clearStorage, 60000);

changeTheme.addEventListener('click', (event) => {
  changeActiveTheme(event, ...themeClass);
  setLocalStorage('thems', thems);
});
