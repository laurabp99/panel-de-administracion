export default (() => {

    let filterButton = document.querySelector(".filter-button");
    let filterModal = document.querySelector(".filter-modal");
    let filterCloseButton = document.querySelector(".filter-no");

    document.addEventListener("showFilterModal", (event => {
        filterModal.classList.add("active");
    }))

    filterCloseButton?.addEventListener("click", () => {
        filterModal.classList.remove("active");
    });

    filterButton?.addEventListener("click", () => {
    });
})();
