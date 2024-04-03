$(document).ready(function () {
  $("#myTable").DataTable({
    //

    responsive: true,
    columnDefs: [
      { responsivePriority: 1, targets: 0 },
      { responsivePriority: 2, targets: -1 },
    ],
    stateSave: true,
  });
});
