const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-btn");
const menuLinks = document.querySelectorAll(".menu-link");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
});

function closeMenu() {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
}

closeBtn.addEventListener("click", closeMenu);
menuLinks.forEach(link => link.addEventListener("click", closeMenu));
