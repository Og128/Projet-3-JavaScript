import { genererGallery } from "./gallery.js";
import { genererModalGallery, resetForm } from "./modal.js";

// Changement du background du bouton lors que le formulaire est rempli
let check = document.querySelector("#addProjet");
let submitButton = document.querySelector(".validate");

check.addEventListener("input", function () {
    if (check.checkValidity()) {
        submitButton.style.background = "#1D6154";
        submitButton.style.cursor = "pointer";
    }
})

//Création du menu déroulant des catégories
const responseCat = await fetch('http://localhost:5678/api/categories');
const galleryCat = await responseCat.json();
const inputModal = document.querySelector(".input-label-modal");
const selectCat = document.createElement('select');
selectCat.setAttribute('id', 'categorie');
selectCat.setAttribute('name', 'categorie');
inputModal.append(selectCat);

function genererOption(n) {
    for (let i = 0; i < n.length; i++) {
        const optionCat = `<option value="${n[i].id}" selected>${n[i].name}</option>`
        const catOptions = document.createRange().createContextualFragment(optionCat)
        selectCat.appendChild(catOptions)
    }
    selectCat.selectedIndex = 0 ;
}
genererOption(galleryCat);


// Ajout de projet 
const addProject = document.querySelector("#addProjet");
const stringToken = sessionStorage.getItem("token");
const parsedToken = JSON.parse(stringToken);

addProject.addEventListener("submit", async (e) => {
    const token = `bearer ${parsedToken.token}`;
    const getTitle = document.querySelector("#title").value;
    const getCategory = document.querySelector("#categorie").value;
    const uploadPic = document.querySelector("#upload_picture");
    const intCategory = parseInt(getCategory);
    const form = new FormData();
    form.append('title', getTitle);
    form.append('category', intCategory);
    form.append('image', uploadPic.files[0]);
    e.preventDefault();
    const response = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': token
        },
        body: form
    })
    if (response.ok) {
        const modalTwo = document.querySelector("[data-modal-two]");
        modalTwo.close();
        resetForm();
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        document.querySelector('.gallery-modal').innerHTML = "";
        genererModalGallery(data);
        document.querySelector('.gallery').innerHTML = "";
        genererGallery(data);
    } else {
        alert("L'erreur " + response.status + " est survenue lors de l'envoi du projet");
        console.error("Une erreur est survenue lors de l'envoi du projet");
    }
});