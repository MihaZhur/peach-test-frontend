import { body, MOBILE_WIDTH } from "./utils";

const directionItemsWrap = body.querySelectorAll('.directions__item-wrap')

directionItemsWrap?.forEach(item => {
  item?.addEventListener('click', (evt) => {
    if(window.innerWidth <= MOBILE_WIDTH) {
      if(evt.target.closest('.directions__item-title')) {
        !item.classList.contains('active') ? item.classList.add('active') : item.classList.remove('active')
      }
    }
  })
})