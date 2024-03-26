import { store } from '../redux/store.js'
import { setImageGallery, removeImage } from '../redux/images-slice.js'

class GalleryButtonContainer extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.images = []
  }

  connectedCallback () {
    this.name = this.getAttribute('name')

    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()
      this.images = currentState.images.showedImages
      this.showThumbnails(this.images)
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <style>
      .gallery-button-container{
        align-items: center;
        color: white;
        display: flex;
        flex-direction: column;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 13px;
        position: relative;
        width: 5rem;
      }

      .gallery-button{
        border-radius: 20px;
        font-size: 20px;
        height: 5rem;
        width: 5rem;
      }

      .gallery-button-container img{
        height: 100%;
        object-fit: cover;
        width: 100%;
      }

      .delete-image {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 30px;
        height: 30px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1001;
      }

      .gallery-button-container:hover .delete-image {
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
      }

      .delete-image::after {
        content: "\u00D7"; /* Código de la cruz unicode */
        font-size: 20px;
        color: #000;
      }

      </style>

      <div class="gallery-button-container">
        <button class="gallery-button"><p>+</p></button>
      </div>
    `

    const galleryButton = this.shadow.querySelector('.gallery-button-container')

    galleryButton.addEventListener('click', event => {
      if (event.target.closest('.gallery-button')) {
        const image = {
          name: this.getAttribute('name')
        }

        store.dispatch(setImageGallery(image))
        document.dispatchEvent(new CustomEvent('showGalleryModal'))
      }
    })
  }

  showThumbnails (images) {
    images.forEach(image => {
      if (image.name === this.name) {
        const galleryButton = this.shadow.querySelector('.gallery-button-container')
        const imageElement = document.createElement('img')
        imageElement.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${image.filename}`
        imageElement.classList.add('image')
        galleryButton.innerHTML = imageElement.outerHTML

        const closeButton = document.createElement('div')
        closeButton.classList.add('delete-image')
        galleryButton.appendChild(closeButton)

        closeButton.addEventListener('click', () => {
          alert('hola')
        })
      }
    })
  }
}

customElements.define('gallery-button-container-component', GalleryButtonContainer)
