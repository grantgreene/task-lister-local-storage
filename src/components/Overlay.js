class Overlay {
  constructor() {
    this.updateStatusOverlay = document.querySelector('.update-status-overlay');
    this.eventListeners();
  }

  openOverlay() {
    this.updateStatusOverlay.classList.add('open');
  }

  closeOverlay() {
    this.updateStatusOverlay.classList.remove('open');
  }

  eventListeners() {
    document.addEventListener('openOverlayEvent', this.openOverlay.bind(this));
    document.addEventListener('closeOverlayEvent', this.closeOverlay.bind(this));
    document.addEventListener('click', e => {
      if (e.target.classList.contains('update-status-box__close')) {
        this.closeOverlay();
      }
    });
  }
}

export default Overlay;
