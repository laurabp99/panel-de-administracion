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
        }

        .gallery-modal-content {
          color: black;
          background-color: hsl(240, 74%, 56%);
          padding: 20px;
          border-radius: 5px;
          border: 0.2rem solid white;
          box-shadow: 7px 8px 5px black;
          width: 80%;
          height: 80%;
          max-width: 800px;
          max-height: 80vh;
          overflow-y: auto;
          text-align: center;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 50px;
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
        }

        .gallery-image-container {
            position: relative;
            display: inline-block;
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
          width: 7rem;
          height: 7rem;
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
          display: block;
        }

        .gallery-image-container:hover .close-icon {
          display: flex;
        }

        .selected {
          border: 4px solid green;
        }
      </style>

      <div class='gallery-modal'>
        <div class='gallery-modal-content'>
          <div class="close-button">&#10006;</div>
          <div class='gallery-button-container'>
            <input type='file' id='imageInput' name="file" accept='image/*'>
            <label for='imageInput'>+</label>
          </div>
        </div>
      </div>
    `

    this.getThumbnails()

    const galleryModal = this.shadow.querySelector('.gallery-modal')
    const input = this.shadow.querySelector('#imageInput')

    galleryModal.addEventListener('click', event => {
      if (event.target.closest('.close-button')) {
        this.closeGalleryModal()
      }

      if (event.target.closest('.delete-image')) {
        const deleteButton = event.target.closest('.delete-image')
        const imageContainer = deleteButton.parentNode
        const image = imageContainer.querySelector('.gallery-image')
        const name = image.src.split('/')
        this.deleteImage(name[name.length - 1])
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

    const imageElement = document.createElement('img')
    imageElement.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${imageName}`
    imageElement.classList.add('gallery-image')

    const closeButton = document.createElement('div')
    closeButton.classList.add('delete-image')

    imageElementContainer.appendChild(imageElement)
    imageElementContainer.appendChild(closeButton)
    galleryModalContent.appendChild(imageElementContainer)

    galleryModalContent.addEventListener('click', event => {
      if (event.target.classList.contains('gallery-image')) {
        const selectedImage = event.target
        const imageContainers = this.shadow.querySelectorAll('.gallery-image-container')

        imageContainers.forEach(container => {
          container.classList.remove('selected')
        })

        selectedImage.parentNode.classList.add('selected')
      }
    })
  }
}

customElements.define('gallery-modal-component', GalleryModal)
