export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formEl;
    this._inputElms = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);

    if (errorMessageEl.textContent.length > 50) {
      errorMessageEl.style.bottom = "-35px";
    } else {
      errorMessageEl.style.bottom = "-20px";
    }
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleBtnState() {
    const hasInvalidInput = this._inputElms.some(
      (inputEl) => !inputEl.validity.valid
    );
    if (hasInvalidInput) {
      this.disableButton();
    } else {
      this._submitBtn.classList.remove(this._inactiveButtonClass);
      this._submitBtn.disabled = false;
    }
  }

  disableButton() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _setEventListeners() {
    this._inputElms.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleBtnState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
    this._toggleBtnState();
  }

  resetValidation() {
    this._inputElms.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });

    this._toggleBtnState();
  }
}
