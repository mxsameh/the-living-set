var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: "#swiper-b-nxt",
    prevEl: "#swiper-b-prv",
  },
  autoplay: {
    delay: 5000,
  },
});
