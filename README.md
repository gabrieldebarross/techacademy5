# API de CRUDs - Projeto de Faculdade - To-Do List

Este projeto consiste em uma **API RESTful** desenvolvida como parte de um trabalho acadêmico. A API foi projetada para gerenciar dados com as operações de **Create**, **Read**, **Update** e **Delete** (CRUD) utilizando **Node.js**, **TypeScript**, **Sequelize** e **MySQL**.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de APIs.
- **Sequelize**: ORM (Object-Relational Mapping) para interagir com o banco de dados MySQL.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **JWT (JSON Web Token)**: Para autenticação de usuários.
- **bcryptjs**: Biblioteca para criptografar senhas.
- **dotenv**: Para gerenciar variáveis de ambiente.
- **express-validator**: Biblioteca para validação de dados nas requisições.
- **http-status-codes**: Biblioteca para manipulação de códigos de status HTTP.

## Funcionalidades

A API oferece as seguintes funcionalidades:

- **Cadastro de usuários** com validação de email, senha e nome.
- **Login de usuários** com autenticação baseada em JWT.
- **Criação, leitura, atualização e exclusão** de tarefas, categorias, prioridades e comentários.
- **Autenticação e autorização** com JWT, garantindo segurança nas operações.

## Instalação

Para rodar este projeto localmente, siga os seguintes passos:

1. Clone o repositório:
   git clone https://github.com/gabrieldebarross/techacademy5

2. Navegue até o diretório do projeto:
   cd techacademy5

3. Instale as dependências:
   npm install

4. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias (como as credenciais do banco de dados):

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=sua-senha
- DB_NAME=nome-do-banco
- SECRET_KEY=seu-segredo

5. Para rodar a aplicação:
    npm run start

# Rotas da API

Abaixo estão as rotas disponíveis na API para as operações de Create, Read, Update e Delete (CRUD) para os recursos **User**, **Task**, **Priority**, **Comment** e **Category**. A autenticação é feita por meio de JWT, sendo necessário passar o token no cabeçalho das requisições.

## 1. Usuários (/user)

- **POST /user/login**: Realiza o login de um usuário.
- **POST /user**: Cria um novo usuário. Requer dados válidos de email, password, e name.
- **GET /user**: Retorna todos os usuários com filtros aplicados.
- **GET /user/all**: Retorna todos os usuários cadastrados.
- **PUT /user/:id**: Atualiza os dados de um usuário específico.
- **DELETE /user**: Deleta um usuário.

## 2. Tarefas (/tasks)

- **POST /tasks**: Cria uma nova tarefa.
- **GET /tasks**: Retorna todas as tarefas.
- **GET /tasks/:id**: Retorna uma tarefa específica por ID.
- **PUT /tasks/:id**: Atualiza uma tarefa específica por ID.
- **DELETE /tasks/:id**: Deleta uma tarefa específica por ID.

## 3. Prioridades (/prioritys)

- **POST /prioritys**: Cria uma nova prioridade.
- **GET /prioritys**: Retorna todas as prioridades.
- **GET /prioritys/:id**: Retorna uma prioridade específica por ID.
- **PUT /prioritys/:id**: Atualiza uma prioridade específica por ID.
- **DELETE /prioritys/:id**: Deleta uma prioridade específica por ID.

## 4. Comentários (/comments)

- **POST /comments**: Cria um novo comentário.
- **GET /comments**: Retorna todos os comentários.
- **GET /comments/:id**: Retorna um comentário específico por ID.
- **PUT /comments/:id**: Atualiza um comentário específico por ID.
- **DELETE /comments/:id**: Deleta um comentário específico por ID.

## 5. Categorias (/categories)

- **POST /categories**: Cria uma nova categoria.
- **GET /categories**: Retorna todas as categorias.
- **GET /categories/:id**: Retorna uma categoria específica por ID.
- **PUT /categories/:id**: Atualiza uma categoria específica por ID.
- **DELETE /categories/:id**: Deleta uma categoria específica por ID.

## Exemplos de Requisições

### Exemplo de Requisição para Criar Usuário

**POST /user**:

```json
{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "password": "senha123"
}
