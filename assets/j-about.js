var swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: "44rem",
  autoplay:{
    delay: 3000,
  }
  navigation: {
    nextEl: "#swiper-b-nxt",
    prevEl: "#swiper-b-prv",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 16,
    },

    770: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});
