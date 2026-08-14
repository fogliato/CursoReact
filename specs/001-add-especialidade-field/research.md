# Research: Adicionar Campo de Especialidade

**Feature**: 001-add-especialidade-field | **Date**: 2026-08-14 | **Phase**: 0

Todas as ambiguidades da especificação foram resolvidas na sessão de clarificação
(2026-08-14). Não restam marcadores `NEEDS CLARIFICATION`. As decisões abaixo
consolidam as escolhas técnicas.

## Decisão 1: Localização da lógica de validação/sanitização

- **Decision**: Extrair funções puras para `src/utils/especialidade.js`
  (`sanitizarEspecialidade`, `validarObrigatorio`, constantes de limite/regex e a
  chave de `localStorage`).
- **Rationale**: A constituição exige ≥70% de cobertura de testes para funções
  utilitárias. Funções puras são determinísticas e testáveis isoladamente com Jest,
  sem renderizar componentes. Mantém `Formulario` enxuto (< 150 linhas).
- **Alternatives considered**: Lógica inline no `Formulario` — rejeitada por
  dificultar testes unitários e inflar o componente.

## Decisão 2: Bloqueio de caracteres inválidos e limite de 255 (tempo real)

- **Decision**: Sanitizar no handler `aoAlterado` do `CampoTexto`: remover caracteres
  fora do conjunto permitido e truncar em 255 antes de atualizar o estado. Exibir
  aviso momentâneo quando a entrada bruta divergir do valor sanitizado.
- **Rationale**: Clarificações Q1 e Q5 definiram bloqueio rígido na entrada,
  garantindo que o estado nunca contenha valores inválidos (anti-XSS por construção)
  e simplificando os testes.
- **Alternatives considered**: Validar apenas no envio — rejeitado pelas clarificações.
- **Conjunto permitido**: letras (incl. acentuadas), números, espaço, `-`, `/`, `,`,
  `(`, `)`, `.`, `+`. Regex de rejeição remove os demais (ex.: `@ # $ % & * !`).

## Decisão 3: Validação de obrigatoriedade

- **Decision**: Verificar no `onSubmit` se o valor (após `trim`) está vazio; se sim,
  bloquear envio, exibir "O campo Especialidade é obrigatório" e mover foco ao campo.
- **Rationale**: Clarificação Q5 mantém a obrigatoriedade validada apenas no envio,
  não no blur. Coerente com FR-004/FR-006.
- **Alternatives considered**: Validar no blur — rejeitado por FR-006.

## Decisão 4: Persistência em localStorage

- **Decision**: `useState` inicializado a partir de `localStorage` (leitura no mount
  via inicializador preguiçoso). `useEffect` grava a cada mudança (`onChange`). No
  envio bem-sucedido e no reset, limpar o estado e remover a chave.
- **Rationale**: Clarificações Q2 e Q3 — rascunho salvo em `onChange`, restaurado no
  mount, limpo no envio e no reset. Chave única `especialidade:draft`.
- **Alternatives considered**: Persistir todos os campos do formulário — fora de
  escopo (spec restringe à especialidade). Salvar só no submit — rejeitado por Q2.

## Decisão 5: Acessibilidade do campo

- **Decision**: Estender `CampoTexto` com prop opcional `id` (aditiva) para associar
  `label htmlFor` ↔ `input id`. Rótulo "Especialidade *" (asterisco). `obrigatorio`
  aciona `required` nativo (aria-required implícito). Mensagem de erro em elemento com
  `role="alert"` para anúncio por leitores de tela.
- **Rationale**: Clarificação Q4 (asterisco + aria-required) e requisito WCAG 2.1 A.
  A prop `id` é retrocompatível (default = comportamento atual), permanecendo aditiva.
- **Alternatives considered**: Campo bespoke sem `CampoTexto` — rejeitado por
  FR-001/FR-002.

## Decisão 6: Propagação da especialidade ao card

- **Decision**: Incluir `especialidade` no objeto do colaborador no envio; `Time`
  repassa `especialidade` ao `Colaborador`; `Colaborador` renderiza
  "Especialidade: {valor}" condicionalmente (omitido se ausente/vazio).
- **Rationale**: FR-010/FR-011/FR-012. Mantém props drilling em 2 níveis
  (Time→Colaborador), dentro do limite da constituição.
- **Alternatives considered**: Context API — desnecessário para 2 níveis.

## Decisão 7: Estratégia de testes

- **Decision**: Testes unitários das funções utilitárias (Jest) cobrindo sanitização,
  truncagem, rejeição de caracteres, `trim`/obrigatoriedade. Testes de componente com
  React Testing Library para: exibição do campo, erro no envio vazio, bloqueio de
  caracteres, exibição no card, omissão quando ausente, persistência/reset.
- **Rationale**: Constituição exige cobertura de utilitários e `react-scripts test`
  já provê o runner (Jest + RTL).
- **Alternatives considered**: Somente testes manuais — insuficiente para a constituição.
