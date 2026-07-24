# Constituição do Projeto - CursoReact

## Padrões de Tecnologia

- Framework front-end: React 18+
- Ferramenta de build: Create React App (CRA) ou Vite
- Gerenciador de pacotes: npm ou yarn
- Node.js: Versão LTS (18+ recomendado)
- Nenhuma dependência de backend externo para este projeto educacional
- CSS: CSS puro ou CSS-in-JS (evitar pré-processadores de CSS sem justificativa)
- Biblioteca de componentes: Componentes customizados (evitar bibliotecas UI pesadas de terceiros)
- Gerenciamento de estado: React hooks (useState, useContext) para gestão de estado
- Saída de build: Build pronto para produção com minificação e otimização

## Requisitos de Segurança

- Nenhum dado sensível (chaves de API, tokens, credenciais) hardcoded nos arquivos de código
- Variáveis de ambiente para qualquer configuração (usar arquivos .env, excluídos do git)
- Nenhuma exposição de dados do servidor através do código cliente
- Sanitizar toda entrada do usuário antes de renderizar para evitar ataques XSS
- Usar headers Content Security Policy (CSP) se implantado online
- Auditorias regulares de dependências: executar `npm audit` antes de releases
- Remover dependências não utilizadas para minimizar superfície de ataque

## Desempenho e Escalabilidade

- Carregamento inicial da página deve completar em 3 segundos em redes 4G
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Renderização de componentes não deve exceder 16ms por frame (60 FPS)
- Carregamento lazy de componentes não visíveis na renderização inicial usando React.lazy()
- Implementar memoização para renderizações de componentes custosas
- Manter tamanho do bundle sob 500KB (gzipped)
- Usar classes CSS eficientemente; evitar estilos inline por questão de desempenho
- Cachear assets estáticos com headers de cache apropriados

## Padrões de Codificação

- Seguir Airbnb React/JSX Style Guide
- Nomenclatura de componentes: PascalCase (ex: `Colaborador.js`)
- Nomenclatura de arquivos: Corresponder ao nome do componente (ex: `Colaborador/index.js`)
- Validação de props: PropTypes para todas as props do componente ou comentários JSDoc
- Componentes funcionais com hooks (nenhum componente classe a menos que necessário)
- Comprimento máximo de função: 150 linhas; extrair funções menores se exceder
- Usar nomes de variáveis significativos em português ou inglês (consistente no projeto)
- Todos os componentes devem ter export padrão e arquivo index.js
- Arquivos CSS co-localizados com componentes (ex: `Colaborador.css` com `Colaborador.js`)
- Implementar logging estruturado para debug (console.log apenas para desenvolvimento)
- Manter no mínimo 70% de cobertura de testes para funções utilitárias

## Conformidade e Governança

- Padrões de acessibilidade: Conformidade WCAG 2.1 Nível A mínimo
- Suportar navegação por teclado para todos os componentes interativos
- Usar HTML semântico (button, form, label, etc)
- Fornecer texto alternativo (alt text) para todas as imagens em public/Imagens/
- Suportar leitores de tela com labels ARIA apropriados quando necessário
- Documentar todos os componentes com comentários JSDoc (parâmetros, valores de retorno, uso)
- Manter um arquivo CHANGELOG.md para histórico de versões
- Workflow Git: Usar branches de feature, mensagens de commit em inglês
- Code review obrigatório antes de fazer merge para main/master
- Dependências devem ser de fontes npm reputáveis; evitar pacotes não mantidos
- Monitorar e atualizar dependências trimestralmente

## Padrões de Arquitetura de Componentes

- Cada componente em `src/componentes/` deve ter sua própria pasta
- Estrutura do componente: `ComponentName/index.js`, `ComponentName.js`, `ComponentName.css`
- Props drilling limitado a 2 níveis; usar Context API para hierarquias mais profundas
- Componentes reutilizáveis em `componentes/`; lógica específica de página em componentes de nível superior
- Manter componentes com responsabilidade única (fazer uma coisa bem)

## Build e Deployment

- Comando de build: `npm run build`
- Comando de testes: `npm test`
- Iniciar desenvolvimento: `npm start`
- Builds de produção devem passar em linting sem avisos
- Assets otimizados: imagens comprimidas, código não utilizado removido
- Alvo de deployment: Hospedagem estática (GitHub Pages, Vercel, Netlify, etc)