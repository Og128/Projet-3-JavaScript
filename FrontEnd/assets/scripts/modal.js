//Creation des variables pour l'ouverture et fermeture des modales
const openModalOne = document.querySelector("[data-open-modal]");
const closeModalOne = document.querySelector("[data-close-modal]");
const modalOne = document.querySelector("[data-modal-one]");
const openModalTwo = document.querySelector("[data-open-modal-two]");
const closeModalTwo = document.querySelector("[data-close-modal-two]")
const modalTwo = document.querySelector("[data-modal-two]");
const previousModal = document.querySelector(".fa-arrow-left");

// Ouverture et fermeture de la première modal
openModalOne.addEventListener("click", () => {
    modalOne.showModal();
});

closeModalOne.addEventListener("click", () => {
    modalOne.close();
});

modalOne.addEventListener("click", e => {
    const dialogDimensions = modalOne.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modalOne.close();
    }
});

// Récupération des données de l'api
const response = await fetch('http://localhost:5678/api/works');
const data = await response.json();
import { genererGallery } from "./gallery.js";

const stringToken = sessionStorage.getItem("token");
const parsedToken = JSON.parse(stringToken);
export function genererModalGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const modalGallery = document.querySelector(".gallery-modal");
        const figureModalGallery = `
        <figure>
        <div id="${data[i].id}" class="div-icone"><i class="fa-regular fa-trash-can"></i></div>
            <div class="div-icone-arrow"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
            <img src="${data[i].imageUrl}" alt="${data[i].title}" id="${data[i].id}" />
            <figcaption>Editer</figcaption>
        </figure>`;
        const figureGalleryMod = document.createRange().createContextualFragment(figureModalGallery)
        modalGallery.appendChild(figureGalleryMod)
    }
    const deleteGallery = document.querySelectorAll(".div-icone");
    deleteGallery.forEach(function (trash) {
        trash.addEventListener("click", async () => {
            let confirmed = confirm('tié sur ?')
            if (!confirmed) return
            const token = `bearer ${parsedToken.token}`;
            const targetId = trash.getAttribute('id');
            const response = await fetch(`http://localhost:5678/api/works/${targetId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                }
            })
            if (response.ok) {
                trash.parentNode.remove()
                const response = await fetch('http://localhost:5678/api/works');
                const data = await response.json();
                document.querySelector(".gallery").innerHTML = "";
                genererGallery(data);
                alert('Votre galerie a bien été supprimé')
            } else {
                alert('Une erreur est apparu');
                console.error('Une erreur est apparu');
            }
        })
    })

}
genererModalGallery(data);


// Apparition de la flèche quand la souris est sur une image
const figureDiv = document.querySelectorAll(".gallery-modal figure");
figureDiv.forEach(function (hover) {
    const iconeDiv = hover.querySelector(".div-icone-arrow");
    hover.addEventListener("mouseenter", () => {
        iconeDiv.style.display = 'block';
    })

    hover.addEventListener("mouseleave", () => {
        iconeDiv.style.display = 'none';
    })
})

// Ouverture et fermeture de la deuxième modal
openModalTwo.addEventListener("click", () => {
    modalOne.close();
    modalTwo.showModal();
})

window.onclick = function (e) {
    if (e.target == modalTwo) {
        modalTwo.close();
    }
}

closeModalTwo.addEventListener("click", () => {
    modalTwo.close();
});

// Redirection vers la première modal
previousModal.addEventListener("click", () => {
    modalTwo.close();
    modalOne.showModal();
});

// Preview image 
const previewInput = document.querySelector("#upload_picture");
let uploadedImage = "";
previewInput.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedImage = reader.result;
        document.querySelector("#preview_image").style.backgroundImage = `url(${uploadedImage})`;
    });
    reader.readAsDataURL(this.files[0]);
});