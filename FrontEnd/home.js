const getToken = window.localStorage.getItem("token");


if (getToken) {
    document.querySelector(".logout").style.display = "inline-block";
    document.querySelector(".logout").addEventListener("click", () => {
        window.localStorage.clear();
        window.location.href = "/Frontend/index.html";
    });
    document.querySelector(".black-box").style.display = "flex";
    document.querySelector(".login").style.display = "none";
    document.querySelectorAll(".bouton").forEach(function (bouton) {
        bouton.remove();
    });
    document.querySelectorAll(".hidden").forEach(function (show) {
        show.classList.toggle("show");
    })
}