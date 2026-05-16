let cheltuieli = [];
let venituri = [];
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

function getActiveArray() {
    return currentMode === "cheltuieli" ? cheltuieli : venituri;
}

function setActiveArray(arr) {
    if (currentMode === "cheltuieli") cheltuieli = arr;
    else venituri = arr;
}

function incarcaCategorii() {
    let select = document.getElementById("categorieSelect");
    select.innerHTML = "";

    let def = document.createElement("option");
    def.value = "";
    def.textContent = "-- Selectează categoria --";
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

    if (!suma || Number(suma) <= 0) {
        alert("Introdu o sumă validă.");
        return;
    }

    if (!categorie) {
        alert("Selectează o categorie.");
        return;
    }

    let activeArray = getActiveArray();

    activeArray.unshift({
        id: Date.now(),
        suma: Number(suma),
        categorie: categorie,
        descriere: descriere,
        data: new Date().toLocaleDateString("ro-RO")
    });

    setActiveArray(activeArray);

    document.getElementById("sumaInput").value = "";
    document.getElementById("descriereInput").value = "";
    document.getElementById("categorieSelect").selectedIndex = 0;

    afisareLista();
}

function afisareLista() {
    let lista = document.getElementById("listaIntrari");
    let totalContainer = document.getElementById("totalContainer");
    lista.innerHTML = "";

    let activeArray = getActiveArray();

    if (activeArray.length === 0) {
        lista.innerHTML = currentMode === "cheltuieli"
            ? "<li>Nu sunt cheltuieli înregistrate</li>"
            : "<li>Nu sunt venituri înregistrate</li>";
        totalContainer.textContent = "0 MDL";
        return;
    }

    let total = 0;

    for (let i = 0; i < activeArray.length; i++) {
        let item = activeArray[i];
        total += item.suma;

        let li = document.createElement("li");
        li.classList.add("entry");

        li.innerHTML = `
            <span class="categorie-badge">${item.categorie}</span>
            <span class="suma-badge">${item.suma} MDL</span>
            <button class="sterge-btn" onclick="stergeInregistrare(${item.id})">✕</button>
            ${item.descriere ? `<div class="descriere-mica">${item.descriere}</div>` : ""}
            <div class="descriere-mica">Data: ${item.data}</div>
        `;

        lista.appendChild(li);
    }

    totalContainer.textContent = total + " MDL";
}

function stergeInregistrare(id) {
    let activeArray = getActiveArray().filter(function(item) {
        return item.id !== id;
    });
    setActiveArray(activeArray);
    afisareLista();
}

function setMode(mode) {
    currentMode = mode;

    let btnChelt = document.getElementById("btnCheltuieli");
    let btnVenit = document.getElementById("btnVenituri");

    if (mode === "cheltuieli") {
        btnChelt.classList.add("active");
        btnVenit.classList.remove("active");
        document.querySelector(".adaugacard").textContent = "+ Adaugă cheltuială";
    }
    else {
        btnVenit.classList.add("active");
        btnChelt.classList.remove("active");
        document.querySelector(".adaugacard").textContent = "+ Adaugă venit";
    }

    incarcaCategorii();
    afisareLista();
}

// EVENIMENTE
document.getElementById("btnCheltuieli").onclick = function() {
    setMode("cheltuieli");
};

document.getElementById("btnVenituri").onclick = function() {
    setMode("venituri");
};

// PORNIRE
incarcaCategorii();
afisareLista();


