// Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const panel = document.querySelector(".panel");
menuToggle.addEventListener("click", () => {
    panel.classList.toggle("active");
    menuToggle.classList.toggle("open");
});

