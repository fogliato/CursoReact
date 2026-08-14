# Implementation Plan: Adicionar Campo de Especialidade ao Formulário de Funcionários

**Branch**: `001-add-especialidade-field` | **Date**: 2026-08-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-add-especialidade-field/spec.md`

## Summary

Adicionar um campo obrigatório "Especialidade" ao formulário de cadastro de
colaboradores, posicionado abaixo do campo "Cargo", com validação em tempo real
(bloqueio de caracteres inválidos e limite de 255), validação de obrigatoriedade no
envio, persistência de rascunho em `localStorage` (salva em `onChange`, restaura no
mount, limpa no envio bem-sucedido e no reset) e exibição da especialidade no card do
colaborador. A abordagem técnica reutiliza o componente `CampoTexto` existente,
concentra a lógica de sanitização/validação em um módulo utilitário puro e testável,
e propaga a especialidade pelo fluxo `Formulario → App → Time → Colaborador` de forma
puramente aditiva.

## Technical Context

**Language/Version**: JavaScript (ES2021), React 18.2  
**Primary Dependencies**: React 18.2, react-dom 18.2, react-scripts 5.0.1 (Create React App)  
**Storage**: `localStorage` do navegador (rascunho da especialidade)  
**Testing**: Jest + React Testing Library (`@testing-library/react`, `@testing-library/user-event`) via `react-scripts test`  
**Target Platform**: Navegadores modernos (SPA web, hospedagem estática)  
**Project Type**: Aplicação web single-page (somente frontend)  
**Performance Goals**: Validação do campo < 50 ms; renderização a 60 FPS; LCP < 2.5s, CLS < 0.1 (constituição)  
**Constraints**: Mudanças puramente aditivas (FR-015); bundle < 500KB gzipped; WCAG 2.1 Nível A; sem novas dependências de terceiros  
**Scale/Scope**: App educacional pequeno (~7 componentes). Escopo do recurso: `Formulario`, `Colaborador`, `Time`, extensão aditiva de `CampoTexto`, e um novo módulo utilitário de validação.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Avaliação | Status |
|-----------|-----------|--------|
| I. Arquitetura de Componentes Modular | Mudança aditiva respeita a estrutura de pastas; responsabilidade única mantida; props drilling permanece em ≤2 níveis (Time→Colaborador). Nenhum novo nível de drilling introduzido. | PASS |
| II. Qualidade de Código e Padrões | Componentes funcionais com hooks; lógica de validação extraída para módulo utilitário puro com testes (≥70% de cobertura); JSDoc/PropTypes adicionados ao código novo/tocado. Sem função > 150 linhas. | PASS |
| III. Segurança por Padrão | Entrada sanitizada antes de renderizar (bloqueio de caracteres inválidos); React escapa saída por padrão (anti-XSS); `localStorage` não armazena segredos. | PASS |
| IV. Desempenho e Web Vitals | Validação síncrona trivial (< 50 ms); nenhuma renderização custosa introduzida; sem impacto material no bundle. | PASS |
| V. Acessibilidade e Conformidade | Rótulo com asterisco + associação `htmlFor`/`id`; `required` nativo (aria-required implícito); mensagem de erro com `role="alert"`; navegação por teclado preservada; JSDoc no código novo. | PASS |

**Resultado**: PASS. A extensão do `CampoTexto` é feita com uma prop opcional
(`id`) retrocompatível (default preserva o comportamento atual), portanto permanece
aditiva e não viola FR-015. Ver Complexity Tracking para o registro dessa decisão.

## Project Structure

### Documentation (this feature)

```text
specs/001-add-especialidade-field/
├── plan.md              # Este arquivo (/speckit.plan)
├── research.md          # Fase 0 (/speckit.plan)
├── data-model.md        # Fase 1 (/speckit.plan)
├── quickstart.md        # Fase 1 (/speckit.plan)
├── contracts/           # Fase 1 (/speckit.plan)
│   └── componentes.md   # Contratos de props e do utilitário de validação
└── tasks.md             # Fase 2 (/speckit.tasks - NÃO criado por /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── App.js                          # Filtra colaboradores por time (sem mudança de contrato)
├── componentes/
│   ├── Formulario/
│   │   ├── index.js                # + estado especialidade, persistência, validação, render do erro
│   │   └── Formulario.css          # + estilo da mensagem de erro (se necessário)
│   ├── CampoTexto/
│   │   └── index.js                # + prop opcional `id` (aditiva) p/ htmlFor
│   ├── Colaborador/
│   │   ├── index.js                # + exibição condicional da especialidade
│   │   └── Colaborador.css         # + estilo da linha de especialidade (se necessário)
│   └── Time/
│       └── index.js                # + repasse da prop especialidade ao Colaborador
└── utils/
    ├── especialidade.js            # NOVO: funções puras (sanitizar, validar, storage keys)
    └── especialidade.test.js       # NOVO: testes unitários (≥70% cobertura)
```

**Structure Decision**: Projeto single-page frontend (CRA). A lógica de validação e
persistência é extraída para `src/utils/especialidade.js` (funções puras) para
atender ao requisito de cobertura de testes da constituição e manter os componentes
enxutos. Componentes seguem a convenção existente de pasta por componente.

## Complexity Tracking

> Registro de desvios que exigem justificativa.

| Decisão | Por que é necessária | Alternativa mais simples rejeitada porque |
|---------|----------------------|-------------------------------------------|
| Adicionar prop opcional `id` ao `CampoTexto` | A acessibilidade (associação `label`↔`input` via `htmlFor`) exigida pela spec não é possível sem tocar no `CampoTexto`, que controla ambos os elementos. | Construir um campo bespoke violaria FR-001/FR-002 (usar `CampoTexto`); manter sem `htmlFor` violaria o requisito de acessibilidade. A prop é opcional e retrocompatível (default = comportamento atual), permanecendo aditiva. |
| Novo módulo `utils/especialidade.js` | Constituição exige ≥70% de cobertura para funções utilitárias; extrair funções puras torna a validação testável isoladamente. | Manter a lógica inline no `Formulario` dificultaria testes unitários determinísticos e aumentaria o tamanho do componente. |
