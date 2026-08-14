<!--
SYNC IMPACT REPORT
==================
Version change: [initial template] → 1.0.0
Rationale: First concrete ratification of the project constitution, replacing the
unfilled template. MAJOR bump to 1.0.0 (initial adoption).

Modified principles (template placeholder → concrete name):
- [PRINCIPLE_1_NAME] → I. Arquitetura de Componentes Modular
- [PRINCIPLE_2_NAME] → II. Qualidade de Código e Padrões
- [PRINCIPLE_3_NAME] → III. Segurança por Padrão
- [PRINCIPLE_4_NAME] → IV. Desempenho e Web Vitals
- [PRINCIPLE_5_NAME] → V. Acessibilidade e Conformidade

Added sections:
- Padrões de Tecnologia (Section 2)
- Fluxo de Desenvolvimento e Deployment (Section 3)
- Governança (concrete rules)

Removed sections: none

Templates requiring updates:
- ✅ .specify/templates/plan-template.md (Constitution Check gate is generic; compatible)
- ✅ .specify/templates/spec-template.md (no mandatory constitution-driven changes)
- ✅ .specify/templates/tasks-template.md (task categories cover testing/accessibility/perf)
- ✅ .specify/memory/constitution.md (this file)

Follow-up TODOs: none
-->

# Constituição do Projeto CursoReact

## Princípios Fundamentais

### I. Arquitetura de Componentes Modular
Cada componente em `src/componentes/` DEVE residir em sua própria pasta seguindo a
estrutura `ComponentName/index.js`, `ComponentName.js` e `ComponentName.css`
co-localizado. Cada componente DEVE ter responsabilidade única (fazer uma coisa bem)
e um export padrão. O props drilling É LIMITADO a 2 níveis; hierarquias mais
profundas DEVEM usar a Context API. Componentes reutilizáveis ficam em
`componentes/`; a lógica específica de página fica em componentes de nível superior.

**Razão**: A modularidade consistente mantém o projeto educacional navegável,
testável e escalável, evitando acoplamento acidental e componentes monolíticos.

### II. Qualidade de Código e Padrões
Todo o código DEVE seguir o Airbnb React/JSX Style Guide. Componentes DEVEM ser
funcionais com hooks (componentes classe apenas quando estritamente necessário e
justificado). Nomenclatura: componentes em PascalCase; arquivos correspondendo ao
nome do componente. Todas as props DEVEM ser validadas via PropTypes ou comentários
JSDoc. Funções NÃO DEVEM exceder 150 linhas — extrair funções menores quando
ultrapassar. Funções utilitárias DEVEM manter no mínimo 70% de cobertura de testes.
Builds de produção DEVEM passar em linting sem avisos.

**Razão**: Padrões uniformes reduzem carga cognitiva, facilitam revisões e garantem
que o código de referência seja um bom exemplo pedagógico.

### III. Segurança por Padrão
Nenhum dado sensível (chaves de API, tokens, credenciais) DEVE ser hardcoded no
código. Toda configuração DEVE usar variáveis de ambiente via arquivos `.env`
excluídos do controle de versão. Toda entrada do usuário DEVE ser sanitizada antes
de renderizar para prevenir XSS. `npm audit` DEVE ser executado antes de cada
release e dependências não utilizadas DEVEM ser removidas. Quando implantado online,
headers Content Security Policy (CSP) DEVEM ser aplicados.

**Razão**: Segurança tratada como padrão desde o início evita vulnerabilidades
comuns e ensina práticas corretas mesmo em um projeto educacional.

### IV. Desempenho e Web Vitals
O carregamento inicial da página DEVE completar em até 3 segundos em redes 4G. As
Core Web Vitals DEVEM atender: LCP < 2.5s, FID < 100ms, CLS < 0.1. A renderização
de componentes NÃO DEVE exceder 16ms por frame (60 FPS). Componentes não visíveis na
renderização inicial DEVEM usar carregamento lazy via `React.lazy()`. Renderizações
custosas DEVEM aplicar memoização. O bundle DEVE permanecer sob 500KB (gzipped) e
assets estáticos DEVEM usar headers de cache apropriados.

**Razão**: Metas de desempenho mensuráveis mantêm a experiência do usuário fluida e
tornam regressões detectáveis de forma objetiva.

### V. Acessibilidade e Conformidade
Todos os componentes DEVEM atender no mínimo a conformidade WCAG 2.1 Nível A. A
navegação por teclado DEVE ser suportada em todos os componentes interativos. HTML
semântico (`button`, `form`, `label`, etc.) DEVE ser usado. Todas as imagens em
`public/Imagens/` DEVEM ter texto alternativo (alt text). Labels ARIA apropriados
DEVEM ser fornecidos para suportar leitores de tela quando necessário. Todos os
componentes DEVEM ser documentados com comentários JSDoc (parâmetros, retornos, uso).

**Razão**: Acessibilidade é um requisito não negociável de qualidade e inclusão, e
sua verificação é objetiva e testável.

## Padrões de Tecnologia

Este projeto DEVE aderir à seguinte stack tecnológica:

- Framework front-end: React 18+
- Ferramenta de build: Create React App (CRA) ou Vite
- Gerenciador de pacotes: npm ou yarn
- Node.js: Versão LTS (18+ recomendado)
- Nenhuma dependência de backend externo (projeto educacional)
- CSS: CSS puro ou CSS-in-JS (evitar pré-processadores sem justificativa)
- Biblioteca de componentes: componentes customizados (evitar bibliotecas UI pesadas
  de terceiros)
- Gerenciamento de estado: React hooks (`useState`, `useContext`)
- Saída de build: pronta para produção com minificação e otimização
- Logging estruturado para debug; `console.log` apenas em desenvolvimento

## Fluxo de Desenvolvimento e Deployment

Comandos padrão:

- Iniciar desenvolvimento: `npm start`
- Executar testes: `npm test`
- Build de produção: `npm run build`

Fluxo e qualidade:

- Workflow Git: usar branches de feature; mensagens de commit em inglês.
- Code review É OBRIGATÓRIO antes de fazer merge para `main`/`master`.
- Builds de produção DEVEM passar em linting sem avisos.
- Dependências DEVEM vir de fontes npm reputáveis; evitar pacotes não mantidos.
- Dependências DEVEM ser monitoradas e atualizadas trimestralmente.
- Manter um `CHANGELOG.md` para o histórico de versões.
- Assets DEVEM ser otimizados (imagens comprimidas, código não utilizado removido).
- Alvo de deployment: hospedagem estática (GitHub Pages, Vercel, Netlify, etc.).

## Governança

Esta constituição SUPERA todas as demais práticas do projeto. Em caso de conflito
entre esta constituição e qualquer outra convenção, esta constituição prevalece.

Emendas:
- Toda emenda DEVE ser documentada com justificativa, aprovada via code review e
  acompanhada de um plano de migração quando introduzir mudanças incompatíveis.
- O versionamento segue Semantic Versioning:
  - MAJOR: remoções ou redefinições incompatíveis de princípios ou governança.
  - MINOR: adição de um novo princípio/seção ou expansão material de orientação.
  - PATCH: esclarecimentos, correções de redação e refinamentos não semânticos.

Conformidade:
- Todas as PRs e revisões DEVEM verificar conformidade com estes princípios.
- Qualquer complexidade adicional DEVE ser justificada explicitamente.
- Revisões de conformidade DEVEM ocorrer a cada release e na atualização trimestral
  de dependências.

**Version**: 1.0.0 | **Ratified**: 2026-08-13 | **Last Amended**: 2026-08-13
