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

function genererModalGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const modalGallery = document.querySelector(".gallery-modal");
        const figureModalGallery = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = data[i].imageUrl;
        imageElement.alt = data[i].title;
        imageElement.id = data[i].id;
        const editModalGallery = document.createElement("figcaption");
        editModalGallery.innerText = "Editer";
        const divIconeModal = document.createElement("a");
        divIconeModal.href = "#";
        divIconeModal.id = data[i].id;
        divIconeModal.classList.add("div-icone");
        const iconeModalDelete = document.createElement("i");
        iconeModalDelete.classList.add("fa-regular", "fa-trash-can");
        const divIconeModalArrow = document.createElement("div");
        divIconeModalArrow.classList.add("div-icone-arrow");
        const iconeModalArrow = document.createElement("i");
        iconeModalArrow.classList.add("fa-solid", "fa-arrows-up-down-left-right");
        figureModalGallery.appendChild(divIconeModalArrow);
        figureModalGallery.appendChild(divIconeModal);
        divIconeModalArrow.appendChild(iconeModalArrow);
        divIconeModal.appendChild(iconeModalDelete);
        modalGallery.appendChild(figureModalGallery);
        figureModalGallery.appendChild(imageElement);
        figureModalGallery.appendChild(editModalGallery);
    }
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