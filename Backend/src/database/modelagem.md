# Modelagem do Banco de Dados — Sistema de Gestão de Academia

## Entidades

- **Aluno**
- **Plano**
- **Treino**
- **Exercício**
- **Avaliação Física**

## Relacionamentos

- **1:1** — Aluno ↔ Avaliação Física (cada aluno possui uma avaliação física atual)
- **1:N** — Plano → Aluno (um plano pode ter vários alunos)
- **N:N** — Treino ↔ Exercício (via tabela `treino_exercicio`)
- **N:N** — Aluno ↔ Treino (via tabela `aluno_treino`, com atributo `data_inicio`)

## Diagrama ER

```mermaid
erDiagram
  ALUNO {
    int id PK
    string nome
    string email
    string telefone
    int plano_id FK
    date criado_em
  }
  PLANO {
    int id PK
    string nome
    decimal preco
    int duracao_dias
  }
  AVALIACAO_FISICA {
    int id PK
    int aluno_id FK "UNIQUE"
    float peso_kg
    float altura_cm
    float percentual_gordura
    date data_avaliacao
  }
  TREINO {
    int id PK
    string nome
    string descricao
  }
  EXERCICIO {
    int id PK
    string nome
    string grupo_muscular
    string descricao
  }
  TREINO_EXERCICIO {
    int treino_id FK
    int exercicio_id FK
    int series
    int repeticoes
  }
  ALUNO_TREINO {
    int aluno_id FK
    int treino_id FK
    date data_inicio
  }

  PLANO ||--o{ ALUNO : "1:N"
  ALUNO ||--|| AVALIACAO_FISICA : "1:1"
  TREINO }o--o{ EXERCICIO : "N:N"
  TREINO_EXERCICIO }|--|| TREINO : ""
  TREINO_EXERCICIO }|--|| EXERCICIO : ""
  ALUNO }o--o{ TREINO : "N:N"
  ALUNO_TREINO }|--|| ALUNO : ""
  ALUNO_TREINO }|--|| TREINO : ""
```