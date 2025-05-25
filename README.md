# Movie Manager Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

Este projeto é uma API RESTful para gerenciamento de filmes, construída com NestJS. A aplicação permite criar, listar e excluir filmes, além de gerenciar usuários e autenticação.

## Características

- Autenticação JWT
- Documentação com Swagger
- Duas opções de armazenamento de dados:
  - Em memória (usando serviços com sufixo `.memory`)
  - Banco de dados PostgreSQL

## Estrutura do Projeto

O projeto está organizado nos seguintes módulos:

- **Auth**: Gerenciamento de autenticação e autorização
- **User**: Gerenciamento de usuários
- **Movie**: Gerenciamento de filmes

Cada módulo possui suas próprias entidades, DTOs, controllers e serviços.

## Opções de Armazenamento

### 1. Armazenamento em Memória

Para utilizar o armazenamento em memória, você deve usar os serviços com sufixo `.memory`:

- `MovieMemoryService`
- `UserMemoryService`
- `AuthMemoryService`

Estes serviços armazenam os dados em arrays na memória e são úteis para testes e desenvolvimento rápido.

### 2. Armazenamento em PostgreSQL

Para utilizar o armazenamento em banco de dados, você deve configurar o PostgreSQL e usar os serviços padrão:

- `MovieService`
- `UserService`
- `AuthService`

## Configuração do Banco de Dados

Para configurar o banco de dados PostgreSQL, siga os passos abaixo:

1. Crie um banco de dados no PostgreSQL
2. Execute os seguintes scripts SQL para criar as tabelas necessárias:

```sql
CREATE TABLE movie (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(40) NOT NULL,
    Description VARCHAR(200) NOT NULL,
    Rate NUMERIC NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    pass VARCHAR(100) NOT NULL
);
```

3. Configure a conexão com o banco de dados no arquivo `app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'seu_usuario',
  password: 'sua_senha',
  database: 'movie_manager',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // Defina como true apenas em desenvolvimento
}),
```

## Instalação

```bash
# Instalar dependências
$ npm install
```

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=movie_manager
JWT_SECRET=seu_segredo_jwt
```

## Executando a Aplicação

```bash
# Modo de desenvolvimento
$ npm run start

# Modo de observação (recarrega automaticamente)
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

## Alternando entre Armazenamento em Memória e PostgreSQL

Para alternar entre os modos de armazenamento, você precisa modificar os controllers para injetar os serviços apropriados:

### Para usar armazenamento em memória:

1. No arquivo `movie.controller.ts`:
```typescript
constructor(private readonly movieService: MovieMemoryService) {}
```

2. No arquivo `user.controller.ts`:
```typescript
constructor(private readonly userService: UserMemoryService) {}
```

3. No arquivo `auth.controller.ts`:
```typescript
constructor(private authService: AuthMemoryService) {}
```

### Para usar armazenamento em PostgreSQL:

1. No arquivo `movie.controller.ts`:
```typescript
constructor(private readonly movieService: MovieService) {}
```

2. No arquivo `user.controller.ts`:
```typescript
constructor(private readonly userService: UserService) {}
```

3. No arquivo `auth.controller.ts`:
```typescript
constructor(private authService: AuthService) {}
```

## Documentação da API

A documentação da API está disponível através do Swagger UI. Após iniciar a aplicação, acesse:

```
http://localhost:3000/api
```

## Endpoints Principais

- `GET /movie` - Listar todos os filmes
- `POST /movie` - Criar um novo filme
- `DELETE /movie/:id` - Excluir um filme

- `GET /user` - Listar todos os usuários
- `POST /user` - Criar um novo usuário

- `POST /auth/login` - Autenticar um usuário
 
## Licença

Este projeto está licenciado sob a licença MIT.
