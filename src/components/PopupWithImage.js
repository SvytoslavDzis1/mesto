import {Popup} from './Popup.js';
//Открытие popup картинки с текстом
class PopupWithImage extends Popup{
  constructor(selector){
    super(selector);
    this._popupImage = this._popup.querySelector(".popup__img");
    this._popupImageName = this._popup.querySelector(".popup__figcaption");
  }

  open(link, name){
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageName.textContent = name;
    super.open();
  }
}

export {PopupWithImage}
