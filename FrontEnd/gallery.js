const response = await fetch('http://localhost:5678/api/works');
const data = await response.json();

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