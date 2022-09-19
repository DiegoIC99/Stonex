function preLoadFunctionsAndListeners() {
  $shareHolderID = localStorage.getItem("shareHolderDataId");

  // setupDefaults
  const $editPercentFunds = $(".funds--edit-percent");
  const $searchOnFocus = $(".search-funds");
  const $deleteSearch = $(".js--delete-search");
  const $saveChanges = $(".js--save-changes");
  const $applyAll = $(".js--apply-all");

  // Listeners
  $editPercentFunds.on("click", onEditPercentPressed);
  $searchOnFocus.on("keyup", onSearch);
  $deleteSearch.on("click", onDeleteSearch);
  $saveChanges.on("click", onSaveChanges);
  $applyAll.on("click", onApplyAll);
  $(document).on("click", onClickListenerOutsideBaseInput);

  // Calls
  feather.replace();
}

function onEditPercentPressed(e) {
  e.preventDefault();
  e.stopPropagation();

  const $target = $(e.currentTarget);
  const $basePercentInput = $target.closest("tr").find(".funds--input-percent");

  $basePercentInput.attr("disabled", false).focus();
}

function onSearch(e) {
  const $target = $(e.target);

  if ($target.val() === "") {
    $("#results-funds").fadeOut();
    $(".cross-delete").removeClass("is-active");
  } else {
    $("#results-funds").fadeIn();
    $(".cross-delete").addClass("is-active");
  }
}

function onDeleteSearch(e) {
  e.preventDefault();
  e.stopPropagation();

  $(".cross-delete").removeClass("is-active");

  $(".search-funds").val("");
  $("#results-funds").fadeOut();
}

function onSaveChanges(e) {
  const $target = $(e.target);

  // Here should be the logic that will be executed when the user clicks on the save button.
}

function onApplyAll(e) {
  const $target = $(e.target);

  const modalToShow = $(".generic-modal");
  showModal(modalToShow, {
    title: "Aplicar a todos",
    content: "templates/modal-apply-all.html",
    confirmTextButton: "Aplicar cambios",
    cancelTextButton: "Cancelar",
    styles: { width: "404px" },
  });
}

function onClickListenerOutsideBaseInput(event) {
  const $target = $(event.target);
  $(".funds--input-percent").attr("disabled", true);
}

preLoadFunctionsAndListeners();
