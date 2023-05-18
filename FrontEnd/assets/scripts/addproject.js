// Ajout de projet 
const addProject = document.querySelector("#addProjet");
const stringToken = sessionStorage.getItem("token");
const parsedToken = JSON.parse(stringToken);


addProject.addEventListener("submit", async (e) => {
    const token = `bearer ${parsedToken.token}`;
    const getTitle = document.querySelector("#title").value;
    const getCategory = document.querySelector("#categorie").value;
    const uploadPic = document.querySelector("#upload_picture").value;
    const intCategory = parseInt(getCategory);
    console.log(document.querySelector("#upload_picture"));
    e.preventDefault();
    const response = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ title: getTitle, image: uploadPic, category: intCategory })
    })
    if(response.ok){
        let result = await response.json();
        alert(result.message);
    }else{
        alert("Ha")
    }
});