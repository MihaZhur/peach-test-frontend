export const body = document.body
export const DESCKTOP_WIDTH = 1280
export const MOBILE_WIDTH = 767
export const scrollToSection = (top = 0, left = 0) => {
  window.scroll({
    behavior: 'smooth',
    top: top,
    left: left
  })
}
