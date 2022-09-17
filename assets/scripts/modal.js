/**
 *
 * @param {Element} referencedElement
 * @param {Object} config object with title, content, confirmTextButton and cancelTextButton properties.
 * @param {function} callback
 */

function showModal(referencedElement, config = {}, callback = null) {
  const $this = referencedElement;
  const $modalTitle = $this.find(".modal--title");
  const $modalContent = $this.find(".modal--content");
  const $modalConfirmButton = $this.find(".js--confirm");
  const $modalCloseButton = $this.find(".js--cancel");

  // Add listeners
  $modalCloseButton.unbind().bind("click", () => onCloseModal($this));

  if (config && Object.keys(config).length > 0) {
    if (config?.title && config?.title !== "") {
      $modalTitle.html(config.title);
    }

    if (config?.content && config?.content !== "") {
      $modalContent.load(config.content);
    }

    if (config?.confirmTextButton && config?.confirmTextButton !== "") {
      $modalConfirmButton.html(config.confirmTextButton);
    }

    if (config?.closeTextButton && config?.closeTextButton !== "") {
      $modalCloseButton.html(config.closeTextButton);
    }
  }

  Promise.resolve(hideModals()).then(() => {
    Promise.resolve(displayModal($this)).then(() => {
      if (callback != null) {
        callback.call();
      }
    });
  });
}

function hideModals() {
  $(".modal").fadeOut("slow");
}

function displayModal(modal) {
  modal.fadeIn("slow");
}

function onCloseModal(modal) {
  modal.fadeOut("slow");
}
