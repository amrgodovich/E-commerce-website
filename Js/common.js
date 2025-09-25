const primarycolor= '#5f3de7'
const secondarycolor= '#ec512f'
const hovercolor='#555edbff'

const menuToggle = document.getElementById("menu-toggle");
const panel = document.querySelector(".panel");
menuToggle.addEventListener("click", () => {
    panel.classList.toggle("active");
    menuToggle.classList.toggle("open");
});