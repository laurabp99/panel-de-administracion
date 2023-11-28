export default (() => {

    let filterButton = document.querySelector(".filter-button");
    let filterModal = document.querySelector(".filter-modal");
    let filterCloseButton = document.querySelector(".filter-no");

    filterButton?.addEventListener("click", () => {
        filterButton.classList.toggle("active");
        filterModal.classList.toggle("active");
    });
    
    filterCloseButton?.addEventListener("click", () => {
        filterButton.classList.remove("active");
        filterModal.classList.remove("active");
    });
})();