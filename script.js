function adaugacheltuieli() {
    let suma = document.getElementById("sumaInput").value;
    let categorie = document.getElementById("categorieSelect").value;
    let descriere = document.getElementById("descriereInput").value;
    
    if (suma === "" && categorie === "Select option" && descriere === "") {
        alert("Completează toate câmpurile!");
        return;
    }
    
}

function afisareCheltuieli() {
    let listaCheltuieli = document.querySelector(".listcard");
    listaCheltuieli.innerHTML = "";



