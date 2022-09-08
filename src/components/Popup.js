class Popup{
  constructor(selector){
    this._popup = document.querySelector(selector); //селектор попапа
    this._closeByEscape = this._handleEscClose.bind(this)
  }

  // окрытие popup
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }
  // закрытие метод закрытия на esc
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  }

  //закрытиe метод на нажатие esc
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
      }
  }

  //Закрытие попапов на оверлей / крестик
  setEventListeners(){
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__button-close'))) {
        this.close();
      }
    });
  }
}

export { Popup }
