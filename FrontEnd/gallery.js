// Récupération des données de l'api
const response = await fetch('http://localhost:5678/api/works');
const data = await response.json();

// création de la gallerie
function genererGallery(data) {
    for (let i = 0; i < data.length; i++) {
        const sectionGallery = document.querySelector(".gallery");
        const figureGallery = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = data[i].imageUrl;
        imageElement.alt = data[i].title;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = data[i].title;
        figureGallery.append(imageElement);
        figureGallery.append(titreElement);
        sectionGallery.append(figureGallery);
    }
}
genererGallery(data);


//demande d'information de l'api
const responseCat = await fetch('http://localhost:5678/api/categories');
const galleryCat = await responseCat.json();
const btnSet = new Set();

//Création bouton reset
const all = document.querySelector(".btn-filtrer");
const createAll = document.createElement("button");
createAll.classList.add("bouton");
createAll.setAttribute('id', 'all');
createAll.innerText = "Tous";
all.append(createAll);

//Génération des boutons de filtrage
function genererBtn(galleryCat) {
    for (let i = 0; i < galleryCat.length; i++) {
        btnSet.add(galleryCat[i]);
        const selectBtn = document.querySelector(".btn-filtrer");
        const btnFilter = document.createElement("button");
        btnFilter.classList.add("bouton", "select");
        btnFilter.setAttribute('id', galleryCat[i].name)
        btnFilter.innerText = galleryCat[i].name;
        selectBtn.append(btnFilter);
    }
};
genererBtn(galleryCat);

//Filtrage des boutons
const btnFilter = document.querySelectorAll(".select")
const btnFiltered = btnFilter.forEach(function (click) {
    click.addEventListener("click", function (e) {
        const target = e.target.getAttribute('id');
        const galleryFilter = data.filter(function (picture) {
            if (target.includes(picture.category.name)) {
                return picture.category.name;
            }
        });
        document.querySelector(".gallery").innerHTML = "";
        genererGallery(galleryFilter);
    })
})

//Remise à Zéro des filtres
const btnAllFilter = document.querySelector("#all");
btnAllFilter.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(data);
});