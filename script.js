const API_URL = "https://script.google.com/macros/s/AKfycbxL43nJrIwi7sRJqcI3i6bW9iRpXdedQF7-4uL0dnLhEfuTvyXgYiacH1TTHuyV-LoP/exec"; // Substitua pela URL gerada

async function carregarPresentes() {
    const response = await fetch(API_URL + "?action=get");
    const data = await response.json();
    
    let tabela = document.getElementById("tabela-presentes");
    tabela.innerHTML = "";

    data.forEach((linha, index) => {
        if (index === 0) return; // Ignora cabeçalho

        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${linha[0]}</td>
            <td>${linha[1] || ""}</td>
            <td>
                ${linha[1] ? "Reservado" : `<input type="text" id="nome${index}" placeholder="Seu Nome">
                <button onclick="reservarPresente('${linha[0]}', ${index})">Reservar</button>`}
            </td>
        `;
        tabela.appendChild(tr);
    });
}

async function reservarPresente(presente, index) {
    let nome = document.getElementById(`nome${index}`).value;
    if (!nome) {
        alert("Digite seu nome!");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presente, nome })
    });

    const result = await response.json();
    alert(result.message);
    carregarPresentes();
}

// Carrega a lista ao iniciar
window.onload = carregarPresentes;
