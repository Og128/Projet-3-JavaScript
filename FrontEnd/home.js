//Création variable pour la condition d'accès à la page d'edition
const getToken = window.localStorage.getItem("token");

//Condition de la page d'édition
if (getToken) {
    document.querySelector(".logout").style.display = "inline-block";
    document.querySelector(".logout").addEventListener("click", () => {
        window.localStorage.clear();
        window.location.href = "/Frontend/index.html";
    });
    document.querySelector(".black-box").style.display = "flex";
    document.querySelector(".login").style.display = "none";
    document.querySelectorAll(".btn-filtrer").forEach(function (bouton) {
        bouton.remove();
    });
    document.querySelectorAll(".hidden").forEach(function (show) {
        show.classList.toggle("show");
    })
}