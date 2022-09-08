import {Popup} from './Popup.js';

class PopupWithForm extends Popup{
  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(selector, {formSubmitHandler}){
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button-save');
    this._submitButtonText = this._submitButton.textContent;
  }

  //приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues(){
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  //Перезаписывает родительский метод setEventListeners
  setEventListeners(){
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._formSubmitHandler(this._getInputValues());
    })
  }

  //Очистка формы в случае нажатия на крестик / esc
  close(){
    super.close();
    this._form.reset()
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

export { PopupWithForm }
