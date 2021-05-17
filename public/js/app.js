$("#updateForm").hide();
$("#updateBtn").on("click", function () {
  $("#updateForm").toggle();
});

window.onclick = function (event) {
  if (!event.target.matches("#updateBtn")) {
    $("#updateForm").hide();
  }
};

// $(".aboutUs_memberOne").on("mouseover", () => {
//   $(".imgOne").addClass("imghover");
// });
//
// $(".aboutUs_memberTwo").on("mouseover", () => {
//   $(".imgTwo").addClass("imghover");
// });
//
// $(".aboutUs_memberThree").on("mouseover", () => {
//   $(".imgThree").addClass("imghover");
// });
//
// $(".aboutUs_memberFour").on("mouseover", () => {
//   $(".imgFour").addClass("imghover");
// });
//
// $(".aboutUs_memberFive").on("mouseover", () => {
//   $(".imgFive").addClass("imghover");
// });
//
// $(".aboutUs_memberOne").on("mouseout", () => {
//   $(".imgOne").removeClass("imghover");
// });
//
// $(".aboutUs_memberTwo").on("mouseout", () => {
//   $(".imgTwo").removeClass("imghover");
// });
//
// $(".aboutUs_memberThree").on("mouseout", () => {
//   $(".imgThree").removeClass("imghover");
// });
//
// $(".aboutUs_memberFour").on("mouseout", () => {
//   $(".imgFour").removeClass("imghover");
// });
//
// $(".aboutUs_memberFive").on("mouseout", () => {
//   $(".imgFive").removeClass("imghover");
// });
const nav = document.querySelector(".header__nav");
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link
      .closest(".header__nav")
      .querySelectorAll(".nav__link");
    // const logo = link.closest(".header__nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        // logo.style.opacity = this;
        el.style.opacity = this;
      }
    });
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
