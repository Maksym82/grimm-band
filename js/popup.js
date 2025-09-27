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
