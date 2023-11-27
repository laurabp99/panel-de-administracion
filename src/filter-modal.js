export default (() => {

    let filterButton = document.querySelector(".filter-button");
    let filterMenu = document.querySelector(".filter-menu");

    filterButton.addEventListener("click", () => {
        filterButton.classList.toggle("active");
        filterMenu.classList.toggle("active")
    });
    
})();