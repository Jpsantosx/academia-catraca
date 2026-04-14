
const API_BASE_URL = 'https://projeto-academia-hazel.vercel.app'; 

let cpfInput = "";

// Elementos do DOM
const display = document.getElementById('cpf-display');
const stateInput = document.getElementById('state-input');
const stateActive = document.getElementById('state-active');
const stateBlocked = document.getElementById('state-blocked');

/**
 * Gerencia a digitação no teclado numérico
 */
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
 * Consulta a API para verificar autorização
 */
async function confirmCpf() {
    if (cpfInput.length < 11) {
        alert("Por favor, insira os 11 dígitos do CPF.");
        return;
    }

    try {
        // Busca todos os clientes (Rota aberta no seu app.py)
        const resposta = await fetch(`${API_BASE_URL}/clientes`);
        
        if (!resposta.ok) throw new Error("Erro ao conectar com o servidor");

        const clientes = await resposta.json();

        // Procura o cliente pelo CPF digitado
        const clienteEncontrado = clientes.find(c => String(c.cpf) === cpfInput);

        // Esconde a tela de input
        stateInput.classList.add('hidden');

        if (clienteEncontrado) {
            if (clienteEncontrado.autorizado) {
                // Caso: Cliente cadastrado e com pagamento/acesso OK
                mostrarSucesso(clienteEncontrado.nome);
            } else {
                // Caso: Cliente cadastrado, mas "autorizado" está como False
                stateBlocked.classList.remove('hidden');
            }
        } else {
            // Caso: CPF não encontrado no banco de dados
            stateBlocked.classList.remove('hidden');
        }

    } catch (erro) {
        console.error("Falha na comunicação:", erro);
        alert("Erro técnico. Tente novamente em instantes.");
        resetTotem();
    }
}

/**
 * Exibe a mensagem de sucesso e o nome do aluno
 */
function mostrarSucesso(nome) {
    stateActive.classList.remove('hidden');
    // Opcional: Personalizar a mensagem com o nome do aluno
    const msgAtivo = stateActive.querySelector('p');
    msgAtivo.innerHTML = `Bom treino, <br><span class="text-white">${nome.split(' ')[0]}</span>!`;
}

/**
 * Reseta a interface para o próximo aluno
 */
function resetTotem() {
    cpfInput = "";
    updateDisplay();
    stateActive.classList.add('hidden');
    stateBlocked.classList.add('hidden');
    stateInput.classList.remove('hidden');
}