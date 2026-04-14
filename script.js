const API_BASE_URL = 'https://projeto-academia-hazel.vercel.app';

let cpfInput = "";
let carregando = false;

// Elementos do DOM
const display = document.getElementById('cpf-display') || { value: "" };
const stateInput = document.getElementById('state-input');
const stateActive = document.getElementById('state-active');
const stateBlocked = document.getElementById('state-blocked');

// =========================
// Entrada de dados
// =========================
function pressKey(num) {
    if (cpfInput.length < 11 && !carregando) {
        cpfInput += num;
        updateDisplay();
    }
}

function clearCpf() {
    if (carregando) return;
    cpfInput = "";
    updateDisplay();
}

// =========================
// Formatação e validação
// =========================
function formatCpf(cpf) {
    return cpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function isCpfValido(cpf) {
    return /^\d{11}$/.test(cpf);
}

function updateDisplay() {
    display.value = formatCpf(cpfInput);
}

// =========================
// Consulta API
// =========================
async function confirmCpf() {
    if (carregando) return;

    if (!isCpfValido(cpfInput)) {
        alert("Por favor, insira um CPF válido com 11 dígitos.");
        return;
    }

    carregando = true;

    try {
        const resposta = await fetch(`${API_BASE_URL}/clientes/cpf/${cpfInput}`);

        stateInput.classList.add('hidden');

        if (resposta.ok) {
            const clienteEncontrado = await resposta.json();

            if (clienteEncontrado.autorizado) {
                mostrarSucesso(clienteEncontrado.nome);
            } else {
                mostrarBloqueado();
            }
        } else {
            mostrarBloqueado();
        }

    } catch (erro) {
        console.error("Falha na comunicação:", erro);
        alert("Erro técnico. Tente novamente em instantes.");
        resetTotem();
    } finally {
        carregando = false;
    }
}

// =========================
// Estados da UI
// =========================
function mostrarSucesso(nome) {
    stateActive.classList.remove('hidden');

    const msgAtivo = stateActive.querySelector('p');
    msgAtivo.innerHTML = `Bom treino, <br><span class="text-white">${nome.split(' ')[0]}</span>!`;

    setTimeout(resetTotem, 4000);
}

function mostrarBloqueado() {
    stateBlocked.classList.remove('hidden');
    setTimeout(resetTotem, 4000);
}

function resetTotem() {
    cpfInput = "";
    updateDisplay();

    stateActive.classList.add('hidden');
    stateBlocked.classList.add('hidden');
    stateInput.classList.remove('hidden');
}