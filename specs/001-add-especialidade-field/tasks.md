---
description: "Task list for Adicionar Campo de Especialidade ao Formulário de Funcionários"
---

# Tasks: Adicionar Campo de Especialidade ao Formulário de Funcionários

**Input**: Design documents from `/specs/001-add-especialidade-field/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/componentes.md

**Tests**: Test tasks ARE included — justified by the project constitution (≥70%
coverage for utility functions) and research.md Decision 7 (test strategy).

**Organization**: Tasks are grouped by user story (US1/US2/US3) to enable independent
implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1, US2, US3 (maps to spec.md user stories)

## Path Conventions

Single-page frontend (Create React App). Source at `src/`; component folders under
`src/componentes/`; utilities under `src/utils/`. Tests are co-located `*.test.js`
files (CRA/Jest convention).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization for the feature

- [X] T001 Create `src/utils/` folder and confirm the Jest + React Testing Library runner works via `npm test` (react-scripts test)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared building blocks required by all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Create utility module `src/utils/especialidade.js` with constants (`MAX_ESPECIALIDADE`, `MENSAGENS`, `CHAVE_RASCUNHO`) and pure functions `sanitizarEspecialidade` and `validarObrigatorio` per [contracts/componentes.md](contracts/componentes.md)
- [X] T003 Extend `CampoTexto` in `src/componentes/CampoTexto/index.js` with an optional, backward-compatible `id` prop that sets `input id` and `label htmlFor` (default preserves current behavior)

**Checkpoint**: Utility functions and accessible field support ready — user stories can begin

---

## Phase 3: User Story 1 - Registrar e exibir especialidade (Priority: P1) 🎯 MVP

**Goal**: Capturar a especialidade no formulário e exibi-la no card do colaborador.

**Independent Test**: Preencher o formulário com uma especialidade válida, enviar e
confirmar que o card do colaborador mostra "Especialidade: {valor}" abaixo do cargo;
colaborador sem especialidade não exibe a linha.

### Tests for User Story 1 ⚠️ (write first, ensure they FAIL)

- [X] T004 [P] [US1] Component test: formulário renderiza o campo "Especialidade *" imediatamente abaixo de "Cargo" em `src/componentes/Formulario/Formulario.test.js`
- [X] T005 [P] [US1] Component test: card renderiza "Especialidade: {valor}" quando presente e omite a linha quando ausente/vazio em `src/componentes/Colaborador/Colaborador.test.js`

### Implementation for User Story 1

- [X] T006 [US1] Adicionar estado `especialidade` e a instância `<CampoTexto id="especialidade" label="Especialidade *" placeholder="Digite a especialidade" .../>` logo abaixo de "Cargo", com `onChange` usando `sanitizarEspecialidade`, em `src/componentes/Formulario/index.js`
- [X] T007 [US1] Incluir `especialidade` no objeto do colaborador enviado e limpar o campo após o envio em `src/componentes/Formulario/index.js` (depends on T006)
- [X] T008 [P] [US1] Repassar `especialidade={colaborador.especialidade}` de `Time` para `Colaborador` em `src/componentes/Time/index.js`
- [X] T009 [P] [US1] Renderizar condicionalmente "Especialidade: {valor}" (omitir quando vazio/ausente) em `src/componentes/Colaborador/index.js`

**Checkpoint**: US1 funcional — cadastro captura e o card exibe a especialidade (MVP)

---

## Phase 4: User Story 2 - Validação obrigatória e de formato (Priority: P2)

**Goal**: Garantir dados completos e válidos: obrigatoriedade no envio, bloqueio de
caracteres inválidos e limite de 255 em tempo real, com mensagens apropriadas.

**Independent Test**: Enviar com o campo vazio/apenas espaços é bloqueado e exibe "O
campo Especialidade é obrigatório"; digitar `@ # $` é bloqueado; colar > 255 é
truncado; a mensagem de erro some ao inserir valor válido.

### Tests for User Story 2 ⚠️ (write first, ensure they FAIL)

- [X] T010 [P] [US2] Unit tests em `src/utils/especialidade.test.js`: rejeição de caracteres inválidos, truncagem em 255, `trim`/obrigatoriedade (garantir ≥70% de cobertura do módulo)
- [X] T011 [P] [US2] Component tests em `src/componentes/Formulario/Formulario.test.js`: erro de obrigatório no envio vazio (mensagem, foco, envio bloqueado); bloqueio de caracteres inválidos com aviso; truncagem em 255 com aviso; erro some com valor válido

### Implementation for User Story 2

