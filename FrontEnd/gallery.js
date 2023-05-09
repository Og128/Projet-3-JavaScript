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

//Remise à Zéro des filtres
const btnAllFilter = document.querySelector(".btn-all");
btnAllFilter.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(data);
});

// filtrer les objets de la gallerie
const btnObjectFilter = document.querySelector(".btn-object");
btnObjectFilter.addEventListener("click", function () {
    const btnFilter = data.filter(function (object) {
        return object.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(btnFilter);
});

// filtrer les appartements de la gallerie
const btnAppartFilter = document.querySelector(".btn-appartments");
btnAppartFilter.addEventListener("click", function(){
    const btnFilter = data.filter(function (appart){
        return appart.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(btnFilter);
});

// filtrer les hôtels de la gallerie
const btnHotelFilter = document.querySelector(".btn-hotel");
btnHotelFilter.addEventListener("click", function (){
    const btnFilter = data.filter(function(hotel){
        return hotel.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(btnFilter);
});