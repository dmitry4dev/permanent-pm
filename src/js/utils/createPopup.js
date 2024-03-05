export const createPopup = (lang) => {
  const popupContainer = document.createElement('div');
  const popup = document.createElement('div');
  const popupTitle = document.createElement('h3');
  const closeBtn = document.createElement('button');
  const closeIcon = document.createElement('i');
  const popupContactList = document.createElement('ul');
  const contacts = {
    phone: ['tel:+37255630942', 'Telefon', '+372 5563 0942'],
    messenger: ['https://m.me/marina.pugacheva.73/', 'Messenger'],
    viber: ['viber://chat?number=%2B37255630942', 'Viber'],
    whatsapp: ['https://wa.me/37255630942', 'Whatsapp']
  }
  const screen = {
    small: 0,
    medium: 400,
    large: 1024,
    extraLarge: 1260
  };

  popupContainer.classList.add('popup-container');
  popup.classList.add('popup');
  closeBtn.classList.add('popup__close-btn');
  closeIcon.classList.add('far', 'fa-window-close');
  popupTitle.classList.add('popup__title');
  popupContactList.classList.add('popup__contact-list', 'popup-contact-list');

  (lang == 'ru') ? popupTitle.textContent = 'Запишитесь на приём удобным для Вас способом' : popupTitle.textContent = 'Broneerige aeg Teile sobival viisil';

  for (const item in contacts) {
    const popupContactListItem = document.createElement('li');
    const popupContactListLink = document.createElement('a');
    const popupContactListIcon = document.createElement('i');

    popupContactListItem.classList.add('popup-contact-list__item');
    popupContactListLink.classList.add('popup-contact-list__link');

    switch (item) {
      case 'phone':
        popupContactListIcon.classList.add(`fas`, `fa-${item}`);

        popupContactListLink.setAttribute('href', `${contacts[item][0]}`);
        popupContactListLink.textContent = contacts[item][1];

        window.addEventListener('resize', resizeHandler);

        resizeHandler();

        function resizeHandler() {
          const iw = window.innerWidth;
          let size = null;

          for (let s in screen) {
            if (iw >= screen[s]) size = s;

            if (iw >= screen['extraLarge']) {
              popupContactListLink.firstChild.replaceWith(contacts[item][2])
            } else {
              popupContactListLink.firstChild.replaceWith(contacts[item][1]);
            }
          }
        }
        break;
      case 'messenger':
        popupContactListIcon.classList.add(`fab`, `fa-facebook-${item}`);

        popupContactListLink.setAttribute('href', `${contacts[item][0]}`);
        popupContactListLink.setAttribute('target', '_blank');
        popupContactListLink.textContent = contacts[item][1];
        break;
      case 'viber':
        popupContactListIcon.classList.add(`fab`, `fa-${item}`);

        popupContactListLink.setAttribute('href', `${contacts[item][0]}`);
        popupContactListLink.textContent = contacts[item][1];
        break;
      case 'whatsapp':
        popupContactListIcon.classList.add(`fab`, `fa-${item}`);

        popupContactListLink.setAttribute('href', `${contacts[item][0]}`);
        popupContactListLink.textContent = contacts[item][1];
        break;
    }
    popupContactListLink.append(popupContactListIcon);
    popupContactListItem.append(popupContactListLink);
    popupContactList.append(popupContactListItem);

    popupContactListItem.addEventListener('click', () => {
      popupContainer.remove();
    });
  }

  closeBtn.append(closeIcon);
  popup.append(closeBtn, popupTitle, popupContactList);
  popupContainer.append(popup);

  document.body.prepend(popupContainer);

  closeIcon.addEventListener('click', () => {
    onClose(popupContainer);
  });

  popupContainer.addEventListener('click', (e) => {
    if (e.target.closest('.popup')) {
      return;
    } else {
      onClose(popupContainer);
    }
  });

  function onClose(container) {
    document.querySelector('.popup').classList.remove('show-popup');
    document.querySelector('.popup').classList.add('hide-popup');

    setTimeout(() => {
      container.remove();

      window.onscroll = () => window.scroll;
      document.body.style.overflowY = 'inherit';
    }, 200);
  }

  return popupContainer;
}
