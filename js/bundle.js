"use strict";

// === Модальное окно ===
(() => {
  const refs = {
    openModalBtns: document.querySelectorAll("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtns.forEach((btn) => {
    btn.addEventListener("click", toggleModal);
  });

  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("backdrop--hidden");
  }
})();

// === Попап после формы ===
(() => {
  const form = document.querySelector(".contacts__form");
  const popup = document.getElementById("thank-you-popup");
  const popupCloseBtn = document.getElementById("popup-close");
  const body = document.body;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    popup.classList.add("popup--visible");
    body.classList.add("body--no-scroll");
    form.reset();
  });

  popupCloseBtn.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  function closePopup() {
    popup.classList.remove("popup--visible");
    body.classList.remove("body--no-scroll");
  }
})();

// === Переключение мобильного меню ===
document.addEventListener("click", (e) => {
  const targetItem = e.target;
  if (targetItem.closest(".icon-menu") || targetItem.closest(".menu__link")) {
    document.documentElement.classList.toggle("menu-open");
  }
});
