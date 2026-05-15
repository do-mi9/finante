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
    let listaCheltuieli = document.getElementById("listaCheltuieli");
    listaCheltuieli.innerHTML = "";
    let total = 0;
    for (let i = 0; i < cheltuieli.length; i++) {

        let c = cheltuieli[i];
        total += c.suma;
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="categorie-badge">${c.categorie}</span>
            <span class="suma-badge">${c.suma} MDL
            </span>
            <div class="descriere-mica">${c.descriere}
            <button class="sterge-btn" style="margin-left: 200px;" >
            <span onclick="stergeCheltuiala(${c.id})">✕</button></span></div> 
            <div class="descriere-mica">Data: ${new Date(c.id).toLocaleDateString()}</div>
            `;
            
        listaCheltuieli.appendChild(li);}

    document.getElementById("totalcheltuieli").textContent = total + " MDL";
}

function stergeCheltuiala(id) {

    cheltuieli = cheltuieli.filter(function(c) {
        return c.id !== id;
    });

    afisareCheltuieli();
}
