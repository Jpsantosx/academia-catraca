        const API_URL = "https://projeto-academia-hazel.vercel.app";
        let cpfInput = "";

        // ... (pressKey e clearCpf permanecem iguais)

        async function confirmCpf() {
            if (cpfInput.length < 1) return;
            
            showState('loading');

            try {
                const response = await fetch(`${API_URL}/clientes/${cpfInput}`);
                if (!response.ok) throw new Error('Não encontrado');
                
                const data = await response.json();
                
                if (data.autorizado === true || data.autorizado === "true") {
                    document.getElementById('welcome-name').innerText = `Bom Treino, ${data.nome}!`;
                    showState('active');
                } else {
                    document.getElementById('error-title').innerText = "Bloqueado";
                    showState('blocked');
                }
            } catch (err) {
                document.getElementById('error-title').innerText = "Erro";
                document.getElementById('error-msg').innerText = "CPF não cadastrado ou erro de conexão";
                showState('blocked');
            }
        }

        function showState(state) {
            ['input', 'active', 'blocked', 'loading'].forEach(s => 
                document.getElementById(`state-${s}`).classList.add('hidden'));
            document.getElementById(`state-${state}`).classList.remove('hidden');
        }

        function resetTotem() {
            cpfInput = "";
            document.getElementById('cpf-display').value = "";
            showState('input');
        }