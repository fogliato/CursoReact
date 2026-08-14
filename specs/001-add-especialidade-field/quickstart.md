# Quickstart: Adicionar Campo de Especialidade

**Feature**: 001-add-especialidade-field | **Date**: 2026-08-14

## Pré-requisitos

- Node.js LTS (18+)
- Dependências instaladas: `npm install`

## Executar em desenvolvimento

```powershell
npm start
```

Abre `http://localhost:3000`. O formulário de cadastro exibe o novo campo
"Especialidade *" logo abaixo de "Cargo".

## Executar os testes

```powershell
npm test
```

Runner: Jest + React Testing Library (via `react-scripts test`). Para cobertura:

```powershell
npm test -- --coverage --watchAll=false
```

## Validação manual (mapeada às histórias)

### US1 — Registrar e exibir especialidade (P1)
1. Preencha Nome, Cargo, Time e Especialidade (ex.: "Desenvolvedor Backend").
2. Clique em "Criar Card".
3. Verifique que o card do colaborador exibe "Especialidade: Desenvolvedor Backend"
   abaixo do cargo.
4. Crie um colaborador sem especialidade (via código/estado) e confirme que a linha
   é omitida (sem "undefined", sem linha vazia).

### US2 — Validação obrigatória e de formato (P2)
1. Deixe "Especialidade" vazio e envie → mensagem "O campo Especialidade é
   obrigatório" abaixo do campo (texto vermelho), foco no campo, envio bloqueado.
2. Digite apenas espaços e envie → mesma mensagem de obrigatório.
3. Tente digitar `@ # $` → caracteres são bloqueados; aviso momentâneo "Especialidade
   contém caracteres inválidos".
4. Cole um texto com mais de 255 caracteres → truncado em 255; aviso "Especialidade
   não deve ultrapassar 255 caracteres".
5. Corrija para um valor válido → mensagem de erro desaparece.

### US3 — Persistência (P3)
1. Digite uma especialidade (não envie).
2. Recarregue a página (F5) → o valor é restaurado no campo.
3. Envie com sucesso → campo limpa e, ao recarregar, o valor não retorna.
4. Reset/limpeza do formulário → campo vazio e rascunho removido do `localStorage`.

## Verificação de qualidade (constituição)

```powershell
# Build de produção deve passar sem avisos de lint
npm run build

# Auditoria de dependências
npm audit
```

- Acessibilidade: rótulo associado ao input (`htmlFor`/`id`), asterisco de
  obrigatório, mensagem de erro anunciada (`role="alert"`), navegação por teclado.
- Cobertura: funções em `src/utils/especialidade.js` com ≥ 70%.
