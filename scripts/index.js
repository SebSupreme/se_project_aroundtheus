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

// Card Elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileCloseBtn = document.querySelector(
  "#edit-profile-modal-close-button"
);
const addCardModalCloseBtn = document.querySelector(
  "#add-card-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardBtn = document.querySelector(".profile__add-button");
const previewImageModalCloseButton = document.querySelector(
  "#preview-image-modal-button-close"
);
const modalCaption = previewImageModal.querySelector(".modal__caption");
const modalImage = previewImageModal.querySelector(".modal__image");

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    modalImage.src = cardData.link;
    openModal(previewImageModal);
  });
  previewImageModalCloseButton.addEventListener("click", () =>
    closeModal(previewImageModal)
  );

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTextEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
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
  renderCard({ name, link }, cardListEl);

  addCardTitleInput.value = "";
  addCardUrlInput.value = "";

  closeModal(addCardModal);
}

// Event Listerners
document.addEventListener("mousedown", handleOverlayClick);
document.addEventListener("keydown", handleEscapeKey);

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileCloseBtn.addEventListener("click", () => closeModal(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// add new card
addNewCardBtn.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseBtn.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
