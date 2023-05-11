const loginBtn = document.querySelector(".formLogin");
const url = "http://localhost:5678/api/users/login";

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
        window.localStorage.setItem("token", valeurResult);
        window.location.href = "/Frontend/index.html";
    } else {
        alert("Wrong login");
    };
});
