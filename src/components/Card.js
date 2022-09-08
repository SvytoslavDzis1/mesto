class Card {
  constructor({ data, userId, handleCardClick, handleCardDelete, handleLikeClick }, cardSelector, api) {
    this._name = data.name;
    this._link = data.link;
    this._api = api;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
  // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }
  //метод generateCard подготовит карточку к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.element__img');
    this._buttonDelete = this._element.querySelector('.button__delete');
    this._elementName = this._element.querySelector('.element__name');
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementLike = this._element.querySelector('.element__like');


    // Добавим данные
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementName.textContent = this._name;
    this._setEventListeners();
    this._elementLike.textContent = this._likes.length;
    this._deleteImg();
    this._userLike();

    // Вернём элемент наружу
    return this._element;
  }

  //создатние отдельного метода _setEventListeners, чтобы не засорять код в generateCard
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this);
    });

    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._elementLikeButton.addEventListener('click', () => {
      this.handleLikeClick(this);
    });
  }

  //лайк картинки
  handleLikeClick() {
    if (this._elementLikeButton.classList.contains('element__like_active')) {
      this._api.deleteLike(this._cardId)
        .then((data) => {
          this._elementLikeButton.classList.remove('element__like_active');
          this._elementLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    } else {
      this._api.likeImg(this._cardId)
        .then((data) => {
          this._elementLikeButton.classList.add('element__like_active');
          this._elementLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }

  _userLike() {
    if (this._likes.find((item) => this._userId === item._id)) {
      this._elementLikeButton.classList.add('element__like_active')
    }
  }
  //удаление картинки
  deleteElement() {
    this._element.remove();
  }

  _deleteImg() {
    if (this._ownerId !== this._userId) {
      this._buttonDelete.classList.add('button__delete_hidden')
    }
    else {
      this._buttonDelete.classList.remove('button__delete_hidden')
    }
  }
}

export { Card };

