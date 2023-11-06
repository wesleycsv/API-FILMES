//Controller do Modal
const modalFull = document.querySelector('[data-modal="full"]');

export function modal() {
  const closeModal = document.querySelector('[data-modal="close"]');

  function closeBackground(event) {
    if (event.target == this) {
      openModalToggle(event);
    }
  }

  closeModal.addEventListener("click", openModalToggle);
  modalFull.addEventListener("click", closeBackground);
}

export function openModalToggle() {
  modalFull.classList.toggle("ativo");
}
export function closeModalToggle() {
  modalFull.classList.remove("ativo");
}
