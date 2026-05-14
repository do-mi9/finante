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

for (let i = 0; i < cheltuieli.length; i++) {
            let c = cheltuieli[i];
            total += c.suma;

            let li = document.createElement('li');
            li.innerHTML = `
                    <div class="suma-badge">${c.suma} MDL</div>
                    <div class="descriere-mica"> ${c.descriere}</div>
                </div>
                <button class="sterge-btn" onclick="stergeCheltuiala(${c.id})">✕</button>
            `;
            lista.appendChild(li);
        }
}