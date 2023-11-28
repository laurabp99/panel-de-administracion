export default (() => {

    let menu = document.querySelector(".menu");
    let menuButton = document.querySelector(".menu-button")

    menuButton?.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuButton.classList.toggle("active")
    });
    
})();