- [X] T012 [US2] Adicionar estado `erroEspecialidade` e validação de obrigatoriedade no `onSubmit` (bloquear envio, definir "O campo Especialidade é obrigatório", mover foco ao campo) em `src/componentes/Formulario/index.js`
- [X] T013 [US2] No `onChange`, exibir avisos momentâneos a partir das flags de `sanitizarEspecialidade` (caracteres inválidos, limite de 255) e limpar o erro automaticamente quando o valor for válido, em `src/componentes/Formulario/index.js` (depends on T012)
- [X] T014 [US2] Renderizar a mensagem de erro/aviso com `role="alert"` abaixo do campo em `src/componentes/Formulario/index.js` (depends on T012)
- [X] T015 [P] [US2] Adicionar estilo da mensagem de erro (texto vermelho) em `src/componentes/Formulario/Formulario.css`

**Checkpoint**: US1 e US2 funcionam de forma independente

---

## Phase 5: User Story 3 - Persistência entre sessões (Priority: P3)

**Goal**: Preservar o rascunho da especialidade entre recarregamentos e limpá-lo no
envio bem-sucedido e no reset.

**Independent Test**: Digitar uma especialidade, recarregar a página e ver o valor
restaurado; após envio bem-sucedido o valor não retorna; reset limpa o rascunho.

### Tests for User Story 3 ⚠️ (write first, ensure they FAIL)

- [X] T016 [P] [US3] Component tests em `src/componentes/Formulario/Formulario.test.js`: rascunho restaurado no mount; persistido a cada digitação; removido no envio bem-sucedido e no reset (mockar `localStorage`)

### Implementation for User Story 3

- [X] T017 [US3] Inicializar o estado `especialidade` a partir do `localStorage` (inicializador preguiçoso usando `CHAVE_RASCUNHO`) em `src/componentes/Formulario/index.js`
- [X] T018 [US3] Persistir `especialidade` no `localStorage` a cada mudança via `useEffect` em `src/componentes/Formulario/index.js` (depends on T017)
- [X] T019 [US3] Remover o rascunho do `localStorage` no envio bem-sucedido e no reset em `src/componentes/Formulario/index.js` (depends on T017)

**Checkpoint**: Todas as histórias funcionam de forma independente

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Refinamentos que afetam múltiplas histórias

- [X] T020 [P] Adicionar estilo da linha de especialidade no card em `src/componentes/Colaborador/Colaborador.css`
- [X] T021 [P] Adicionar JSDoc/PropTypes ao código novo/tocado (`Formulario`, `Colaborador`, `CampoTexto`) conforme a constituição
- [X] T022 Executar `npm test -- --coverage --watchAll=false` e confirmar ≥70% de cobertura em `src/utils/especialidade.js`
- [X] T023 Executar `npm run build` (lint sem avisos) e `npm audit`
- [X] T024 Executar a validação manual do [quickstart.md](quickstart.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sem dependências — pode iniciar imediatamente
- **Foundational (Phase 2)**: depende do Setup — BLOQUEIA todas as histórias
- **User Stories (Phase 3+)**: dependem da Fase 2
  - Observação: US1, US2 e US3 modificam todas o mesmo arquivo `src/componentes/Formulario/index.js`, portanto seu trabalho de implementação nesse arquivo é majoritariamente **sequencial** (recomenda-se ordem P1 → P2 → P3), embora cada história permaneça testável de forma independente.
- **Polish (Fase 6)**: depende das histórias desejadas concluídas

### User Story Dependencies

- **US1 (P1)**: após a Fase 2 — sem dependência de outras histórias (MVP)
- **US2 (P2)**: após a Fase 2 — usa o campo criado na US1; independentemente testável
- **US3 (P3)**: após a Fase 2 — atua sobre o mesmo estado; independentemente testável

### Within Each User Story

- Escrever os testes marcados ⚠️ primeiro e garantir que FALHEM antes de implementar
- Utilitário (Fase 2) antes da lógica de validação (US2)
- Núcleo antes da integração; história completa antes de avançar de prioridade

### Parallel Opportunities

- Setup e Foundational: T002 e T003 tocam arquivos diferentes → podem ser paralelos
- US1: T004 e T005 (testes) em paralelo; T008 e T009 (arquivos distintos) em paralelo
- US2: T010 e T011 (testes) em paralelo; T015 (CSS) em paralelo com a lógica
- Polish: T020 e T021 em paralelo
- Tarefas no mesmo `Formulario/index.js` NÃO são paralelas entre si

---

## Parallel Example: User Story 1

```text
# Testes da US1 juntos (arquivos diferentes):
Task T004: "Component test do campo em Formulario/Formulario.test.js"
Task T005: "Component test do card em Colaborador/Colaborador.test.js"

# Implementação em arquivos distintos juntos:
Task T008: "Repasse da prop em Time/index.js"
Task T009: "Render condicional em Colaborador/index.js"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Concluir a Fase 1 (Setup)
2. Concluir a Fase 2 (Foundational — bloqueia tudo)
3. Concluir a Fase 3 (US1)
4. **PARAR e VALIDAR**: testar a US1 de forma independente
5. Demonstrar se pronto

### Incremental Delivery

- US1 (captura + exibição) → US2 (validação) → US3 (persistência)
- Cada incremento é testável e demonstrável isoladamente
