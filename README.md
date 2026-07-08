# Sistema de Gestão de Academia

API RESTful para gerenciamento de alunos, planos, treinos e exercícios de uma academia.

## Domínio

O sistema permite cadastrar alunos vinculados a planos, registrar avaliações físicas, criar treinos com exercícios e matricular alunos nos treinos. A modelagem contempla relacionamentos 1:1, 1:N e N:N entre as entidades.

## Tecnologias

- Node.js
- Fastify
- PostgreSQL (Neon)
- pg (node-postgres)

## Pré-requisitos

- Node.js 18 ou superior
- Conta no [Neon](https://neon.tech) com um banco PostgreSQL criado

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/pedrohenry12/TrabalhoDW
cd Backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL=postgresql://<usuario>:<senha>@<host>/<banco>?sslmode=require
```

4. Execute o script do banco de dados no SQL Editor do Neon:

5. Inicie o servidor:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

## Documentação

A documentação interativa da API está disponível em:


## Entidades

- **Plano** — planos disponíveis na academia
- **Aluno** — alunos vinculados a um plano (1:N)
- **Avaliação Física** — avaliação física de um aluno (1:1)
- **Treino** — treinos disponíveis na academia
- **Exercício** — exercícios cadastrados no sistema
- **Treino x Exercício** — exercícios vinculados a um treino com séries e repetições (N:N)
- **Aluno x Treino** — matrícula de alunos em treinos (N:N)

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão com o banco PostgreSQL |