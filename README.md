# Teste Prático DTI Digital

## Sobre o projeto
### ⁉ Problema proposto
Senhor Eduardo é proprietário de um canil em Belo Horizonte, ele trabalha com diversas raças, pequenas e grandes. Eduardo gosta que seus cães estejam sempre arrumados, felizes e cheirosos. No bairro do canil, para realizar o banho nos animais, existem três petshops: Meu Canino Feliz, Vai Rex, e ChowChawgas. Cada um deles cobra preços diferentes para banho em cães pequenos e grandes e o preço pode variar de acordo com o dia da semana. Senhor Eduardo adoraria ter uma ferramenta para calcular qual o melhor petshop para levar seus cães para banho, de acordo com a quantidade de cães de cada raça que ele busca lavar e uma data programada.

### 🚀 Tecnologias
A primeira e mais importante decisão de projeto foi a escolha das tecnologias a serem utilizadas no front-end e no back-end. Para o back-end, optou-se pela linguagem C# com a estrutura ASP.NET Core. Já no front-end, decidiu-se utilizar o Vite como ferramenta de construção, com o desenvolvimento realizado em JavaScript utilizando a biblioteca React. Essa escolha foi motivada pela familiaridade adquirida em um outro projeto pessoal em andamento, chamado FinanceManager, que também utiliza essa combinação de tecnologias e pode ser encontrado no GitHub.

### ⚙ Back-End
O back-end do projeto foi desenvolvido utilizando a abordagem de Minimal API do ASP.NET Core. Sua principal responsabilidade é processar a lógica de negócio para identificar o petshop com o melhor custo-benefício.

A API funciona a partir de um único endpoint que recebe os dados da consulta, incluindo a data e a quantidade de cães pequenos e grandes. A partir dessas informações, o sistema calcula o custo total para cada um dos petshops cadastrados. A regra para definir a melhor opção segue um critério claro: a escolha primária é sempre o menor custo total. No caso de empate, o fator de desempate é a menor distância até o canil. O sistema também possui validações para impedir o cálculo com um número negativo de cães ou quando a quantidade total de animais é zero.

Do ponto de vista da arquitetura, a estrutura de dados recebida do front-end é definida por um Data Transfer Object (DTO). Os dados dos petshops são mantidos em memória durante a execução da aplicação, injetados como um serviço singleton, o que elimina a necessidade de um banco de dados externo para este projeto. O modelo de dados dos petshops foi criado de forma flexível, permitindo a configuração de preços diferentes para dias úteis e finais de semana. Para garantir a comunicação com o front-end durante o desenvolvimento, uma política de CORS foi devidamente configurada. A API também inclui uma integração com o Swagger para facilitar a documentação e a realização de testes interativos.

### 🎨 Front-End
A interface do usuário foi desenvolvida como uma Single Page Application em React. A reatividade da aplicação é garantida pelo uso de React Hooks para gerenciar localmente todo o estado do componente, incluindo os dados do formulário, a resposta recebida da API e as possíveis mensagens de erro. A comunicação com o back-end é realizada por uma função assíncrona que utiliza a Fetch API para enviar uma requisição POST com os dados da consulta, tratando as respostas do servidor para exibir dinamicamente o resultado ou uma notificação de erro, fornecendo assim um feedback claro ao usuário.

A construção visual da interface é uma combinação estratégica de duas bibliotecas principais. Material-UI (MUI) serve como a fundação do design, fornecendo um conjunto rico e completo de componentes que estruturam toda a aplicação, como os campos de texto, o seletor de data, os cartões de exibição e os botões. Para personalizar o layout e criar uma identidade visual única, a biblioteca Styled-Components foi utilizada, permitindo a criação de componentes de layout customizados e a aplicação de estilos globais. 

## Instruções para execução do projeto
### Pré requisitos
Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:
- **.NET 9.0 SDK** (ou superior)
- **Node.js** (versão 18.x ou superior)
- **Git**
### 1. Clonar o repositório
``` bash
# Clone este repositório para sua máquina local
git clone https://github.com/vitoraugreis/dti-test.git

# Acesse a pasta do projeto
cd dti-test
```
### 2. Execute o Back-end ( API em ASP.NET Core )
``` bash
# 1. Navegue até a pasta do back-end
cd server/

# 2. Restaure as dependências do .NET
dotnet restore

# 3. Inicie a API
dotnet run
```
### 3. Execute o Front-end ( Aplicação em React )
Em um novo terminal, execute os seguintes comandos para iniciar o front-end.
``` bash
# 1. Navegue até a pasta do front-end
cd client

# 2. Instale as dependências do Node.js (React, MUI, etc.)
npm install

# 3. Inicie o servidor de desenvolvimento do Vite
npm run dev
```
### 4. Acesse a Aplicação
Abra seu navegador e acesse a URL fornecida pelo Vite ( http://localhost:5173 ). <br>Agora você pode preencher os dados e fazer a consulta para encontrar o melhor petshop.
