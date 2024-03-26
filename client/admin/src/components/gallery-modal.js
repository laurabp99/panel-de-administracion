import { store } from '../redux/store.js'
import { showImage, removeImage } from '../redux/images-slice.js'

class GalleryModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()

    document.addEventListener('showGalleryModal', this.handleShowGalleryModal.bind(this))
  }

  handleShowGalleryModal (event) {
    const galleryModal = this.shadow.querySelector('.gallery-modal')
    galleryModal.classList.add('active')
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

        .gallery-modal.active {
          display: flex;
          height: 100vh;
        }

        .gallery-modal-content {
          color: black;
          background-color: hsl(240, 74%, 56%);
          padding: 20px;
          border-radius: 5px;
          border: 0.2rem solid white;
          box-shadow: 7px 8px 5px black;
          width: 80%;
          max-width: 48rem;
          max-height: 80vh;
          overflow-y: auto;
          text-align: center;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 50px;
          padding-bottom: 5rem;

        }

        .gallery-button-container input[type="file"] {
          display: none;
          position: absolute;
          top: 10px;
          left: 10px;
        }

        .gallery-button-container input[type="file"] + label {
          background-color: hsl(240, 79%, 68%);
          border-radius: 20px;
          font-size: 28px;
          height: 7rem;
          width: 7rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin: 5px;
        }

        .gallery-image-container {
            position: relative;
            display: inline-block;
            margin: 5px;
            height: 7rem;
            width: 7rem;
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
        }

        .delete-image:hover {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .delete-image::after {
          content: "\u00D7"; /* Código de la cruz unicode */
          font-size: 20px;
          color: #000;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 32px;
          color: white;
          cursor: pointer;
        }

        .close-icon {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgba(255, 0, 0, 0.5);
          display: none;
          justify-content: center;
          align-items: center;
        }

        .gallery-image-container:hover .delete-image {
          display: flex;
        }

        .gallery-image-container:hover .close-icon {
          display: flex;
        }

        .selected {
          border: 4px solid green;
          box-sizing: border-box;
        }

        .select-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: white;
          color: #4CAF50;
          border: 2px solid #4CAF50;
          border-radius: 5px;
        }

        .select-button.selected { /* Agrega el estilo cuando se hace clic en una imagen */
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
        }
      </style>

      <div class='gallery-modal'>
        <div class='gallery-modal-content'>
          <div class="close-button">&#10006;</div>
          <div class='gallery-button-container'>
            <input type='file' id='imageInput' name="file" accept='image/*'>
            <label for='imageInput'>+</label>
          </div>
          <button class="select-button">Seleccionar</button>
        </div>
      </div>
    `
    const galleryModalContent = this.shadow.querySelector('.gallery-modal-content')

    galleryModalContent.addEventListener('click', event => {
      if (event.target.classList.contains('gallery-image')) {
        const selectedImage = event.target
        const selectedContainer = selectedImage.parentNode

        // Si la imagen ya está seleccionada, la deselecciona
        if (selectedContainer.classList.contains('selected')) {
          selectedContainer.classList.remove('selected')
        } else {
          // Si la imagen no está seleccionada, la selecciona y deselecciona las demás
          const imageContainers = this.shadow.querySelectorAll('.gallery-image-container')
          imageContainers.forEach(container => {
            container.classList.remove('selected')
          })
          selectedContainer.classList.add('selected')
          this.shadow.querySelector('.select-button').classList.add('selected')
        }
      }

      if (event.target.closest('.select-button')) {
        const selectedImageContainer = this.shadow.querySelector('.gallery-image-container.selected')
        if (selectedImageContainer) {
          const selectedImage = selectedImageContainer.querySelector('.gallery-image')
          if (selectedImage) {
            let image = store.getState().images.imageGallery
            const filename = selectedImageContainer.dataset.filename
            // const alt = this.shadow.querySelector('input[name="alt"]').value
            // const title = this.shadow.querySelector('input[name="title"]').value
            // const filename = this.shadow.querySelector('.image.selected').getAttribute('data-filename')
            image = { ...image, filename }

            store.dispatch(showImage(image))
          }
        }

        const galleryModal = this.shadow.querySelector('.gallery-modal')
        galleryModal.classList.remove('active')
      }
    })

    this.getThumbnails()

    const galleryModal = this.shadow.querySelector('.gallery-modal')
    const input = this.shadow.querySelector('#imageInput')

    galleryModal.addEventListener('click', async event => {
      if (event.target.closest('.close-button')) {
        this.closeGalleryModal()
      }

      if (event.target.closest('.delete-image')) {
        const deleteButton = event.target.closest('.delete-image')
        const imageContainer = deleteButton.parentNode
        const image = imageContainer.querySelector('.gallery-image')
        const name = image.src.split('/')

        try {
          await this.deleteImage(name[name.length - 1])
          imageContainer.remove()
        } catch (error) {
          console.error(error)
        }
      }
    })

    input.addEventListener('change', (event) => {
      this.uploadImage(event.target.files[0])
    })
  }

  async getThumbnails () {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`)
    const thumbnails = await result.json()

    thumbnails.rows.forEach(row => {
      this.createImage(row.filename)
    })
  }

  async uploadImage (file) {
    const formData = new FormData()
    formData.append('file', file)

    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`, {
      method: 'POST',
      body: formData
    })
    const data = await result.json()

    data.forEach(imageName => {
      this.createImage(imageName)
    })
  }

  async deleteImage (imageName) {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images/${imageName}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.log(error)
    }
  }

  closeGalleryModal () {
    const galleryModal = this.shadow.querySelector('.gallery-modal')
    galleryModal.classList.remove('active')
  }

  createImage (imageName) {
    const galleryModalContent = this.shadow.querySelector('.gallery-modal-content')
    const imageElementContainer = document.createElement('div')
    imageElementContainer.classList.add('gallery-image-container')
    imageElementContainer.dataset.filename = imageName

    const imageElement = document.createElement('img')
    imageElement.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${imageName}`
    imageElement.classList.add('gallery-image')

    const closeButton = document.createElement('div')
    closeButton.classList.add('delete-image')

    imageElementContainer.appendChild(imageElement)
    imageElementContainer.appendChild(closeButton)
    galleryModalContent.appendChild(imageElementContainer)
  }
}

customElements.define('gallery-modal-component', GalleryModal)
