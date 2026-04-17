Titan Gym - Sistema de Check-in (Catraca Digital)
Este projeto simula um sistema de totem/catraca para academias, permitindo que os alunos realizem o check-in através da inserção do CPF. O sistema valida os dados consumindo uma API externa e retorna o status do aluno (Ativo ou Bloqueado).

Demonstração
Deploy (Vercel): https://academia-catraca.vercel.app/

Repositório: https://github.com/Jpsantosx/academia-catraca.git

Tecnologias Utilizadas
O projeto foi construído com foco em simplicidade, performance e responsividade:

HTML5: Estrutura semântica.

Tailwind CSS: Estilização moderna e utilitária via CDN.

JavaScript (ES6+): Lógica de manipulação de DOM e consumo de API assíncrona (Fetch API).

Font Awesome: Ícones visuais.

Vercel: Hospedagem da aplicação front-end.

Funcionalidades
Teclado Numérico Interativo: Interface amigável para digitação de CPF.

Validação em Tempo Real: Verifica se o CPF possui os 11 dígitos necessários.

Integração com API: Busca os dados dos clientes em um backend remoto.

Estados de Acesso:

Verde (Ativo): Exibe mensagem de boas-vindas personalizada com o nome do aluno.

Vermelho (Bloqueado/Não encontrado): Orienta o aluno a procurar a recepção.

Feedback Visual: Loader animado durante a requisição de rede.

Como rodar o projeto localmente
Clone este repositório:

Bash
git clone https://github.com/Jpsantosx/academia-catraca.git
Acesse a pasta do projeto:

Bash
cd academia-catraca
Abra o arquivo index.html no seu navegador de preferência.

Nota: O projeto consome a API hospedada em https://projeto-academia-hazel.vercel.app. Certifique-se de estar conectado à internet para que as validações funcionem.

Estrutura de Arquivos
index.html: Contém toda a estrutura e estilo (via Tailwind).

script.js: Contém a lógica de controle de estado, teclado e integração com a API.

Autores
Desenvolvido por João Pedro Stadler e Felipe Barros Souza

Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.