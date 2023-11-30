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

        if(event.target.closest('.name-validation')){
            const nameValidation = event.target.closest('.name-validation')
            if (nameValidation.value.length != validate.dataset.onlyLetters) {
                nameValidation.classList.add('error');
            } else {
                nameValidation.classList.remove('error');
            }
        }
    });
})();
