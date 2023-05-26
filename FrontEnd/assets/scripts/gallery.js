// Récupération des données de l'api
const response = await fetch('http://localhost:5678/api/works');
const data = await response.json();


//Création de la gallerie
export function genererGallery(n) {
    for (let i = 0; i < n.length; i++) {
        const sectionGallery = document.querySelector(".gallery");
        const figureGallery = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = n[i].imageUrl;
        imageElement.alt = n[i].title;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = n[i].title;
        figureGallery.append(imageElement);
        figureGallery.append(titreElement);
        sectionGallery.append(figureGallery);
    }
}
genererGallery(data);


//Demande d'information de l'api
const responseCat = await fetch('http://localhost:5678/api/categories');
const galleryCat = await responseCat.json();
const btnSet = new Set();


//Création du bouton du retour à zéro des filtres
const all = document.querySelector(".btn-filtrer");
const createAll = document.createElement("button");
createAll.classList.add("bouton");
createAll.setAttribute('id', 'all');
createAll.innerText = "Tous";
all.append(createAll);


//Génération des boutons filtres
function genererBtn(n) {
    for (let i = 0; i < n.length; i++) {
        btnSet.add(n[i]);
        const selectBtn = document.querySelector(".btn-filtrer");
        const btnFilter = document.createElement("button");
        btnFilter.classList.add("bouton", "select");
        btnFilter.setAttribute('id', n[i].name)
        btnFilter.innerText = n[i].name;
        selectBtn.append(btnFilter);
    }
};
genererBtn(galleryCat);


//Remise à Zéro des filtres
const btnAllFilter = document.querySelector("#all");
btnAllFilter.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(data);
});


//Filtrage des boutons
const btnFilter = document.querySelectorAll(".select")
btnFilter.forEach(function (click) {
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