import dataMap from "../data-map";
class MapCity {
  constructor(options) {
    this.$navbar = document.querySelector(options.navbar);
    this.$popup = document.querySelector(options.popup);
    this.currentRegion = document.querySelector(options.currentRegion)
    this.data = options.data;
    this.currentRegion && 
    this.$navbar && this.render();
    this.$popup && this.renderPopup();
  }
  render() {
    let html = (county) => `
    <li class="navbar__head-item">
          <a href="#" class="navbar__head-link" data-position-left="${county.positionRegion.left}"  data-position-top="${county.positionRegion.top}" data-county="${county.id}">${county.label}</a>
     </li>
    `;
    this.data.county.forEach((county) =>
      this.$navbar.insertAdjacentHTML("beforeend", html(county))
    );
  }
  renderPopup() {
    let html = (county, cityes) => ` <div class="map__info-list">
      <div  class="map__info-title ${cityes.length == 0 ? 'empty' : ''}" >
        ${county.label}
      </div>
      ${cityes
        .map((item) => '<div class="map__info-item">' + item + "</div>")
        .join("")}
    </div>`;
    this.data.county.forEach((county) => {
      let cityes = this.data.maps.find((item) => county.id === item.categoryId);
      if (county.id != 0) {
        this.$popup.insertAdjacentHTML("beforeend", html(county, cityes.city));
      }
    });
  }
  // renderRegion() {
  //   let html = (position) => {

  //   }
  // }
}

new MapCity({
  navbar: ".navbar__head-list",
  popup: ".map__info-wrapper",
  currentRegion: '.map__current-region',
  data: dataMap,
});
