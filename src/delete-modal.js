export default (() => {

    let deleteButtons = document.querySelectorAll(".delete-button");
    let deleteModal = document.querySelector(".delete-modal");
    let deleteNo = document.querySelector(".delete-no");
    let deleteYes = document.querySelector(".delete-yes");

    deleteNo?.addEventListener("click", () => {
        deleteModal.classList.remove("active");
        event.preventDefault();
    });

    deleteYes?.addEventListener("click", () => {
        event.preventDefault();
    });
})();