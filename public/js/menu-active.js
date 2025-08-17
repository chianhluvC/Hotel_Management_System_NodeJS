

const navItem = document.querySelectorAll(".mainmenu ul li");
navItem.forEach((e) => {
    if (e.firstElementChild.href == window.location.href) {
        e.classList.add("active");
        }
});