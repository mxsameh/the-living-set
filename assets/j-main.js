var swiper = new Swiper(".swiper", {
  slidesPerView: 2.5,
  spaceBetween: "44rem",
  navigation: {
    nextEl: "#swiper-b-nxt",
    prevEl: "#swiper-b-prv",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 16,
    },

    770: {
      slidesPerView: 2.5,
      spaceBetween: 44,
    },
  },
});
