// Création des variables pour l'authentification
const loginBtn = document.querySelector(".formLogin");
const url = "http://localhost:5678/api/users/login";


// Authentification auprès de l'API
loginBtn.addEventListener("submit", async (event) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    event.preventDefault();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-type': "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    });

    if (response.ok) {
        const result = await response.json();
        const valeurResult = JSON.stringify(result);
        sessionStorage.setItem("token", valeurResult);
        window.location = "index.html";
    } else {
        alert("Mauvais E-mail/Mot de passe");
    };
});
