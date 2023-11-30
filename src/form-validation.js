export default (() => {
    const form = document.querySelector(".form");
    

    form.addEventListener('input', (event) => {

        if( event.target.closest('.validate')){
            const validate = event.target.closest('.validate')

            if (validate.value.length < validate.dataset.minlength) {
                validate.classList.add('error');
            } else {
                validate.classList.remove('error');
            }
        }

        const nameValidation = event.target.closest('.name-validation')

        if (nameValidation.classList.contains('name-validation')) {
            const soloLetras = /^[A-Za-z]+$/;

            if (!soloLetras.test(nameValidation.value)) {
                nameValidation.classList.add('error');
            } else {
                nameValidation.classList.remove('error');
            }
        }
    });
})();
