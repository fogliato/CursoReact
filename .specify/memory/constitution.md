<!--
Sync Impact Report
- Version change: template → 1.0.0
- Modified principles: template placeholders → five project-specific principles
- Added sections: Build e Deployment; Qualidade e Governanca
- Removed sections: none; template sections were replaced with concrete rules
- Templates requiring updates: OK - .specify/templates/plan-template.md (Constitution Check aligned)
	OK - .specify/templates/spec-template.md (requirements structure aligned)
	OK - .specify/templates/tasks-template.md (testing and cross-cutting task structure aligned)
	OK - .github/agents/*.md and .github/prompts/*.md (no outdated agent-specific references found)
- Follow-up TODO: confirm the original ratification date.
-->
# CursoReact Constitution

## Core Principles

### I. Stack Simples e Apropriada
O projeto MUST usar React 18 ou superior, Create React App ou Vite, Node.js LTS
(18+ recomendado), npm ou yarn e CSS puro ou CSS-in-JS. Componentes customizados
MUST ser preferidos a bibliotecas UI pesadas, e o projeto MUST permanecer sem
dependência de backend externo. Toda dependência adicional MUST ter justificativa
de manutenção e valor para o produto educacional.

### II. Segurança por Padrão
Código MUST NOT conter chaves, tokens, credenciais ou outros dados sensíveis.
Configurações variáveis MUST usar variáveis de ambiente, com arquivos `.env`
excluídos do Git. Entradas do usuário MUST ser validadas e sanitizadas antes de
serem renderizadas; dados do servidor MUST NOT ser expostos desnecessariamente no
cliente. Releases MUST incluir `npm audit`, e dependências não utilizadas MUST ser
removidas. Implantações online SHOULD configurar Content Security Policy.

### III. Desempenho Mensurável
A experiência inicial MUST buscar carregamento em até 3 segundos em rede 4G,
LCP menor que 2,5 segundos e CLS menor que 0,1. Interações MUST preservar 60 FPS
quando possível, com renderização de componentes em até 16 ms por frame.
Componentes não visíveis na entrada SHOULD usar carregamento lazy, renderizações
custosas SHOULD usar memoização medida, e o bundle de produção SHOULD permanecer
abaixo de 500 KB comprimido. Assets estáticos MUST ser otimizados e configurados
para cache apropriado.

### IV. Qualidade de Código e Testes
Componentes MUST ser funcionais e usar hooks, salvo necessidade técnica
documentada. Nomes de componentes MUST usar PascalCase, arquivos MUST acompanhar
o nome do componente e funções MUST ter no máximo 150 linhas. Props MUST ser
validadas com PropTypes ou JSDoc. O código MUST seguir o estilo Airbnb React/JSX,
usar nomes significativos de forma consistente e evitar logging de produção por
meio de `console.log`. Funções utilitárias MUST manter pelo menos 70% de
cobertura de testes. Componentes e APIs públicas MUST ter documentação JSDoc
sucinta quando seu uso não for evidente.

### V. Arquitetura, Acessibilidade e Responsabilidade Única
Cada componente em `src/componentes/` MUST possuir pasta própria, arquivo
`index.js`, implementação e CSS co-localizado quando aplicável. Componentes MUST
ter responsabilidade única; props drilling SHOULD limitar-se a dois níveis, com
Context API para hierarquias mais profundas. Interfaces MUST usar HTML semântico,
ser navegáveis por teclado e atender no mínimo WCAG 2.1 nível A. Imagens em
`public/Imagens/` MUST possuir texto alternativo, e atributos ARIA MUST ser usados
quando necessários para leitores de tela.

## Build e Deployment

O build de produção MUST ser gerado por `npm run build`, minificado, otimizado e
sem avisos de lint. Testes MUST ser executáveis por `npm test` e o ambiente de
desenvolvimento por `npm start`. O deployment alvo é hospedagem estática, como
GitHub Pages, Vercel ou Netlify. Imagens MUST ser comprimidas e código não usado
MUST ser removido antes de releases.

## Qualidade e Governanca

O projeto MUST manter `CHANGELOG.md` para o histórico de versões. Mudanças MUST
usar branches de feature e mensagens de commit em inglês. Code review é
obrigatório antes de merge em `main` ou `master`. Dependências MUST vir de fontes
npm reputáveis e ser revisadas pelo menos trimestralmente.

## Governance

Esta constituição é a referência normativa para especificações, planos, tarefas,
implementação e revisão. Toda alteração MUST documentar a motivação, o impacto
nos templates e os follow-ups necessários no Sync Impact Report. A versão segue
SemVer: MAJOR para remoção ou redefinição incompatível de princípio, MINOR para
novo princípio ou expansão material de regras, e PATCH para esclarecimentos sem
mudança semântica. Cada plano MUST reavaliar o Constitution Check após o design,
e cada code review MUST verificar conformidade com os princípios aplicáveis.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirmar data historica | **Last Amended**: 2026-08-14
