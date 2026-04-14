        const API_BASE = "https://projeto-academia-hazel.vercel.app";
        let cpfInput = "";

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
            document.getElementById('cpf-display').value = cpfInput;
        }

        async function confirmCpf() {
            if (cpfInput.length < 1) return;
            
            const btn = document.getElementById('btn-confirm');
            btn.disabled = true;
            btn.innerHTML = '<span class="loader"></span>';

            try {
                const response = await fetch(`${API_BASE}/clientes/${cpfInput}`);
                
                if (!response.ok) {
                    throw new Error('Não encontrado');
                }

                const data = await response.json();
                
                document.getElementById('state-input').classList.add('hidden');
                
                // Verifica se autorizado é true (booleano ou string)
                if (data.autorizado === true || data.autorizado === "true") {
                    document.getElementById('welcome-msg').innerText = `Bom Treino, ${data.nome.split(' ')[0]}!`;
                    document.getElementById('state-active').classList.remove('hidden');
                } else {
                    document.getElementById('error-title').innerText = "Bloqueado";
                    document.getElementById('error-desc').innerText = "Vá à recepção resolver o problema";
                    document.getElementById('state-blocked').classList.remove('hidden');
                }
            } catch (error) {
                document.getElementById('state-input').classList.add('hidden');
                document.getElementById('error-title').innerText = "Não Encontrado";
                document.getElementById('error-desc').innerText = "CPF não cadastrado no sistema";
                document.getElementById('state-blocked').classList.remove('hidden');
            } finally {
                btn.disabled = false;
                btn.innerText = "Confirmar";
            }
        }

        function resetTotem() {
            cpfInput = "";
            updateDisplay();
            document.getElementById('state-active').classList.add('hidden');
            document.getElementById('state-blocked').classList.add('hidden');
            document.getElementById('state-input').classList.remove('hidden');
        }
