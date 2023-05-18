const response = await fetch('http://localhost:5678/api/works');
const data = await response.json();
const stringToken = sessionStorage.getItem("token");
const parsedToken = JSON.parse(stringToken);

const deleteGallery = document.querySelectorAll(".div-icone");

deleteGallery.forEach(function (trash) {
    trash.addEventListener("click", () => {
        const targetId = trash.getAttribute('id');
        fetch(`http://localhost:5678/api/works/${targetId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer${parsedToken}`
            }
        })
            .then(function (response) {
                if (response.ok) {
                    genererModalGallery(data);
                    genererGallery(data);
                } else {
                    console.error('Erreur');
                }
            })
            .catch(function(error){
                console.error('Erreur lors de la suppression', error);
            })
    })
})