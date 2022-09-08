class FormValidator{
  constructor(validationConfig, formElement){
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._submitButton = formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

  // показывать ошибки
  _showError = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._validationConfig.inputErrorClass);
  }

    // скрывать ошибки
  _hideError = (errorElement, inputElement) => {
    errorElement.textContent = '';
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
  }

  //проверка на наличие ошибки
  _checkInputValidity = (inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    if (isInputNotValid) {
      this._showError(errorElement, inputElement);
    } else {
      this._hideError(errorElement, inputElement);
    }
  }

  //изменение состояния кнопки
  _toggleButtonState = () => {
    const isActive = this._formElement.checkValidity();
    if (isActive) {
      this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  // слушатели событий
  _setEventListeners = () =>{
    const isFormValid = this._formElement.checkValidity();
    this._toggleButtonState(isFormValid);
    Array.from(this._inputList).forEach(inputElement => {
      inputElement.addEventListener('input', () =>{
        const isFormValid = this._formElement.checkValidity();
        this._checkInputValidity(inputElement);
        this._toggleButtonState(isFormValid);
      })
    })
  }

  //очиска формы
  resetValidation() {
    this._toggleButtonState(false);
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideError(errorElement, inputElement)
    })
  }

   //включение валидации формы
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt)=>{
      evt.preventDefault();
    })
    this._setEventListeners();
  }
}

export {FormValidator}
