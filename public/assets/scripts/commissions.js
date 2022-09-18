function preLoadFunctionsAndListeners() {
  // setupDefaults
  $document = $(document);
  $paginationButtons = $(".js--pagination");
  $checkbox = $(".js--table-checkbox");
  $pagesText = $(".pages");

  // Initiate the html logic pages
  $pagesText.html(
    `1 - ${
      shareholdersJsonStatic.length < 10 ? shareholdersJsonStatic.length : 10
    } de ${shareholdersJsonStatic.length}`
  );

  // Complete tree structure
  $(".tree-routes").html("Home > Cuotapartistas");

  // Active current navigation
  $(".nav-bar--link").removeClass("active");
  $(".link--ag").addClass("active");

  // Listeners
  $paginationButtons.on("click", pagination);
  $document.on("click", $checkbox, onCheckboxPress);

  // Call functions
  fullFillShareholdersTable();
}

function fullFillShareholdersTable(index = 0, numberOfResultsToShow = 10) {
  $("#commissions").hide();

  $(`#commissions tbody`).empty();

  if (shareholdersJsonStatic.length > 0) {
    $(`#commissions, .pagination`).show();
    $(".no-data--error-message").remove();

    for (index; index < numberOfResultsToShow; index++) {
      let shareholder = shareholdersJsonStatic[index];
      if (shareholder !== undefined)
        $(`#commissions tbody`).append(
          `
            <tr>
                <td><input type="checkbox" class="js--table-checkbox" data-id="${shareholder.id}"/></td>
                <td>${shareholder.id}</td>
                <td class="js--shareholder" data-id="${shareholder.id}">${shareholder.name}</td>
                <td>${shareholder.shareholder}</td>
                <td>${shareholder.consider}</td>
                <td>${shareholder.officer}</td>
                <td>${shareholder.ag}</td>
                <td>${shareholder.branch}</td>
            </tr>  
          `
        );
    }
    $(".js--shareholder").on("click", onShareHolderPress);
  } else {
    $(`#commissions table, .pagination`).hide();
    $(`#commissions`).append(
      `<h2 class="no-data--error-message">No se encontraron cuotapartistas</h2>`
    );
  }
}

function pagination(e) {
  e.preventDefault();
  e.stopPropagation();

  const $target = $(e.currentTarget);
  const $actualPage = parseFloat($(".pages").attr("data-page"));
  const $goToPage = $target.attr("data-go-page");
  let $totalPages = Math.ceil(shareholdersJsonStatic.length / 10);

  if ($totalPages !== 0) $totalPages--;

  if (
    ($goToPage === "0" && $actualPage === 0) ||
    ($goToPage === "-1" && $actualPage === 0) ||
    ($goToPage === "1" && $actualPage === $totalPages) ||
    ($goToPage === "999" && $actualPage === $totalPages)
  ) {
    return;
  }

  let $index = 0;
  let $numberOfShareholdersToShow = 10;
  let $newCurrentPage = 0;

  switch ($goToPage) {
    case "999":
      $index = $totalPages * 10;
      $numberOfShareholdersToShow = shareholdersJsonStatic.length;
      $newCurrentPage = $totalPages;
      break;
    case "-1":
      $index = ($actualPage - 1) * 10;
      $numberOfShareholdersToShow = $actualPage * 10;
      $newCurrentPage = $actualPage - 1;
      break;
    case "1":
      $index = ($actualPage + 1) * 10;
      $numberOfShareholdersToShow = 10 + ($actualPage + 1) * 10;
      $newCurrentPage = $actualPage + 1;
      break;
    default:
      break;
  }

  $(".pages").html(
    `${$index + 1} - ${
      $newCurrentPage !== $totalPages
        ? $numberOfShareholdersToShow
        : shareholdersJsonStatic.length
    } de ${shareholdersJsonStatic.length}`
  );

  $(".pages").attr("data-page", $newCurrentPage);

  if ($totalPages > 0)
    fullFillShareholdersTable($index, $numberOfShareholdersToShow);
}

function onCheckboxPress() {
  let $targets = $(".js--table-checkbox:checked");

  let attributeDisabledButton = $targets.length > 0 ? false : true;
}

function onShareHolderPress(e) {
  e.preventDefault();
  e.stopPropagation();
  const $target = $(e.target);
  const shareHolderDataId = $target.attr("data-id");

  // Save the ID of the shareholder selected.
  localStorage.setItem("shareHolderDataId", shareHolderDataId);

  // Redirect to the shareholder edit page.
  $(".contentManagement").load("templates/edit-shareholder.html");
}

preLoadFunctionsAndListeners();
feather.replace();
