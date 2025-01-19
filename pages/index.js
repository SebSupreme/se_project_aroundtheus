import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// form validation
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplateSelector = "#card-template";

// Form Inputs
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardUrlInput = document.querySelector("#add-card-url-input");

// Wrappers
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const cardListEl = document.querySelector(".cards__list");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const addCardForm = addCardModal.querySelector("#add-card-form");
const previewImageModal = document.querySelector("#preview-image-modal");

// Buttons and Dom Nodes
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileCloseBtn = document.querySelector(
  "#edit-profile-modal-close-button"
);
const addCardModalCloseBtn = document.querySelector(
  "#add-card-modal-close-button"
);
const addNewCardBtn = document.querySelector(".profile__add-button");
const previewImageModalCloseButton = document.querySelector(
  "#preview-image-modal-button-close"
);

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Functions
function createCard(data) {
  const card = new Card({ ...data, handleImageClick }, "#card-template");
  return card.getView();
}

function handleImageClick(name, link) {
  const modalImage = previewImageModal.querySelector(".modal__image");
  const modalCaption = previewImageModal.querySelector(".modal__caption");

  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;

  openModal(previewImageModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("mousedown", handleOverlayClick);
}

previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

function openModal(modal) {
  modal.classList.add("modal_opened");

  document.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKey);
}

function handleOverlayClick(event) {
  if (
    event.target.classList.contains("modal") &&
    event.target.classList.contains("modal_opened")
  ) {
    closeModal(event.target);
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal.modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;

  const cardElement = createCard({ name, link });
  cardListEl.prepend(cardElement);

  addCardForm.reset();
  addFormValidator.disableButton();

  closeModal(addCardModal);
}

// Event Listerners
previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileCloseBtn.addEventListener("click", () => closeModal(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// add new card
addNewCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardModalCloseBtn.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});
