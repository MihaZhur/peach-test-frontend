import Swiper, {Pagination, Navigation, Autoplay} from "swiper";
import { body } from "./utils";

const galleryPagination = body.querySelector('.gallery-pagination')
const lengthSlides = body.querySelectorAll('.swiper-slide').length
const gallerySwiper = new Swiper('.gallery-swiper', {
  modules:[Pagination, Navigation, Autoplay],
  pagination: {
    el: '.gallery-pagination',
  },
  navigation: {
    prevEl: '.gallery-arrow--prev',
    nextEl: '.gallery-arrow--next'
  },
  loop:true,
  autoplay: {
    delay: 5000,
  },
})
galleryPagination.style.gridTemplateColumns = `repeat(${lengthSlides}, 1fr)`