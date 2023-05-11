const getToken = window.localStorage.getItem("token");


if (getToken){
    document.querySelector(".black-box").style.display = "block";
    document.querySelector(".logout").style.display = "inline-block";
    document.querySelector(".logout").addEventListener("click", () => {
        window.localStorage.clear();
        window.location.href="/Frontend/index.html";
    });
    document.querySelector(".login").style.display = "none";
    document.querySelectorAll(".bouton").forEach(function(bouton){
        bouton.remove();
    });
}