export default (() => {
  const tabs = document.querySelector('.tabs')

  tabs.addEventListener('click', (event) => {
    if (event.target.closest('.tab')) {
      const tab = event.target.closest('.tab')
      tab.parentElement.querySelector('.active').classList.remove('active')
      tab.classList.toggle('active')

      const tabContents = document.querySelectorAll('.tab-content')

      tabContents.forEach(tabContent => {
        if (tab.dataset.tab === tabContent.dataset.tab) {
          tabContent.classList.add('active')
        } else if (tab.dataset.tab !== tabContent.dataset.tab) {
          tabContent.classList.remove('active')
        }
      })
    }
  })
})()

// export default (() => { -------------codigo Carlos

//     const main = document.querySelector('main');

//     main?.addEventListener('click', (event) => {

//       if (event.target.closest('.tab')) {
//         const tab = event.target.closest('.tab');
//         tab.parentElement.querySelector('.active').classList.remove('active');
//         tab.classList.add('active');

//         tab.closest('section').querySelector(".tab-content.active").classList.remove('active');
//         tab.closest('section').querySelector(`.tab-content[data-tab="${tab.dataset.tab}"]`).classList.add('active')
//       }
//     });

//   })();
