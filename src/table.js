export default (() => {

    const tableSection = document.querySelector('.registers');

    tableSection?.addEventListener('click', async (event) => {

        if (event.target.closest('.edit-button')) {

        }

        if (event.target.closest('.delete-button')) {
            let deleteModal = document.querySelector(".delete-modal");
            deleteModal.classList.toggle("active");
        }
    });
})();
