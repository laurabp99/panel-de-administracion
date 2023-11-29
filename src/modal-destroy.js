export default (() => {

    let deleteModal = document.querySelector(".delete-modal");
    let deleteNo = document.querySelector(".delete-no");
    let deleteYes = document.querySelector(".delete-yes");

    document.addEventListener("showModalDestroy", (event => {
        deleteModal.classList.add("active");
    }))

    deleteNo?.addEventListener("click", () => {
        deleteModal.classList.remove("active");
    });

    deleteYes?.addEventListener("click", () => {
    });
})();