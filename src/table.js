export default (() => {

    const tableSection = document.querySelector('.registers');
    const filterButton = document.querySelector('.filter-button')
    

    tableSection?.addEventListener('click', async (event) => {

        if (event.target.closest('.edit-button')) {
        }

        if (event.target.closest('.delete-button')) {
            document.dispatchEvent(new CustomEvent('showModalDestroy'))
        }

    });

    filterButton.addEventListener('click', async (event) => {
        document.dispatchEvent(new CustomEvent('showFilterModal'))
    });
})();
