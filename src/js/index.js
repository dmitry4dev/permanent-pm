import { createPopup } from './utils/createPopup.js';

document.addEventListener('DOMContentLoaded', () => {

  AOS.init();

  const header = document.querySelector('.header');
  const innerDown = document.querySelector('.header-inner-down');
  const menuBtn = document.querySelector('.header__menu-btn');
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

        if (header.classList.contains('header-full-width')) {
          header.classList.remove('header-full-width');
        }

        if (innerDown.classList.contains('show-nav')) {
          setTimeout(() => {
            innerDown.classList.remove('show-nav');
          }, 100);
        }
      });
    }
  });

  menuBtn.addEventListener('click', () => {
    if (!header.classList.contains('header-full-width')) {
      setTimeout(() => {
        header.classList.add('header-full-width');
      }, 100)
    }

    if (!innerDown.classList.contains('header-full-width')) {
      innerDown.classList.add('show-nav');
    }
  });

  navCloseBtn.addEventListener('click', () => {
    if (header.classList.contains('header-full-width')) {
      header.classList.remove('header-full-width');
    }

    if (innerDown.classList.contains('show-nav')) {
      setTimeout(() => {
        innerDown.classList.remove('show-nav');
      }, 100);
    }
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
      createPopup();

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
