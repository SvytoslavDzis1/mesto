import './index.css';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';

import {
  profileOpenButton,
  popupFormProfile,
  nameInput,
  jobInput,
  avatarOpenButton,
  popupFormTypeAvatar,
  cardOpenButton,
  popupFormImg,
  //popupButtonSave,
  validationConfig,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: 'c3116382-b229-4a8a-9e8f-08727cd9ce14',
    'Content-Type': 'application/json'
  }
});

let userId;

//Получение данных профиля и картинок
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([infoUser, initialCards]) => {
    userInfo.setUserInfo(infoUser);
    userId = infoUser._id;
    imgList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

//ПРОФИЛЬ

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Информация о пользователе
const userInfo = new UserInfo({ name:'.profile__name', job:'.profile__job', avatar:'.profile__avatar' });

//Открытие окна с редактирование аватара
avatarOpenButton.addEventListener("click", () => {
  popupAvatar.open();
  formValidatorAvatar.resetValidation();
})

//Редактирование аватара
const popupAvatar = new PopupWithForm('.popup_type_avatar', {
  formSubmitHandler: (data) => {
    popupAvatar.loading(true);
    api.changeAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.loading(false);
      })
  }
})
popupAvatar.setEventListeners();

//валидация формы редактирования аватара
const formValidatorAvatar = new FormValidator(validationConfig, popupFormTypeAvatar);
formValidatorAvatar.enableValidation();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//открытие окна редактирования профиля
profileOpenButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.nameInfo;
  jobInput.value = data.jobInfo;
  formValidatorProfile.resetValidation();
  popupProfile.open();
});

//Редактор профиля
const popupProfile = new PopupWithForm('.popup_type_edit', {
  formSubmitHandler: (data) => {
    popupProfile.loading(true);
    api.editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupProfile.loading(false);
      })
  }
});
popupProfile.setEventListeners();

//валидация формы редактирования профиля
const formValidatorProfile = new FormValidator(validationConfig, popupFormProfile);
formValidatorProfile.enableValidation();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//КАРТИНКА

//Открытие popup добавления картинки
cardOpenButton.addEventListener("click", () => {
  formValidatorImg.resetValidation();
  popupAddCard.open();
});

//Добавление картинки
const popupAddCard = new PopupWithForm('.popup_type_new-card', {
  formSubmitHandler: (data) => {
    popupAddCard.loading(true);
    api.addNewCard(data)
      .then((data) => {
        imgList.addItem(createCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCard.loading(false);
      })
  }
});
popupAddCard.setEventListeners();

//Открытие popup картинки
const popupTypeImage = new PopupWithImage('.popup_type_image');
popupTypeImage.setEventListeners();

// Добавление картинок
const imgList = new Section({
  renderer: (item) => {
    imgList.addItem(createCard(item));
  }
}, '.elements__table');

const createCard = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    handleCardClick: (name, link) => {
      popupTypeImage.open(name, link);
    },
    handleCardDelete: (cardId, card) => {
      popupDeleteImg.open(cardId, card);
    },
  }, '.img-template', api);
  const cardElement = card.generateCard();
  return cardElement;
};

//Подтверждение удаления картинки
const popupDeleteImg = new PopupWithSubmit('.popup_type_delete-card', {
  deleteImg: (cardId, card) => {
    api.deleteCard(cardId)
      .then(() => {
        card.deleteElement();
        popupDeleteImg.close();
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }
})
popupDeleteImg.setEventListeners();

//валидация формы добавления картинки
const formValidatorImg = new FormValidator(validationConfig, popupFormImg);
formValidatorImg.enableValidation();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



