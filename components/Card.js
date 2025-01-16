export default class Card {
  constructor({ name, link, handleImageClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._imageElement = this._cardElement.querySelector(".card__image");
    this._textElement = this._cardElement.querySelector(".card__text");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._textElement.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
