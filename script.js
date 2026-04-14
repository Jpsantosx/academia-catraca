const API = "https://projeto-academia-hazel.vercel.app";

let cpf = "";

// DIGITAÇÃO
function pressKey(num) {
    if (cpf.length < 11) {
        cpf += num;
        document.getElementById("cpf-display").value = cpf;
    }
}

function clearCpf() {
    cpf = "";
    document.getElementById("cpf-display").value = "";
}

// CONFIRMAR CPF
async function confirmCpf() {
    if (cpf.length !== 11) return alert("CPF inválido");

    document.getElementById("btn-confirm").innerHTML = '<span class="loader"></span>';

    try {
        const res = await fetch(API + "/clientes");
        const clientes = await res.json();

        const cliente = clientes.find(c => c.cpf === cpf);

        if (!cliente) {
            showBlocked("Não encontrado", "Procure a recepção");
        } else if (cliente.autorizado) {
            showActive(cliente.nome);
        } else {
            showBlocked("Bloqueado", "Regularize na recepção");
        }

    } catch (e) {
        showBlocked("Erro", "Sistema indisponível");
    }

    document.getElementById("btn-confirm").innerHTML = "Confirmar";
}

// ESTADOS
function showActive(nome) {
    document.getElementById("state-input").classList.add("hidden");
    document.getElementById("state-active").classList.remove("hidden");

    document.getElementById("welcome-msg").innerText = nome;
}

function showBlocked(title, desc) {
    document.getElementById("state-input").classList.add("hidden");
    document.getElementById("state-blocked").classList.remove("hidden");

    document.getElementById("error-title").innerText = title;
    document.getElementById("error-desc").innerText = desc;
}

function resetTotem() {
    cpf = "";
    document.getElementById("cpf-display").value = "";

    document.getElementById("state-input").classList.remove("hidden");
    document.getElementById("state-active").classList.add("hidden");
    document.getElementById("state-blocked").classList.add("hidden");
}