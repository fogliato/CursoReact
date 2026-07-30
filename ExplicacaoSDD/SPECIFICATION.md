# Especificação: Adicionar Campo de Especialidade ao Formulário de Funcionários

## Resumo

Este recurso adiciona um novo campo "Especialidade" ao formulário de registro de funcionários. O campo é posicionado abaixo do campo "Cargo" e aparece na exibição do card do funcionário. O campo inclui validação de entrada para garantir completude e qualidade dos dados no banco de dados de funcionários.

## Histórias do Usuário

Como um usuário, quero inserir a especialidade de um funcionário ao registrá-lo para capturar informações profissionais adicionais além de seu cargo.

Como um usuário, quero ver a especialidade do funcionário exibida no seu card para identificar rapidamente sua área de expertise.

Como um validador de formulário, quero que o campo de especialidade seja obrigatório para que todos os registros de funcionários tenham informações completas.

## Critérios de Aceitação

- Campo de especialidade aparece no formulário imediatamente abaixo do campo "Cargo"
- Campo de especialidade é um componente de entrada de texto similar aos campos de formulário existentes
- Campo de especialidade é marcado como obrigatório e não pode ser enviado em branco
- Mensagem de erro é exibida quando tentativa de envio do formulário é feita com campo de especialidade vazio
- Texto da mensagem de erro: "O campo Especialidade é obrigatório"
- Dados de especialidade inseridos com sucesso são capturados e armazenados no estado do componente
- Informações de especialidade são exibidas no card do funcionário no componente "Time" abaixo do campo "Cargo"
- Campo de especialidade aceita caracteres alfanuméricos e caracteres especiais comuns (espaços, hífens, vírgulas)
- Envio do formulário é bloqueado se o campo de especialidade estiver vazio
- Layout do card acomoda informações de especialidade sem quebrar a interface existente

## Requisitos Funcionais

### Entrada de Formulário
- Nova instância do componente `<CampoTexto />` adicionada ao componente `Formulario`
- Props do campo incluem: label="Especialidade", placeholder="Digite a especialidade", name="especialidade"
- Campo posicionado imediatamente após o campo de entrada "Cargo" na estrutura do formulário
- Campo usa mesma estilização e padrão de componente dos campos de formulário existentes
- Valor de entrada vinculado ao estado do componente com chave "especialidade"

### Validação
- No envio do formulário (handleSubmit), verificar se o campo especialidade está vazio
- Se vazio, prevenir envio do formulário e exibir mensagem de erro de validação
- Mensagem de erro exibida em texto vermelho (usando estilo de erro existente)
- Mensagem de erro aparece abaixo do campo de entrada de especialidade
- Campo de especialidade recebe foco visual quando erro de validação ocorre
- Validação é acionada apenas no envio do formulário, não no blur do input
- Comportamento de erro é consistente em todas as tentativas de envio: mesmo erro é exibido cada tentativa
- Mensagem de erro desaparece automaticamente quando campo contém entrada válida (não vazio, dentro do limite de 255 caracteres)

### Exibição do Card do Funcionário
- Componente `Colaborador` modificado para exibir informações de especialidade
- Especialidade é exibida no card do funcionário em nova linha abaixo das informações de "Cargo"
- Formato da etiqueta de especialidade: "Especialidade: {value}" (ex: "Especialidade: Desenvolvedor Backend")
- Informações de especialidade com estilo consistente com conteúdo existente do card (estilo do campo Cargo)
- Se especialidade não for fornecida, não exibir linha de especialidade no card

### Fluxo de Dados
- Formulário captura valor de especialidade via manipulador onChange do CampoTexto
- Valor armazenado no estado do componente Formulario com chave "especialidade"
- Especialidade é persistida em localStorage para sobreviver a recarregamentos de página
- On mount do formulário, especialidade é sincronizada do localStorage para state se disponível
- No envio do formulário, especialidade é incluída no objeto do funcionário
- No envio, especialidade é salva em localStorage para persistência entre sessões
- Especialidade é passada para componente Colaborador via props
- Componente Colaborador desestrutura especialidade das props e renderiza

## Requisitos Não Funcionais

### Desempenho
- Campo de entrada do formulário renderiza sem atraso perceptível
- Validação do campo de especialidade é executada em menos de 50ms
- Renderização do card com informações de especialidade completa dentro do ciclo de renderização típico do React

### Usabilidade
- Etiqueta do campo de especialidade indica claramente status obrigatório (consistente com outros campos obrigatórios)
- Mensagem de erro usa mesma combinação de cores e tipografia de outros erros de validação de formulário
- Campo de especialidade tem texto de placeholder apropriado para guiar entrada do usuário
- Largura do campo coincide com outros campos de entrada no formulário para consistência visual

### Acessibilidade
- Campo de entrada de especialidade tem elemento label associado vinculado via atributo htmlFor
- Mensagem de erro tem atributos ARIA apropriados para leitores de tela se falha de validação ocorrer
- Campo é acessível por teclado e focável na ordem de tabulação

### Manutenibilidade
- Campo de especialidade segue padrões de componentes existentes usados em CampoTexto
- Código segue padrões de codificação do projeto conforme CONSTITUTION.md
- Gerenciamento de estado do componente usa padrão React hooks consistente com código existente
- Sem mudanças nas interfaces de componentes existentes; especialidade é puramente aditiva

## Casos Extremos

### Entrada Vazia ou Apenas com Espaços
- Campo de especialidade contendo apenas espaços é tratado como vazio e rejeitado
- Validação remove espaços em branco antes de verificar se string está vazia
- Usuário é solicitado a inserir texto de especialidade real

### Texto de Especialidade Muito Longo
- Campo aceita texto de especialidade até 255 caracteres sem truncagem
- Se texto excede 255 caracteres, exibir aviso: "Especialidade não deve ultrapassar 255 caracteres"
- Caracteres excedentes são prevenidos de serem inseridos

### Caracteres Especiais
- Campo de especialidade aceita: letras, números, espaços, hífens, barras, vírgulas, parênteses
- Caracteres como @, #, $ são rejeitados com mensagem: "Especialidade contém caracteres inválidos"
- Permite abreviaturas comuns e pontuação (ex: "C++", "Node.js", "QA/QC")

### Especialidade Ausente na Exibição do Card
- Se objeto do funcionário não possui propriedade especialidade, card renderiza sem linha de especialidade
- Linha de especialidade é completamente omitida (não aparece no card; sem linha em branco ou label vazio)
- Nenhum erro ou texto "undefined" é exibido no card
- Layout do card permanece adequadamente formatado sem espaço reservado para especialidade faltante

### Especialidades Duplicadas
- Sistema permite múltiplos funcionários com mesmo valor de especialidade
- Nenhuma validação para forçar especialidades únicas em toda equipe

### Reset do Formulário
- Quando formulário é limpo (reset), campo de especialidade volta a string vazia
- localStorage é completamente limpo durante reset (destruição total de dados persistidos)
- Próximo envio do formulário valida especialidade novamente
- Usuário começa com formulário completamente vazio, sem dados persistidos anteriores

### Comportamento de Copiar-Colar
- Usuários podem colar texto de especialidade da área de transferência
- Conteúdo colado é validado igual ao conteúdo digitado
- Espaços em branco iniciais/finais da cola são removidos durante validação
