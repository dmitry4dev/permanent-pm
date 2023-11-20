document.addEventListener('DOMContentLoaded', () => {

  AOS.init();

  const header = document.querySelector('.header');
  const innerDown = document.querySelector('.header-inner-down');
  const menuBtn = document.querySelector('.header__menu-btn');
  const navCloseBtn = document.querySelector('.nav-close-btn');
  const anchorLinks = document.querySelectorAll('.nav-list__link');

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
      });
    }
  });

  menuBtn.addEventListener('click', () => {
    if (!header.classList.contains('header-full-width')) {
      header.classList.add('header-full-width');
    }

    if (!innerDown.classList.contains('header-full-width')) {
      setTimeout(() => {
        innerDown.classList.add('show-nav');
      }, 100);
    }
  });

  navCloseBtn.addEventListener('click', () => {
    if (header.classList.contains('header-full-width')) {
      setTimeout(() => {
        header.classList.remove('header-full-width');
      }, 100);
    }

    if (innerDown.classList.contains('show-nav')) {
      innerDown.classList.remove('show-nav');
    }
  });

  const mainCarousel = new Splide('#main-carousel', {
    type: 'fade',
    rewind: true,
    pagination: false,
    arrows: false,
    breakpoints: {
      320: {
        fixedWidth: '100%',
        fixedHeight: '300px',
      },
    },
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
    },
  });

  mainCarousel.sync(thumbnails);
  mainCarousel.mount();
  thumbnails.mount();
});
