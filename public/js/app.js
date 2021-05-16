$("#updateForm").hide();
$("#updateBtn").on("click", function () {
  $("#updateForm").toggle();
});

window.onclick = function (event) {
  if (!event.target.matches("#updateBtn")) {
    $("#updateForm").hide();
  }
};

$(".aboutUs_memberOne").on("mouseover", () => {
  $(".imgOne").addClass("imghover");
});

$(".aboutUs_memberTwo").on("mouseover", () => {
  $(".imgTwo").addClass("imghover");
});

$(".aboutUs_memberThree").on("mouseover", () => {
  $(".imgThree").addClass("imghover");
});

$(".aboutUs_memberFour").on("mouseover", () => {
  $(".imgFour").addClass("imghover");
});

$(".aboutUs_memberFive").on("mouseover", () => {
  $(".imgFive").addClass("imghover");
});

$(".aboutUs_memberOne").on("mouseout", () => {
  $(".imgOne").removeClass("imghover");
});

$(".aboutUs_memberTwo").on("mouseout", () => {
  $(".imgTwo").removeClass("imghover");
});

$(".aboutUs_memberThree").on("mouseout", () => {
  $(".imgThree").removeClass("imghover");
});

$(".aboutUs_memberFour").on("mouseout", () => {
  $(".imgFour").removeClass("imghover");
});

$(".aboutUs_memberFive").on("mouseout", () => {
  $(".imgFive").removeClass("imghover");
});
