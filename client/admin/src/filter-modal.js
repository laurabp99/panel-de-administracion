class FilterModal extends HTMLElement {
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
                    p{
                        color: black;
                        font-size: 25px;
                        font-family: Arial, Helvetica, sans-serif;
                    }                    
                    
                    .filter-modal {
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
                    
                    .filter-modal.active{
                        display: flex;
                        font-size: 20px;
                        font-weight:600;
                        cursor: pointer;
                        position: absolute;
                        right: 15px;
                    }
                    
                    .filter-modal-content{
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

                    .filter-form{
                        display: block;
                        font-size: 20px;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #fff;
                    }
                    
                    .filter-form-row{
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .filter-confirm{
                        display: flex;
                        gap: 4rem;
                        justify-content: center;
                    }
                    
                    .filter-yes{
                        background-color: green;
                        width: 7rem;
                        cursor: pointer;
                        border-radius: 100px;
                    }
                    
                    .filter-no{
                        background-color: red;
                        width: 7rem;
                        cursor: pointer;
                        border-radius: 100px;
                    }

                    .filter-form input{
                        height: 1rem;
                        border-radius: 5px;
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
                    
                </style>
                
                
            <div class="filter-modal">
                <div class="filter-modal-content">
                    <div class="filter-table">
                        <p>Filtraje de tabla</p>
                        <div class="filter-form">
                            <form action>
                                <div class="filter-form-row">
                                    <div class="filter-form-element">
                                        <div class="form-label">
                                            <label>Nombre</label>
                                        </div>
                                        <div class="form-input">
                                            <input type="text">
                                        </div>
                                    </div>
                                    <div class="filter-form-element">
                                        <div class="form-label">
                                            <label>Email</label>
                                        </div>
                                        <div class="form-input">
                                            <input type="email">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="filter-confirm">
                            <button class="filter-yes">
                                <p>Filtrar</p>
                            </button>
                            <button class="filter-no">
                                <p>Cancelar</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `

    const filterCloseButton = this.shadow.querySelector('.filter-no')

    filterCloseButton?.addEventListener('click', () => {
      this.closeModal()
    })
  }

  openModal () {
    const filterModal = this.shadow.querySelector('.filter-modal')
    filterModal.classList.add('active')
  }

  closeModal () {
    const filterModal = this.shadow.querySelector('.filter-modal')
    filterModal.classList.remove('active')
  }
}

customElements.define('filter-modal-component', FilterModal)
