$("#updateForm").hide();
$("#updateBtn").on("click", function () {
  $("#updateForm").toggle();
});

window.onclick = function (event) {
  if (!event.target.matches("#updateBtn")) {
    $("#updateForm").hide();
  }
};
