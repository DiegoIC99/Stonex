function preLoadFunctionsAndListeners() {
  $shareHolderID = localStorage.getItem("shareHolderDataId");

  const $editPercentFunds = $(".funds--edit-percent");
  const $searchOnFocus = $(".search-funds");

  $editPercentFunds.on("click", onEditPercentPressed);
  $searchOnFocus.on("keyup", onSearchOnFocus);

  feather.replace();
}

function onEditPercentPressed(e) {
  e.preventDefault();
  e.stopPropagation();

  const $target = $(e.currentTarget);
  const $basePercentInput = $target.closest("tr").find(".funds--input-percent");

  $basePercentInput.focus();
}

function onSearchOnFocus(e) {
  const $target = $(e.target);

  if ($target.val() === "") {
    $("#results-funds").fadeOut();
  } else {
    $("#results-funds").fadeIn();
  }
}

preLoadFunctionsAndListeners();
