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
            <form action>
              <div class='tab-content active' data-tab='general'>
                <div class='form-row'>
                  <div class='form-element'>
                    <div class='form-label'>
                      <label>Nombre</label>
                    </div>
                    <div class='form-input'>
                      <input type='text' class='name-validation' data-onlyletters='true'>
                    </div>
                  </div>
                  <div class='form-element'>
                    <div class='form-label'>
                      <label>Email</label>
                    </div>
                    <div class='form-input'>
                      <input type='email'>
                    </div>
                  </div>
                </div>
                <div class='form-row'>
                  <div class='form-element'>
                    <div class='form-label'>
                      <label>Password</label>
                    </div>
                    <div class='form-input'>
                      <input type='password' class='validate' data-minlength='8'>
                    </div>
                  </div>
                  <div class='form-element'>
                    <div class='form-label'>
                      <label>Repetir password</label>
                    </div>
                    <div class='form-input'>
                      <input type='password'>
                    </div>
                  </div>
                </div>
                  <div class='languages-tabs'>
                    <div class='tabs'>
                      <div class='tab active' data-tab='español'>
                        <h2>es</h2>
                      </div>
                      <div class='tab' data-tab='inglés'>
                        <h2>en</h2>
                      </div>
                    </div>
                  </div>
                  <div class='tab-content active' data-tab='español'></div>
                  <div class='tab-content' data-tab='inglés'></div>
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

    const form = this.shadow.querySelector('.form-container')

    form.addEventListener('input', (event) => {
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
    console.log(form)

    form.addEventListener('click', (event) => {
      const tab = event.target.closest('.tab')
      const lastActiveTab = tab.parentNode.querySelector('.active')
      console.log('uwu')
      if (tab) {
        lastActiveTab.classList.remove('active')
        tab.classList.add('active')
        console.log(tab)
        this.shadow.querySelector(`.tab-content[data-tab='${tab.dataset.tab}']`).classList.add('active')
        this.shadow.querySelector(`.tab-content[data-tab='${lastActiveTab.dataset.tab}']`).classList.remove('active')
      }
    })
    // const tabs = this.shadow.querySelector('.tabs')

    // tabs.addEventListener('click', (event) => {
    //   if (event.target.closest('.tab')) {
    //     const tab = event.target.closest('.tab')
    //     tab.parentElement.querySelector('.active').classList.remove('active')
    //     tab.classList.toggle('active')

    //     const tabContents = this.shadow.querySelectorAll('.tab-content')

    //     tabContents.forEach(tabContent => {
    //       if (tab.dataset.tab === tabContent.dataset.tab) {
    //         tabContent.classList.add('active')
    //       } else if (tab.dataset.tab !== tabContent.dataset.tab) {
    //         tabContent.classList.remove('active')
    //       }
    //     })
    //   }
    // })

    const save = this.shadow.querySelector('.form-save')
    save.addEventListener('click', async (event) => {
      document.dispatchEvent(new CustomEvent('message'))
    })

    const galleryButton = this.shadow.querySelector('.gallery-button')
    galleryButton.addEventListener('click', async (event) => {
      event.preventDefault()
      document.dispatchEvent(new CustomEvent('showGalleryModal'))
    })
  }
}

customElements.define('form-component', Form)
