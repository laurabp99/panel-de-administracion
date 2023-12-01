class Title extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this.render()
    }
    render() {
        this.shadow.innerHTML =
        /*html*/ `
            <style>
.menu-button{
    background: transparent;
    border: none;
    width: 40px;
    cursor: pointer;
    z-index: 1001;
    width: 60px;
}


.span-menu {
    display: block;
    width: 100%;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    border-radius: 3px;
    height: 8px;
    background: #fff;
    transition: all .3s;
    position: relative;
}

.span-menu + .span-menu {
    margin-top: 14px;
}

.active .span-menu:nth-child(1) {
    animation: ease .7s top forwards;
}

.span-menu:nth-child(1) {
    animation: ease .7s top-2 forwards;
}

.active .span-menu:nth-child(2) {
    animation: ease .7s scaled forwards;
}

.span-menu:nth-child(2) {
    animation: ease .7s scaled-2 forwards;
}

.active .span-menu:nth-child(3) {
    animation: ease .7s bottom forwards;
}

.span-menu:nth-child(3) {
    animation: ease .7s bottom-2 forwards;
}

@keyframes top {
    0% {
top: 0;
transform: rotate(0);
    }
    50% {
top: 22px;
transform: rotate(0);
    }
    100% {
top: 22px;
transform: rotate(45deg);
    }
}

@keyframes top-2 {
    0% {
top: 22px;
transform: rotate(45deg);
    }
    50% {
top: 22px;
transform: rotate(0deg);
    }
    100% {
top: 0;
transform: rotate(0deg);
    }
}

@keyframes bottom {
    0% {
bottom: 0;
transform: rotate(0);
    }
    50% {
bottom: 22px;
transform: rotate(0);
    }
    100% {
bottom: 22px;
transform: rotate(135deg);
    }
}
@keyframes bottom-2 {
    0% {
bottom: 22px;
transform: rotate(135deg);
    }
    50% {
bottom: 22px;
transform: rotate(0);
    }
    100% {
bottom: 0;
transform: rotate(0);
    }
}

@keyframes scaled {
    50% {
transform: scale(0);
    }
    100% {
transform: scale(0);
    }
}

@keyframes scaled-2 {
    0% {
    transform: scale(0);
    }
    50% {
    transform: scale(0);
    }
    100% {
    transform: scale(1);
    }
}


.menu {
    position: fixed;
    top: -100vh;
    left: 0;
    width: 100%;
    height: 100vh;
    transition: top 0.7s;
    z-index: 1000;
    background-color: hsla(0, 0%, 0%, 0.9);
}

.menu.active {
    top: 0;
}
            </style>
            <button class="menu-button">
                <span class="span-menu"></span>
                <span class="span-menu"></span>
                <span class="span-menu"></span>
            </button>
            <div class="menu">
            </div>
            `
    }

}

customElements.define('menu-component', Title);