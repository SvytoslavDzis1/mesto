import {Popup} from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor(selector, { deleteImg }) {
    super(selector);
    this._deleteImg = deleteImg;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteImg(this._cardId, this._card);
    })
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }
}

export { PopupWithSubmit }
