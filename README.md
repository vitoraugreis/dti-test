# Teste Prático DTI

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
