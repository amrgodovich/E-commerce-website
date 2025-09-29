// Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const panel = document.querySelector(".panel");
menuToggle.addEventListener("click", () => {
    panel.classList.toggle("active");
    menuToggle.classList.toggle("open");
});

// Filter Toggle
const filterBtn = document.querySelector(".filter-btn");
const filterPanel = document.querySelector(".filter");

filterBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    const isClickInsideFilter = filterPanel.contains(e.target);
    const isClickOnButton = filterBtn.contains(e.target);
    
    if (!isClickInsideFilter && !isClickOnButton && filterPanel.classList.contains("active")) {
      filterPanel.classList.remove("active");
    }
});