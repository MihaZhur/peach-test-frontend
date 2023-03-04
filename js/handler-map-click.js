import { body, scrollToSection, DESCKTOP_WIDTH, MOBILE_WIDTH } from "./utils";
import dataMap from "./data-map";
import smoothscroll from 'smoothscroll-polyfill'


const ANIMATION_TIME_MAP = 300;

const map = body.querySelector(".map");
const lineActive = map.querySelector(".numbers__active-menu");
const wrapperMapImage = map.querySelector(".map__wrapper img");
const mapWrapper = map.querySelector('.map__wrapper')
const currentRegionPosition = map.querySelector(".map__current-region");
const INIT_MAP = 0
let checkScroll = true
let aciveMapObj = {
  map: "",
};
// kick off the polyfill!
smoothscroll.polyfill()


const scrollNavbar = () => {
  if(!checkScroll && window.innerWidth >= DESCKTOP_WIDTH){
    let targetBlock = map.querySelector('.map__navbar ')
    let srollHeight =  targetBlock.getBoundingClientRect().top + scrollY
    scrollToSection(srollHeight)
  }
 
}

const getPositionRegion = (top = 0, left = 0) => {
  if(window.innerWidth < DESCKTOP_WIDTH && !checkScroll){
    currentRegionPosition.style.top = top + 'px'
    currentRegionPosition.style.left = left + 'px'
    let topPosition = currentRegionPosition.getBoundingClientRect().top + scrollY - window.innerHeight / 2
    let leftPosition = +left - window.innerWidth / 2
    scrollToSection(topPosition)
    mapWrapper.scroll({
      behavior:'smooth',
      left:leftPosition
    })
  }
}

const visibilityItemsCity = (target) => {
  let parentElem = target.parentNode
  if(window.innerWidth <= MOBILE_WIDTH) {
    if(!target.classList.contains('empty')) {
      !parentElem.classList.contains('active') ? parentElem.classList.add('active') :  parentElem.classList.remove('active')
    }
  }
}

const activeTab = (btn) => {
  lineActive.style.width = btn.clientWidth + "px";
  lineActive.style.left = btn.offsetLeft + "px";
};

const handlerTrap = {
  set: (target, props, value) => {
    if (props) {
      let btnPrev = map.querySelector(`[data-county="${target[props]}"]`);
      btnPrev?.classList.remove("navbar__head-link--active");
      target[props] = value;
      let btnCurrent = map.querySelector(`[data-county="${target[props]}"]`);
      wrapperMapImage.classList.add("hidden");
      setTimeout(() => {
        wrapperMapImage.src = dataMap.maps.find(
          (item) => item.categoryId == target[props]
        ).image;
        wrapperMapImage.classList.remove("hidden");
      }, ANIMATION_TIME_MAP);
      btnCurrent?.classList.add("navbar__head-link--active");
      activeTab(btnCurrent);
      scrollNavbar()
      getPositionRegion(btnCurrent.dataset.positionTop, btnCurrent.dataset.positionLeft)
      checkScroll = false
      return true;
    }
    return false;
  },
};

aciveMapObj = new Proxy(aciveMapObj, handlerTrap);

const handlerSelect = () => {
  if (!map.classList.contains("open-select")) {
    map.classList.add("open-select");
    scrollNavbar()
  } 
  else map.classList.remove("open-select");
};

const closeSelect = () => {
  if (map.classList.contains("open-select"))
    map.classList.remove("open-select");
};
const selectMap = (button) => {
  if (!button.classList.contains("navbar__head-link--active")) {
    aciveMapObj.map = button.dataset.county;
  }
};

const handlerMapClick = (evt) => {
  evt.preventDefault();
  let target = evt.target;
  if (target.closest(".navbar__select-button")) handlerSelect();
  if (target.closest(".map__wrapper")) closeSelect();
  if (target.closest("[data-county]")) selectMap(target);
  if (target.closest(".map__info-title")) visibilityItemsCity(target);
};

map?.addEventListener("click", handlerMapClick);

aciveMapObj.map = INIT_MAP;


