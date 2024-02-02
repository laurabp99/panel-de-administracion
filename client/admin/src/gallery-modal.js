class GalleryModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()

    const galleryModal = this.shadow.querySelector('.gallery-modal')

    document.addEventListener('showGalleryModal', event => {
      galleryModal.classList.add('active')
    })
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>
              .gallery-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: hsla(0, 0%, 0%, 0.5);
                z-index: 1400;
                justify-content: center;
                align-items: center;
              }
              
              .gallery-modal.active{
                display: flex;
                font-size: 20px;
                font-weight:600;
                cursor: pointer;
                position: absolute;
                right: 15px;
              }
              
              .gallery-modal-content{
                color: black;
                background-color: hsl(240, 74%, 56%);
                padding: 20px;
                border-radius: 5px;
                border: 0.2rem solid white;
                box-shadow: 7px 8px 5px black;
                max-width: 400px;
                width: 30rem;
                height: 20rem;
                text-align: center;
                display: flex;
                justify-content: center;
              }
            </style>

            <div class='gallery-modal'>
              <div class='gallery-modal-content'></div>
            </div>
          `
  }

  openGalleryModal () {
    const galleryModal = this.shadow.querySelector('.gallery-modal')
    galleryModal.classList.add('active')
  }
}

customElements.define('gallery-modal-component', GalleryModal)
