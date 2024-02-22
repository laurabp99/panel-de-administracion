class Form extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()

    document.addEventListener('showFilterModal', event => {
      this.openModal()
    })

    document.addEventListener('showGalleryModal', event => {
      this.openGalleryModal()
    })

    document.addEventListener('showElement', this.handleShowElement.bind(this))
  }

  handleShowElement (event) {
    this.showElement(event.detail.data)
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>
            main{
                display:flex;
                gap: 3rem;
            }
            
            form{
                flex: 1;
                gap: 2rem;
            }

            .form-top{
                align-items: center;
                display: flex;
                background-color: white;
                margin-bottom: 2rem;
                border: 0.2rem solid hsl(214, 86%, 73%);
                box-shadow: 7px 8px 5px black;
            }

            .tabs{
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                font-size: 90%;
                display: flex;
            }

            .tab{
                background-color: hsl(240, 79%, 68%);
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding:1rem;
                cursor: pointer;
            }

            .tab-content{
                display: none;
            }

            .tab-content.active{
                display: block;
            }

            .tab.active{
                background-color: hsl(184, 88%, 42%);
                color:white;
            }


            .form-buttons{
                display: flex;
                margin-left: auto;
                margin-right: 5px;
            }

            .form-buttons svg {
                fill: hsl(214, 86%, 73%);
            }

            .form-clear {
                width: 40px;
                cursor: pointer;
            }

            .form-save {
                width: 40px;
                cursor: pointer;
            }

            .form-row{
                display: flex;
                gap: 1rem;
                padding: 1rem;
            }

            .form-element{
                background-color: hsl(240, 74%, 56%);
                color: white;
                font-size: 18px;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                flex: 1;
            }

            .form-input input{
                width: 100%;
                background-color: hsl(240, 79%, 68%);
                padding: 1rem;
                border: 0.2rem solid hsl(214, 86%, 73%);
                box-shadow: 7px 8px 5px black;
                outline: none;
            }

            .name-validation{
                width: 100%;
                background-color: hsl(240, 79%, 68%);
                padding: 1rem;
                border: 0.2rem solid hsl(214, 86%, 73%);
                box-shadow: 7px 8px 5px black;
                outline: none;
            }

            .languages-tabs{
                display: flex;
                background-color: white;
                height: 3rem;
                margin: 1rem;
                border: 0.2rem solid hsl(214, 86%, 73%);
                box-shadow: 7px 8px 5px black;
            }

            .validate.error{
                border: 2px solid red;
            }

            .name-validation.error{
                border: 2px solid red;
            }

            .error-message{
              color: white;
              background-color: hsl(240, 74%, 56%);
              font-size: 20px;
              width: 100%;
            }

            .gallery{
              align-items: center;
              background-color: hsl(240, 79%, 68%);
              border: 0.2rem solid hsl(214, 86%, 73%);
              box-shadow: 7px 8px 5px black;
              display: flex;
              height: 15rem;
              justify-content: space-evenly;
              outline: none;
              width: 100%;
            }

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

          <div class='form-container'>
            <div class='form'>
              <div class='form-top'>
                <div class='tabs'>
                  <div class='tab active' data-tab='general'>
                    <span>Principal</span>
                  </div>
                  <div class='tab' data-tab='images'>
                    <span>Imágenes</span>
                  </div>
                </div>
                <div class='form-buttons'>
                  <div class='form-clear'>
                    <svg xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'>
                        <title>broom</title>
                        <path
                                  d='M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z' />
                        </svg>
                  </div>
                  <div class='form-save'>
                    <svg xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'>
                        <title>content-save</title>
                          <path
                          d='M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <form>
              <div class="error-message"></div>
              <input type="hidden" name="id" />
              <div class='tab-content active' data-tab='general'>
                <div class='form-row'>
                  <div class='form-element'>
                    <div class='form-label'>
                      <label>Nombre</label>
                    </div>
                    <div class='form-input'>
                      <input type='text' name="name" class='name-validation' data-onlyletters='true'>
                    </div>
                  </div>
                </div>
                </div>
                  <div class='languages-tabs'>
                    <div class='tabs'>
                      <div class='tab active' data-tab='español'>
                        <h2>es</h2>
                      </div>
                      <div class='tab' data-tab='ingles'>
                        <h2>en</h2>
                      </div>
                    </div>
                  </div>
                  <div class='form-row'>
                    <div class='form-element'>
                      <div class='form-label'>
                        <label>Pregunta</label>
                      </div>
                      <div class='form-input'>
                        <input type='text' class='name-validation' data-onlyletters='true'>
                      </div>
                    </div>
                  </div>
                  <div class='form-row'>
                    <div class='form-element'>
                      <div class='form-label'>
                        <label>Respuesta</label>
                      </div>
                      <div class='form-input'>
                        <textarea class='name-validation' data-onlyletters='true'></textarea>
                      </div>
                    </div>
                  </div>
                  <div class='tab-content active' data-tab='español'></div>
                  <div class='tab-content' data-tab='ingles'></div>
                </div>
                <div class='tab-content' data-tab='images'>
                  <div class='gallery'>
                    <div class='gallery-button-container'>
                      <h2>Avatar</h2>
                      <button class="gallery-button"><p>+</p></button>
                    </div>
                    <div class='gallery-button-container'>
                      <h2>Banner</h2>
                      <button class="gallery-button"><p>+</p></button>
                    </div>
                    <div class='gallery-button-container'>
                      <h2>Extra</h2>
                      <button class="gallery-button"><p>+</p></button>
                    </div>
                  </div>
                </div>
            </form>
          </div> 
          `

    const formContainer = this.shadow.querySelector('.form-container')

    formContainer.addEventListener('input', (event) => {
      if (event.target.closest('.validate')) {
        const validate = event.target.closest('.validate')

        if (validate.value.length < validate.dataset.minlength) {
          validate.classList.add('error')
        } else {
          validate.classList.remove('error')
        }
      }

      const nameValidation = event.target.closest('.name-validation')

      if (nameValidation.classList.contains('name-validation')) {
        const soloLetras = /^[A-Za-z]+$/

        if (!soloLetras.test(nameValidation.value)) {
          nameValidation.classList.add('error')
        } else {
          nameValidation.classList.remove('error')
        }
      }
    })

    formContainer.addEventListener('click', async (event) => {
      if (event.target.closest('.tab')) {
        const tab = event.target.closest('.tab')
        const lastActiveTab = tab.parentNode.querySelector('.active')
        if (tab) {
          lastActiveTab.classList.remove('active')
          tab.classList.add('active')
          this.shadow.querySelector(`.tab-content[data-tab='${tab.dataset.tab}']`).classList.add('active')
          this.shadow.querySelector(`.tab-content[data-tab='${lastActiveTab.dataset.tab}']`).classList.remove('active')
        }
      }

      if (event.target.closest('.form-clear')) {
        this.render()
      }

      if (event.target.closest('.form-save')) {
        const form = this.shadow.querySelector('form')
        const formData = new FormData(form)
        const formDataJson = Object.fromEntries(formData.entries())

        if (!formDataJson.id) {
          delete formDataJson.id
        }

        const endpoint = formDataJson.id ? `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${formDataJson.id}` : `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`
        const method = formDataJson.id ? 'PUT' : 'POST'
        delete formDataJson.id

        try {
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
          })

          if (response.status === 500 || response.status === 422) {
            throw response
          }

          if (response.status === 200) {
            const data = await response.json()
            document.dispatchEvent(new CustomEvent('message'))
          }
        } catch (response) {
          const errorMessage = this.shadow.querySelector('.error-message')
          errorMessage.innerHTML = ''
          const error = await response.json()
          error.message.forEach(error => {
            const errorLine = document.createElement('p')
            errorLine.innerHTML = error.message
            errorMessage.appendChild(errorLine)
            console.log(error.message)
          })
        }
        document.dispatchEvent(new CustomEvent('refresh'))
        this.render()
      }
    })
  }

  showElement (element) {
    console.log(Object.entries(element))
    Object.entries(element).forEach(([key, value]) => {
      const input = this.shadow.querySelector(`[name='${key}']`)

      if (input) {
        input.value = value
      }
    })
  }
}

customElements.define('form-component', Form)
