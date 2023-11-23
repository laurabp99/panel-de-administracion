export function showMenu() {
    document.getElementById('curtain').style.display = 'block';
    document.getElementById('menu-button').style.display = 'block';
}

export function hideMenu() {
    document.getElementById('curtain').style.display = 'none';
    document.getElementById('menu-button').style.display = 'none';
}

curtain.addEventListener("click", () => {

    curtain.classList.toggle("active");


})
