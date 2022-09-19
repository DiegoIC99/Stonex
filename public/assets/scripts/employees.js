function preLoadFunctionsAndListeners() {
  // setupDefaults
  let $document = $(document);
  let $paginationButtons = $(".js--pagination");
  let $checkbox = $(".js--table-checkbox");
  let $linkOfficerButton = $(".js--link-officer");
  let $linkEmployeeButton = $(".js--link-employee");
  let $pagesText = $(".pages");
  let $employeeType = $(".js--employee-type");
  isEmployeesType = $(".types--employees").hasClass("active");

  dynamicDataToUse = isEmployeesType ? employeesJsonStatic : officersJsonStatic;

  if (isEmployeesType) {
    $("#employees").show();
    $("#account-officers").hide();
  } else {
    $("#account-officers").show();
    $("#employees").hide();
  }

  // Initiate the html logic pages
  $pagesText.html(
    `1 - ${dynamicDataToUse.length < 10 ? dynamicDataToUse.length : 10} de ${
      dynamicDataToUse.length
    }`
  );

  // Complete tree structure
  $(".tree-routes").html("Home > Empleados");

  // Active current navigation
  $(".nav-bar--link").removeClass("active");
  $(".link--employees").addClass("active");

  // Listeners
  $paginationButtons.on("click", pagination);
  $linkOfficerButton.on("click", linkEmployeesWithOfficers);
  $linkEmployeeButton.on("click", linkOfficersWithEmployees);
  $employeeType.on("click", onChangeEmployeeType);
  $document.on("click", $checkbox, onCheckboxPress);

  // Call functions
  fullFillEmployeesTable();
}

function fullFillEmployeesTable(index = 0, numberOfEmployeesToShow = 10) {
  let tableToDisplay = isEmployeesType ? "employees" : "account-officers";
  $("#employees, #account-officers").hide();

  $(`#${tableToDisplay} tbody`).empty();

  if (dynamicDataToUse.length > 0) {
    $(`#${tableToDisplay}, .pagination`).show();
    $(".no-data--error-message").remove();

    for (index; index < numberOfEmployeesToShow; index++) {
      let employee = dynamicDataToUse[index];
      if (employee !== undefined)
        $(
          `#${isEmployeesType ? "employees" : "account-officers"} tbody`
        ).append(
          `
          ${
            isEmployeesType
              ? `<tr>
                    <td><input type="checkbox" class="js--table-checkbox" data-id="${employee.id}"/></td>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.managment}</td>
                    <td>${employee.bejermanFile}</td>
                    <td>${employee.sunFile}</td>
                    <td>${employee.enterprise}</td>
                    <td>${employee.sector}</td>
                    <td>${employee.salary}</td>
                </tr>`
              : `<tr>
                    <td><input type="checkbox" class="js--table-checkbox" data-id="${employee.id}"/></td>
                    <td>${employee.origin}</td>
                    <td>${employee.name}</td>
                    <td>${employee.ag}</td>
                    <td>${employee.branch}</td>
                    <td>${employee.base}</td>
                    <td>${employee.commission}</td>
                </tr>`
          }
        `
        );
    }

    if (typeHasBeenChanged) {
      // Initiate the html logic pages
      $(".pages").html(
        `1 - ${
          dynamicDataToUse.length < 10 ? dynamicDataToUse.length : 10
        } de ${dynamicDataToUse.length}`
      );
      typeHasBeenChanged = false;
    }
  } else {
    $(`#${tableToDisplay} table, .pagination`).hide();
    $(`#${tableToDisplay}`).append(
      `<h2 class="no-data--error-message">No se encontraron ${
        isEmployeesType ? "empleados" : "oficiales de cuenta"
      }</h2>`
    );
  }
}

function pagination(e) {
  e.preventDefault();
  e.stopPropagation();

  const $target = $(e.currentTarget);
  const $actualPage = parseFloat($(".pages").attr("data-page"));
  const $goToPage = $target.attr("data-go-page");
  let $totalPages = Math.ceil(dynamicDataToUse.length / 10);

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
  let $numberOfEmployeesToShow = 10;
  let $newCurrentPage = 0;

  switch ($goToPage) {
    case "999":
      $index = $totalPages * 10;
      $numberOfEmployeesToShow = dynamicDataToUse.length;
      $newCurrentPage = $totalPages;
      break;
    case "-1":
      $index = ($actualPage - 1) * 10;
      $numberOfEmployeesToShow = $actualPage * 10;
      $newCurrentPage = $actualPage - 1;
      break;
    case "1":
      $index = ($actualPage + 1) * 10;
      $numberOfEmployeesToShow = 10 + ($actualPage + 1) * 10;
      $newCurrentPage = $actualPage + 1;
      break;
    default:
      break;
  }

  $(".pages").html(
    `${$index + 1} - ${
      $newCurrentPage !== $totalPages
        ? $numberOfEmployeesToShow
        : dynamicDataToUse.length
    } de ${dynamicDataToUse.length}`
  );

  $(".pages").attr("data-page", $newCurrentPage);

  if ($totalPages > 0) fullFillEmployeesTable($index, $numberOfEmployeesToShow);
}

function onCheckboxPress() {
  let $targets = $(".js--table-checkbox:checked");

  let attributeDisabledButton = $targets.length > 0 ? false : true;

  if (isEmployeesType) {
    $(".link-officer, .compare").attr("disabled", attributeDisabledButton);
  } else {
    $(".link-employee, .delete-officer").attr(
      "disabled",
      attributeDisabledButton
    );
  }
}

function linkEmployeesWithOfficers() {
  const modalToShow = $(".generic-modal");
  showModal(modalToShow, {
    title: "Vincular con oficial",
    content: "templates/modal-employees.html",
    confirmTextButton: "Guardar cambios",
    cancelTextButton: "Cancelar",
    styles: { width: "872px" },
  });
}

function linkOfficersWithEmployees() {
  const modalToShow = $(".generic-modal");
  showModal(modalToShow, {
    title: "Vincular con empleado",
    content: "templates/modal-officers.html",
    confirmTextButton: "Guardar cambios",
    cancelTextButton: "Cancelar",
    styles: { width: "872px" },
  });
}

function onChangeEmployeeType(e) {
  const $target = $(e.target);

  // Check if type is employee or account officer
  isEmployeesType = $target.hasClass("types--employees");

  $(".js--employee-type").removeClass("active");
  $target.addClass("active");

  // Change the data dynamically based on the type.
  dynamicDataToUse = isEmployeesType ? employeesJsonStatic : officersJsonStatic;

  if (isEmployeesType) {
    $(".actions .title").html("Empleados");
    $(".show-employees").show();
    $(".show-officers").hide();
  } else {
    $(".actions .title").html("Oficiales de cuenta");
    $(".show-officers").show();
    $(".show-employees").hide();
  }

  $(".js--table-checkbox").prop("checked", false);

  // Restore pagination
  $(".pages").attr("data-page", "0");

  typeHasBeenChanged = true;

  fullFillEmployeesTable();
}

preLoadFunctionsAndListeners();
feather.replace();
