const API_BASE_URL = 'https://projeto-academia-hazel.vercel.app'; 

let cpfInput = "";

// Elementos do DOM
const display = document.getElementById('cpf-display');
const stateInput = document.getElementById('state-input');
const stateActive = document.getElementById('state-active');
const stateBlocked = document.getElementById('state-blocked');

function pressKey(num) {
    if (cpfInput.length < 11) {
        cpfInput += num;
        updateDisplay();
    }
}

function clearCpf() {
    cpfInput = "";
    updateDisplay();
}

function updateDisplay() {
    display.value = cpfInput;
}

/**
 * Consulta a API utilizando a rota de busca por CPF específica
 */
async function confirmCpf() {
    if (cpfInput.length < 11) {
        alert("Por favor, insira os 11 dígitos do CPF.");
        return;
    }

    try {
        // Busca direta pelo CPF - Rota: /clientes/cpf/<cpf>
        const resposta = await fetch(`${API_BASE_URL}/clientes/cpf/${cpfInput}`);
        
        stateInput.classList.add('hidden');

        if (resposta.ok) {
            const clienteEncontrado = await resposta.json();

            if (clienteEncontrado.autorizado) {
                mostrarSucesso(clienteEncontrado.nome);
            } else {
                stateBlocked.classList.remove('hidden');
            }
        } else {
            // Se status for 404 ou outro erro, trata como acesso negado
            stateBlocked.classList.remove('hidden');
        }

    } catch (erro) {
        console.error("Falha na comunicação:", erro);
        alert("Erro técnico. Tente novamente em instantes.");
        resetTotem();
    }
}

function mostrarSucesso(nome) {
    stateActive.classList.remove('hidden');
    const msgAtivo = stateActive.querySelector('p');
    msgAtivo.innerHTML = `Bom treino, <br><span class="text-white">${nome.split(' ')[0]}</span>!`;
}

function resetTotem() {
    cpfInput = "";
    updateDisplay();
    stateActive.classList.add('hidden');
    stateBlocked.classList.add('hidden');
    stateInput.classList.remove('hidden');
}