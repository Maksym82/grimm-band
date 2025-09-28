"use strict";

// === Утилиты для скролла ===
let scrollLocked = false;

function lockScroll() {
  if (scrollLocked) return;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.classList.add("body--no-scroll");
  scrollLocked = true;
}

function unlockScroll() {
  if (!scrollLocked) return;
  document.body.classList.remove("body--no-scroll");
  document.body.style.paddingRight = "";
  scrollLocked = false;
}

// === Модалка ===
(() => {
  const refs = {
    openModalBtns: document.querySelectorAll("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modalBackdrop: document.querySelector("[data-modal]"),
  };

  refs.openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      refs.modalBackdrop.classList.remove("backdrop--hidden");
      lockScroll();
    });
  });

  refs.closeModalBtn.addEventListener("click", closeModal);

  refs.modalBackdrop.addEventListener("click", (e) => {
    if (e.target === refs.modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    refs.modalBackdrop.classList.add("backdrop--hidden");
    // НЕ вызываем unlockScroll — скролл остаётся заблокирован, если будет попап
  }
})();

// === Попап после формы ===
(() => {
  const popup = document.getElementById("thank-you-popup");
  const popupCloseBtn = document.getElementById("popup-close");
  let popupTimer;

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const modal = form.closest("[data-modal]");
      if (modal) {
        modal.classList.add("backdrop--hidden");

        // НЕ отпускаем скролл — попап появится через 300ms
        setTimeout(() => {
          popup.classList.add("popup--visible");
          // lockScroll уже активен, не вызываем повторно
        }, 300);
      } else {
        popup.classList.add("popup--visible");
        lockScroll();
      }

      form.reset();

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
    unlockScroll();
  }
})();

// === Мобильное меню ===
document.addEventListener("click", (e) => {
  const targetItem = e.target;
  if (targetItem.closest(".icon-menu") || targetItem.closest(".menu__link")) {
    document.documentElement.classList.toggle("menu-open");
  }
});
