class Title extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */ `
            <style>
            .header-title {
                font-family:Arial, Helvetica, sans-serif;
                color: white;
                transform: translateX(-15px);
                align-items: center;
                display: flex;
            }

            h1{
                margin: 0;
            }
            </style>
            <div class="header-title">
                <h1>${this.title}</h1>
            </div>
            `
  }
}

customElements.define('title-component', Title)
