const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        nav.classList.add("scrolled");
    }
    else{
        nav.classList.remove("scrolled");
    }

});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }

});

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
}