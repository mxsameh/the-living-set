var swiper = new Swiper(".s-rel .swiper", {
  slidesPerView: 3,
  spaceBetween: "44rem",
  navigation: {
    nextEl: ".s-rel #swiper-b-nxt",
    prevEl: ".s-rel #swiper-b-prv",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.34,
      spaceBetween: "20rem",
    },

    770: {
      slidesPerView: 3,
      spaceBetween: 44,
    },
  },
});
