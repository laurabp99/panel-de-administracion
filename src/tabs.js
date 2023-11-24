export default (() => {

    let tabs = document.querySelectorAll(".tab");

    tabs.forEach((tab)=>{
        tab.addEventListener("click",()=>{
            tabs.forEach((tab)=>{
                tab.classList.remove("principal");
            })
            tab.classList.add("principal");
        })
    })
    
})();
