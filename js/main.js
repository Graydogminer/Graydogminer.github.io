if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

const modal = document.getElementById("detail-modal");

if (modal) {
  const modalTitle = document.getElementById("modal-title");
  const modalPanels = modal.querySelectorAll("[data-modal-panel]");
  const modalClose = modal.querySelector(".modal-close");
  const modalLinks = document.querySelectorAll("[data-modal-target]");

  function openModal(target, titleText) {
    modalPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.modalPanel === target);
    });

    modalTitle.textContent = titleText;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modal.querySelectorAll("video").forEach((video) => video.pause());
  }

  modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(link.dataset.modalTarget, link.textContent.trim());
    });
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}
