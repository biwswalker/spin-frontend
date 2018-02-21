$(document).ready(function () {
  $("task").click(function () {
    $(this).find(".selection").addClass(function (index, currentClass) {
      var addedClass;
      if (currentClass === "card task-card selection selected") {
        $(this).removeClass('selected')
        addedClass = "";
      } else {
        $("task").find(".selection").removeClass('selected')
        addedClass = "selected";
      }
      return addedClass;
    })
  });
});