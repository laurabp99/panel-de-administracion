class Notification extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>
            .notification-modal {
                border-radius: 0.2rem;
                bottom: 1rem;
                color: rgb(0, 0, 0);
                opacity: 0;
                padding: 1rem;
                position: fixed;
                right: 1rem;
                text-align: center;
                transition: opacity 0.3s ease-in-out;
            }

            .notification-modal.active {
                text-align: center;
                display: flex;
                background-color: aqua;
                height: 2rem;
                opacity: 1;
                padding: 1rem;
                width: 15rem;
                justify-content: space-around; 
}
            </style>
            <div class="notification-modal">
                <p id="notification-message">Registro guardado con éxito</p>
            </div>
            `

    document.addEventListener('message', event => {
      const notification = this.shadow.querySelector('.notification-modal')

      notification.classList.add('active')

      setTimeout(() => {
        notification.classList.remove('active')
      }, 2000)
    })
  }
}

customElements.define('notification-component', Notification)
