export const createPopup = (lang) => {
  const popupContainer = document.createElement('div');
  const popup = document.createElement('div');
  const popupTitle = document.createElement('h3');
  const closeBtn = document.createElement('button');
  const closeIcon = document.createElement('i');
  const popupContactList = document.createElement('ul');
  const contacts = {
    phone: ['tel:+37255630942', 'Telefon'],
    messenger: ['https://m.me/marina.pugacheva.73/', 'Messenger'],
    viber: ['viber://chat?number=37255630942', 'Viber'],
    whatsapp: ['https://wa.me/37255630942', 'Whatsapp']
  }

  popupContainer.classList.add('popup-container');
  popup.classList.add('popup');
  closeBtn.classList.add('popup__close-btn');
  closeIcon.classList.add('far', 'fa-window-close');
  popupTitle.classList.add('popup__title');
  popupContactList.classList.add('popup__contact-list', 'popup-contact-list');

  popupTitle.textContent = 'Запишитесь на приём удобным для Вас способом';

  for (const item in contacts) {
    const popupContactListItem = document.createElement('li');
    const popupContactListLink = document.createElement('a');
    const popupContactListIcon = document.createElement('i');

    popupContactListItem.classList.add('popup-contact-list__item');
    popupContactListLink.classList.add('popup-contact-list__link');

    switch(item) {
      case 'phone' :
        const contactItemSubTxt = document.createElement('span');

        contactItemSubTxt.classList.add('item-subtxt');
        contactItemSubTxt.textContent = 'Telefon';

        popupContactListIcon.classList.add(`fas`, `fa-${item}`);

        popupContactListLink.setAttribute('href', `${contacts[item][0]}`);
        popupContactListLink.textContent = contacts[item][1];
        break;
      case 'messenger' :
        popupContactListIcon.classList.add(`fab`, `fa-facebook-${item}`);

        popupContactListLink.setAttribute('href', `${contacts[item][0]}`);
        popupContactListLink.setAttribute('target', '_blank');
        popupContactListLink.textContent = contacts[item][1];
        break;
      case 'viber' :
        popupContactListIcon.classList.add(`fab`, `fa-${item}`);

        popupContactListLink.setAttribute('href', `${contacts[item][0]}`);
        popupContactListLink.textContent = contacts[item][1];
        break;
      case 'whatsapp' :
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
    document.querySelector('.popup').classList.remove('show-popup');
    document.querySelector('.popup').classList.add('hide-popup');

    setTimeout(() => {
      popupContainer.remove();
    }, 200);
  });

  return popupContainer;
}
