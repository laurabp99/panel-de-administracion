class GalleryModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()

    document.addEventListener('showGalleryModal', this.handleShowGalleryModal.bind(this))

    const imageInput = this.shadow.querySelector('#imageInput')
    // imageInput.addEventListener('change', this.handleImageInputChange.bind(this))

    const closeButton = this.shadow.querySelector('.close-button')
    closeButton.addEventListener('click', this.closeGalleryModal.bind(this))
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
      
      .gallery-modal.active{
        display: flex;
        font-size: 20px;
        font-weight:600;
        cursor: pointer;
        position: absolute;
        right: 15px;
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
          margin: 10px;
      }
  
      .gallery-image {
          width: 7rem;
          height: 7rem;
          object-fit: cover;
          border-radius: 5px;
          margin: 10px;
      }
  
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 32px;
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
      </div>
    </div>
  `

    const input = this.shadow.querySelector('#imageInput')

    input.addEventListener('change', (event) => {
      this.uploadImage(event.target.files[0])
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
    console.log(data)
    const galleryModalContent = this.shadow.querySelector('.gallery-modal-content')
    data.forEach(imageName => {
      const imageUrl = `${import.meta.env.VITE_API_URL}/api/admin/images/${imageName}`
      const imageElement = document.createElement('img')
      imageElement.src = imageUrl
      imageElement.classList.add('gallery-image')

      galleryModalContent.appendChild(imageElement)
    })
  }

  openGalleryModal () {
    const galleryModal = this.shadow.querySelector('.gallery-modal')
    galleryModal.classList.add('active')
  }

  closeGalleryModal () {
    const galleryModal = this.shadow.querySelector('.gallery-modal')
    galleryModal.classList.remove('active')
  }
}

customElements.define('gallery-modal-component', GalleryModal)
