-- ============================================
-- Sistema de Gestão de Academia
-- Script de criação do banco de dados
-- ============================================

-- Tabela: PLANO
CREATE TABLE plano (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  duracao_dias INTEGER NOT NULL
);

-- Tabela: ALUNO
CREATE TABLE aluno (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  plano_id INTEGER NOT NULL,
  criado_em DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT fk_aluno_plano
    FOREIGN KEY (plano_id) REFERENCES plano(id)
);

-- Tabela: AVALIACAO_FISICA (1:1 com ALUNO)
CREATE TABLE avaliacao_fisica (
  id SERIAL PRIMARY KEY,
  aluno_id INTEGER NOT NULL UNIQUE,
  peso_kg DECIMAL(5, 2) NOT NULL,
  altura_cm DECIMAL(5, 2) NOT NULL,
  percentual_gordura DECIMAL(5, 2),
  data_avaliacao DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT fk_avaliacao_aluno
    FOREIGN KEY (aluno_id) REFERENCES aluno(id)
);

-- Tabela: TREINO
CREATE TABLE treino (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT
);

-- Tabela: EXERCICIO
CREATE TABLE exercicio (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  grupo_muscular VARCHAR(50),
  descricao TEXT
);

-- Tabela associativa: TREINO_EXERCICIO (N:N)
CREATE TABLE treino_exercicio (
  treino_id INTEGER NOT NULL,
  exercicio_id INTEGER NOT NULL,
  series INTEGER NOT NULL,
  repeticoes INTEGER NOT NULL,
  PRIMARY KEY (treino_id, exercicio_id),
  CONSTRAINT fk_treino_exercicio_treino
    FOREIGN KEY (treino_id) REFERENCES treino(id),
  CONSTRAINT fk_treino_exercicio_exercicio
    FOREIGN KEY (exercicio_id) REFERENCES exercicio(id)
);

-- Tabela associativa: ALUNO_TREINO (N:N)
CREATE TABLE aluno_treino (
  aluno_id INTEGER NOT NULL,
  treino_id INTEGER NOT NULL,
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (aluno_id, treino_id),
  CONSTRAINT fk_aluno_treino_aluno
    FOREIGN KEY (aluno_id) REFERENCES aluno(id),
  CONSTRAINT fk_aluno_treino_treino
    FOREIGN KEY (treino_id) REFERENCES treino(id)
);