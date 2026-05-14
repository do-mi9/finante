let cheltuieli = [];

function adaugacheltuieli() {
    let suma = document.getElementById("sumaInput").value;
    let categorie = document.getElementById("categorieSelect").value;
    let descriere = document.getElementById("descriereInput").value;

    if (suma === "" || categorie === "0" || descriere === "") {
        alert("Completează toate câmpurile!");
        return;
    }

    cheltuieli.push({
        id: Date.now(),
        suma: Number(suma),
        categorie: categorie,
        descriere: descriere});
    afisareCheltuieli();
}

function afisareCheltuieli() {
    let listaCheltuieli =
    document.getElementById("listaCheltuieli");
    listaCheltuieli.innerHTML = "";
    let total = 0;

    for (let i = 0; i < cheltuieli.length; i++) {

        let c = cheltuieli[i];
        total += c.suma;
        let li = document.createElement("li");
        li.innerHTML = `
            <div class="suma-badge">
                ${c.suma} MDL
            </div>
            <div class="descriere-mica">
                ${c.descriere}
            </div>
            <button class="sterge-btn">
                ✕
            </button>
        `;

        listaCheltuieli.appendChild(li);}

    document.getElementById("totalIntrari")
    .textContent = total;
}