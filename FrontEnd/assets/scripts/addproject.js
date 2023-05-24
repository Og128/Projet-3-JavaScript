import { genererGallery } from "./gallery.js";
import { genererModalGallery } from "./modal.js";
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
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        document.querySelector('.gallery-modal').innerHTML = "";
        genererModalGallery(data);
        document.querySelector('.gallery').innerHTML = "";
        genererGallery(data);
    } else {
        alert("Ha")
    }
});