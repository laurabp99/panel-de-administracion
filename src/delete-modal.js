export default (() => {

    let deleteButton = document.querySelector(".delete-button");

    deleteButton.addEventListener("click", () => {
        deleteModal.classList.toggle("active");
    });
    
})();