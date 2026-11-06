# API de Controle Financeiro Pessoal

API REST desenvolvida com NestJS, TypeScript e MongoDB Atlas para registrar receitas e despesas e acompanhar gastos por impulso.

## Funcionalidades

- Cadastro de receitas e despesas.
- Consulta do histórico de transações.
- Cálculo do saldo total e do total de despesas.
- Identificação do valor gasto por impulso.

## Como executar

É necessário ter Node.js e npm instalados e acesso a um banco MongoDB Atlas.

1. Baixe ou clone o projeto.
2. No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz e configure sua conexão:

```env
MONGODB_URI=mongodb+srv://USUARIO:SENHA@SEU_CLUSTER/
```

Substitua os dados de exemplo pelas credenciais do seu banco. Se a senha contiver caracteres especiais, codifique-os para uso em uma URL. Autorize também seu IP no MongoDB Atlas.

O arquivo `.env` contém credenciais e não deve ser publicado.

4. Inicie a API:

```bash
npm run start
```

A aplicação estará disponível em `http://localhost:3000`.

## Rotas

### POST /transacoes

Cadastra uma transação. Exemplo de corpo JSON:

```json
{
  "descricao": "Conta de luz",
  "valor": 200,
  "tipo": "despesa",
  "categoria": "Moradia",
  "consumoConsciente": true
}
```

O campo `tipo` aceita `receita` ou `despesa`. Para identificar uma despesa por impulso, utilize `consumoConsciente: false`.

### GET /transacoes

Retorna o objeto `historico` com as transações e o objeto `metricas` com:

- `saldoTotal`: receitas menos despesas.
- `totalDespesas`: soma das despesas.
- `totalGastoImpulso`: soma das despesas com consumoConsciente igual a false.

As requisições podem ser testadas no Postman Desktop.

## Proposta social

A ferramenta pode apoiar ações de educação financeira, ajudando a visualizar hábitos de consumo e diferenciar despesas essenciais de gastos por impulso. A proposta se relaciona ao ODS 1 — Erradicação da Pobreza e ao ODS 12 — Consumo e Produção Responsáveis.
