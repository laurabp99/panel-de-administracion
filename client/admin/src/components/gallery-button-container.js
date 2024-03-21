import { store } from '../redux/store.js'
import { setImageGallery } from '../redux/images-slice.js'

class GalleryButtonContainer extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.name = this.getAttribute('name')
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
        width: 5rem;
      }

      .gallery-button{
        border-radius: 20px;
        font-size: 20px;
        height: 5rem;
        width: 5rem;
      }
      </style>

      <div class="gallery-button-container">
        <button class="gallery-button"><p>+</p></button>
      </div>
    `

    const galleryButton = this.shadow.querySelector('.gallery-button-container')

    galleryButton.addEventListener('click', () => {
      const image = {
        name: this.getAttribute('name')
      }

      store.dispatch(setImageGallery(image))
      document.dispatchEvent(new CustomEvent('showGalleryModal'))
    })
  }
}

customElements.define('gallery-button-container-component', GalleryButtonContainer)
