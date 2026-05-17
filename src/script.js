let inregistrari = [];
let currentMode = "cheltuieli";

const categoriiCheltuieli = [
    "Alimentație",
    "Servicii Comunale",
    "Transport",
    "Divertisment",
    "Sănătate",
    "Educație",
    "Altele"
];

const categoriiVenituri = [
    "Bursă",
    "Salariu",
    "Rambursare bani",
    "Împrumut",
    "Freelancing",
    "Cadouri",
    "Investiții",
    "Alte venituri"
];

function salveaza() {
    localStorage.setItem("inregistrari", JSON.stringify(inregistrari));
}

function incarca() {
    let salvat = localStorage.getItem("inregistrari");
    if (salvat) {
        inregistrari = JSON.parse(salvat);
    }
}


function incarcaCategorii() {
    let select = document.getElementById("categorieSelect");
    select.innerHTML = "";

    let def = document.createElement("option");
    def.value = "";
    def.textContent = "Selectează categoria";
    select.appendChild(def);

    let categorii = currentMode === "cheltuieli" ? categoriiCheltuieli : categoriiVenituri;

    for (let i = 0; i < categorii.length; i++) {
        let opt = document.createElement("option");
        opt.value = categorii[i];
        opt.textContent = categorii[i];
        select.appendChild(opt);
    }
}

function adaugaInregistrare() {
     let suma = document.getElementById("sumaInput").value;
    let categorie = document.getElementById("categorieSelect").value;
    let descriere = document.getElementById("descriereInput").value;
    let dataVal = document.getElementById("dataInput").value;

    if (!suma || Number(suma) <= 0) {
        alert("Introdu o sumă validă.");
        return;
    }

    if (!categorie) {
        alert("Selectează o categorie.");
        return;
    }

    if (!dataVal) {
        alert("Selectează o dată.");
        return;
    }

    let parti = dataVal.split("-");
    let dataFormatata = parti[2] + "." + parti[1] + "." + parti[0];
 
    inregistrari.unshift({
        id: Date.now(), 
        tip: currentMode,
        suma: Number(suma),
        categorie: categorie,
        descriere: descriere,
        data: dataFormatata
    });
 
    salveaza();

    document.getElementById("sumaInput").value = "";
    document.getElementById("descriereInput").value = "";
    document.getElementById("categorieSelect").selectedIndex = 0;
    document.getElementById("dataInput").value = "";

    afisareLista();
}

function afisareLista() {
    let lista = document.getElementById("listaIntrari");
    let totalContainer = document.getElementById("totalContainer");
    lista.innerHTML = "";

     if (inregistrari.length === 0) {

        lista.innerHTML ="<li>Nu sunt înregistrări</li>";
        totalContainer.textContent = "0 MDL";
        return;
    }

    let total = 0;

     for (let i = 0; i < inregistrari.length; i++) {
        let item = inregistrari[i];
        if (item.tip === "venituri") {
            total += item.suma;
        }
        else {
            total -= item.suma;
        }
        let li = document.createElement("li");
        let tipClasa = item.tip === "cheltuieli" ? "badge-cheltuiala" : "badge-venit";
 
        li.innerHTML = `
    <div>
        <span class="categorie-badge">${item.categorie}</span>
        <span class="suma-badge">${item.suma} MDL</span>
        <button class="sterge-btn" onclick="stergeInregistrare(${item.id})">✕</button>
    </div>
    ${item.descriere ? `<div class="descriere-mica">${item.descriere}</div>` : ""}  
    <div class="descriere-mica">Data: ${item.data}</div>
`;

        lista.appendChild(li);
    }

    totalContainer.textContent = total + " MDL";
}

function stergeInregistrare(id) {
    inregistrari = inregistrari.filter(function(item)  {
        return item.id !== id;
    });
    salveaza();
    afisareLista();
}

function setMode(mode) {
    currentMode = mode;

    let btnChelt = document.getElementById("btnCheltuieli");
    let btnVenit = document.getElementById("btnVenituri");

    if (mode === "cheltuieli") {
        btnChelt.classList.add("active-card");
        btnVenit.classList.remove("active-card");
        document.querySelector(".adaugacard")
        .textContent = "+ Adaugă cheltuială";
    }
    else {
        btnVenit.classList.add("active-card");
        btnChelt.classList.remove("active-card");
        document.querySelector(".adaugacard")
        .textContent = "+ Adaugă venit";
    }

    incarcaCategorii();
    afisareLista();
}

incarca();
incarcaCategorii();
afisareLista();
 
