class Destroy extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()

    const deleteModal = this.shadow.querySelector('.delete-modal')

    document.addEventListener('showModalDestroy', event => {
      deleteModal.classList.add('active')
    })
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>
                .delete{
                    width: 30px;
                    cursor: pointer;
                }

                .delete-button {
                    display: flex;
                    justify-content: center;
                    width: 30px;
                    cursor: pointer;
                }

                .delete-confirm{
                    display: flex;
                    gap: 4rem;
                    justify-content: center;
                }

                .delete-yes{
                    background-color: green;
                    width: 7rem;
                    cursor: pointer;
                    border-radius: 100px;
                    padding: 0.5rem;
                }

                .delete-no{
                    background-color: red;
                    width: 7rem;
                    cursor: pointer;
                    border-radius: 100px;
                    padding: 0.5rem;
                }

                .delete-modal{
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

                .delete-modal.active{
                    display: flex;
                    font-size: 20px;
                    font-weight:600;
                    cursor: pointer;
                    position: absolute;
                    right: 15px;
                }

                .delete-modal-content{
                    background-color: hsl(240, 74%, 56%);
                    padding: 20px;
                    border: 0.2rem solid white;
                    border-radius: 5px;
                    box-shadow: 7px 8px 5px black;
                    max-width: 400px;
                    width: 30rem;
                    height: 10rem;
                    z-index: 1400;
                    text-align: center;
                    justify-content: center;
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }

                .delete-modal-content p{
                    color: white;
                }
            </style>
            <div class="delete-modal">
                <div class="delete-modal-content">
                    <p>¿Quiere eliminar este registro?</p>
                    <div class="delete-modal-buttons">
                        <div class="delete-confirm">
                            <button class="delete-yes">
                                <p>Sí</p>
                            </button>
                            <button class="delete-no">
                                <p>No</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `

    const deleteNo = this.shadow.querySelector('.delete-no')
    const deleteYes = this.shadow.querySelector('.delete-yes')

    deleteNo?.addEventListener('click', () => {
      const deleteModal = this.shadow.querySelector('.delete-modal')
      deleteModal.classList.toggle('active')
    })

    deleteYes?.addEventListener('click', () => {
    })
  }
}

customElements.define('modal-destroy-component', Destroy)
