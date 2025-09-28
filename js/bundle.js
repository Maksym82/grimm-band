"use strict";

(() => {
  const refs = {
    openModalBtns: document.querySelectorAll("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modalBackdrop: document.querySelector("[data-modal]"),
    body: document.body,
  };

  // Открытие модалки
  refs.openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      refs.modalBackdrop.classList.remove("backdrop--hidden");
      refs.body.classList.add("body--no-scroll");
    });
  });

  // Закрытие по кнопке
  refs.closeModalBtn.addEventListener("click", closeModal);

  // Закрытие по клику вне модалки
  refs.modalBackdrop.addEventListener("click", (e) => {
    if (e.target === refs.modalBackdrop) closeModal();
  });

  // Закрытие по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    refs.modalBackdrop.classList.add("backdrop--hidden");
    refs.body.classList.remove("body--no-scroll");
  }
})();

// === Попап после формы ===
(() => {
  const popup = document.getElementById("thank-you-popup");
  const popupCloseBtn = document.getElementById("popup-close");
  const body = document.body;
  let popupTimer;

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Закрываем модалку, если форма внутри неё
      const modal = form.closest("[data-modal]");
      if (modal) {
        modal.classList.add("backdrop--hidden");
        body.classList.remove("body--no-scroll");

        // Показываем попап с задержкой после анимации модалки
        setTimeout(() => {
          popup.classList.add("popup--visible");
          body.classList.add("body--no-scroll");
        }, 300); // задержка в миллисекундах
      } else {
        // Если форма вне модалки — показываем попап сразу
        popup.classList.add("popup--visible");
        body.classList.add("body--no-scroll");
      }

      form.reset();

      // Автоматическое скрытие попапа через 5 секунд
      clearTimeout(popupTimer);
      popupTimer = setTimeout(closePopup, 5000);
    });
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
