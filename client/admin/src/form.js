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
                align-items: center;
                padding: 0.7rem;
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
                color: white;
                font-size: 18px;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                background-color: hsl(240, 74%, 56%);
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

            .validate.error{
                border: 2px solid red;
            }

            .name-validation.error{
                border: 2px solid red;
            }
            </style>

            <div class="form">
                <div class="form-top">
                    <div class="tabs">
                        <div class="tab active" data-tab="general">
                            <span>Principal</span>
                        </div>
                        <div class="tab" data-tab="images">
                            <span>Imágenes</span>
                        </div>
                    </div>
                    <div class="form-buttons">
                        <div class="form-clear">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <title>broom</title>
                                <path
                                    d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" />
                            </svg>
                        </div>
                        <div class="form-save">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <title>content-save</title>
                                <path
                                    d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <form action>
                <div class="tab-content active" data-tab="general">
                    <div class="form-row">
                        <div class="form-element">
                            <div class="form-label">
                                <label>Nombre</label>
                            </div>
                            <div class="form-input">
                                <input type="text" class="name-validation"
                                    data-onlyletters="true">
                            </div>
                        </div>
                        <div class="form-element">
                            <div class="form-label">
                                <label>Email</label>
                            </div>
                            <div class="form-input">
                                <input type="email">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-element">
                            <div class="form-label">
                                <label>Password</label>
                            </div>
                            <div class="form-input">
                                <input type="password" class="validate" data-minlength="8">
                            </div>
                        </div>
                        <div class="form-element">
                            <div class="form-label">
                                <label>Repetir password</label>
                            </div>
                            <div class="form-input">
                                <input type="password">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-content" data-tab="images">
                    <div class="form-row">
                        <div class="form-element">
                            <div class="form-label">
                                <label>Avatar</label>
                            </div>
                            <div class="form-input">
                                <input type="file">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
            `

    const form = this.shadow.querySelector('form')

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

    const tabs = this.shadow.querySelector('.tabs')

    tabs.addEventListener('click', (event) => {
      if (event.target.closest('.tab')) {
        const tab = event.target.closest('.tab')
        tab.parentElement.querySelector('.active').classList.remove('active')
        tab.classList.toggle('active')

        const tabContents = this.shadow.querySelectorAll('.tab-content')

        tabContents.forEach(tabContent => {
          if (tab.dataset.tab == tabContent.dataset.tab) {
            tabContent.classList.add('active')
          } else if (tab.dataset.tab != tabContent.dataset.tab) {
            tabContent.classList.remove('active')
          }
        })
      }
    })
    const save = this.shadow.querySelector('.form-save')
    save.addEventListener('click', async (event) => {
      document.dispatchEvent(new CustomEvent('message'))
    })
  }
}

customElements.define('form-component', Form)
