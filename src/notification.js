class Menu extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this.render()
    }
    render() {
        this.shadow.innerHTML =
            /*html*/`
            <style>
            </style>
            `

}

}

customElements.define('menu-component', Menu);