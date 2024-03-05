import { createPopup } from './utils/createPopup.js';

document.addEventListener('DOMContentLoaded', () => {
  AOS.init();

  const url = new URL(location.href);

  const header = document.querySelector('.header');
  const headerInner = document.querySelector('.header-inner');
  const menuBtn = document.querySelector('.burger-icon');
  const navCloseBtn = document.querySelector('.nav-close-btn');
  const anchorLinks = document.querySelectorAll('.nav-list__link');
  const serviceItems = document.querySelectorAll('.service-list__item');
  const contactBtn = document.querySelectorAll('.contact-btn');

  anchorLinks.forEach(link => {
    if (link.tagName === 'A' && link.getAttribute('href').includes('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const elemHash = link.getAttribute('href').slice(1);
        const scrollTarget = document.getElementById(elemHash);

        scrollTarget.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });

        if (headerInner.classList.contains('show-nav')) {
          setTimeout(() => {
            headerInner.classList.remove('show-nav');
            menuBtn.style.display = 'block';
          }, 100);
        }
      });
    }
  });

  menuBtn.addEventListener('click', () => {
    headerInner.classList.add('show-nav');

    setTimeout(() => {
      menuBtn.style.display = 'none';
    }, 200);
  });

  navCloseBtn.addEventListener('click', () => {
    headerInner.classList.remove('show-nav');

    setTimeout(() => {
      menuBtn.style.display = 'block';
    }, 100);
  });

  if (serviceItems.length % 2 !== 0) {
    serviceItems.forEach((item, index) => {
      if (item.classList.contains('item-fullsize')) {
        item.classList.remove('item-fullsize');
      }
      if (index == serviceItems.length - 1) {
        item.classList.add('item-fullsize');
      }
    });
  } else {
    serviceItems.forEach((item) => {
      if (item.classList.contains('item-fullsize')) {
        item.classList.remove('item-fullsize');
      }
    });
  }

  contactBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      if (url.pathname.includes('ru')) {
        createPopup('ru');
      } else {
        createPopup('ee');
      }


      window.onscroll = () => window.scroll(0, 0);
      document.body.style.overflowY = 'hidden';

      setTimeout(() => {
        document.querySelector('.popup').classList.add('show-popup');
      }, 200);
    });
  });

  const mainCarousel = new Splide('#main-carousel', {
    type: 'fade',
    rewind: true,
    pagination: false,
    arrows: false
  });

  const thumbnails = new Splide('#thumbnail-carousel', {
    fixedWidth: 100,
    fixedHeight: 60,
    gap: 10,
    arrows: false,
    rewind: true,
    pagination: false,
    isNavigation: true,
    focus: 'center',
    breakpoints: {
      320: {
        fixedWidth: 80,
        fixedHeight: 54,
      },
      768: {
        fixedWidth: 100,
        fixedHeight: 74,
      },
      1920: {
        fixedWidth: 120,
        fixedHeight: 84,
      },
    },
  });

  mainCarousel.sync(thumbnails);
  mainCarousel.mount();
  thumbnails.mount();
});
