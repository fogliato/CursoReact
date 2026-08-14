# Feature Specification: Adicionar Campo de Especialidade ao Formulário de Funcionários

**Feature Branch**: `001-add-especialidade-field`  
**Created**: 2026-08-13  
**Status**: Draft  
**Input**: User description: "Adicionar um novo campo 'Especialidade' ao formulário de registro de funcionários, posicionado abaixo do campo 'Cargo', com validação obrigatória e exibição no card do funcionário."

## Clarifications

### Session 2026-08-13

- Q: No limite de 255 caracteres, o campo deve bloquear a entrada ou permitir ultrapassar e validar no envio? → A: Bloqueio rígido — o campo impede digitar/colar além de 255; ao colar algo maior, trunca em 255 e exibe o aviso momentaneamente.
- Q: Quando a especialidade é salva em localStorage e qual valor sobrevive ao recarregamento? → A: Rascunho em progresso — salva em cada digitação (onChange) e restaura no mount; o reset limpa o localStorage.
- Q: O que acontece com o rascunho persistido após um envio bem-sucedido? → A: O envio bem-sucedido limpa o campo e remove o rascunho do localStorage; o próximo cadastro começa vazio.
- Q: Como indicar visualmente que o campo Especialidade é obrigatório? → A: Asterisco (*) no rótulo "Especialidade *", com aria-required para leitores de tela.
- Q: Caracteres inválidos são bloqueados ao digitar ou rejeitados apenas no envio? → A: Bloqueados ao digitar/colar (consistente com o limite de 255); a obrigatoriedade permanece validada apenas no envio.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registrar especialidade do funcionário (Priority: P1)

Como usuário que registra funcionários, quero inserir a especialidade de um
funcionário ao cadastrá-lo, para capturar informações profissionais adicionais além
do cargo, e ver essa especialidade exibida no card do funcionário para identificar
rapidamente sua área de expertise.

**Why this priority**: É o valor central do recurso — sem a captura e exibição da
especialidade, o recurso não entrega nenhum benefício. Constitui o MVP.

**Independent Test**: Preencher o formulário incluindo um valor válido de
especialidade, enviar e verificar que o novo funcionário aparece no time
correspondente com a linha "Especialidade: {valor}" no card.

**Acceptance Scenarios**:

1. **Given** o formulário de registro aberto, **When** o usuário preenche todos os
   campos obrigatórios incluindo "Especialidade" com um valor válido e envia,
   **Then** o funcionário é criado e seu card exibe a linha "Especialidade: {valor}"
   abaixo da informação de cargo.
2. **Given** o campo "Especialidade" posicionado abaixo do campo "Cargo", **When** o
   usuário visualiza o formulário, **Then** o campo aparece como entrada de texto com
   label "Especialidade" e placeholder "Digite a especialidade", com a mesma
   estilização dos campos existentes.
3. **Given** um funcionário criado sem valor de especialidade, **When** seu card é
   renderizado, **Then** a linha de especialidade é totalmente omitida (sem label
   vazio, sem "undefined", sem linha em branco).

---

### User Story 2 - Validação obrigatória do campo (Priority: P2)

Como validador de formulário, quero que o campo de especialidade seja obrigatório e
validado, para que todos os registros de funcionários tenham informações completas e
consistentes.

**Why this priority**: Garante qualidade dos dados, mas depende da existência do
campo (P1). Sem validação o recurso ainda funciona, porém com dados potencialmente
incompletos.

**Independent Test**: Tentar enviar o formulário com o campo de especialidade vazio
(ou apenas com espaços) e confirmar que o envio é bloqueado e a mensagem de erro
apropriada é exibida.

**Acceptance Scenarios**:

1. **Given** o campo "Especialidade" vazio, **When** o usuário tenta enviar o
   formulário, **Then** o envio é bloqueado e a mensagem "O campo Especialidade é
   obrigatório" é exibida abaixo do campo, em texto vermelho, e o campo recebe foco.
2. **Given** o campo contendo apenas espaços em branco, **When** o usuário tenta
   enviar, **Then** o valor é tratado como vazio e a mesma mensagem de obrigatório é
   exibida.
3. **Given** um erro de validação exibido, **When** o usuário insere um valor válido
   (não vazio, dentro do limite de caracteres, sem caracteres inválidos), **Then** a
   mensagem de erro desaparece automaticamente.
4. **Given** um valor com mais de 255 caracteres, **When** o usuário insere/cola o
   texto, **Then** o sistema exibe "Especialidade não deve ultrapassar 255
   caracteres" e impede que o excedente seja registrado.
5. **Given** o usuário tentando digitar ou colar caracteres inválidos (ex.: @, #, $),
   **When** a entrada ocorre, **Then** os caracteres inválidos são bloqueados e o
   sistema exibe momentaneamente "Especialidade contém caracteres inválidos".

---

### User Story 3 - Persistência entre sessões (Priority: P3)

Como usuário, quero que os dados de especialidade sejam preservados após recarregar a
página, para não perder informações inseridas devido a recarregamentos acidentais.

**Why this priority**: Melhoria de conveniência; o recurso é utilizável sem ela, mas
a persistência reduz retrabalho.

**Independent Test**: Inserir uma especialidade, recarregar a página e confirmar que
o valor é restaurado no campo do formulário.

**Acceptance Scenarios**:

1. **Given** um valor de especialidade inserido no formulário, **When** a página é
   recarregada, **Then** o valor é restaurado a partir do armazenamento local.
2. **Given** dados persistidos, **When** o usuário aciona o reset/limpeza do
   formulário, **Then** o campo de especialidade retorna a vazio e os dados
   persistidos são completamente removidos do armazenamento local.

### Edge Cases

- **Entrada apenas com espaços**: espaços em branco são removidos antes da checagem;
  valor resultante vazio é rejeitado como obrigatório.
- **Texto muito longo**: valores até 255 caracteres são aceitos sem truncagem;
  acima disso, o excedente é impedido e um aviso é exibido.
- **Caracteres especiais**: são aceitos letras, números, espaços, hífens, barras,
  vírgulas, parênteses e pontuação comum (ex.: "C++", "Node.js", "QA/QC"); caracteres
  como @, #, $ são bloqueados na entrada com mensagem momentânea.
- **Especialidade ausente no card**: a linha de especialidade é omitida por completo,
  sem erro, sem "undefined" e sem espaço reservado.
- **Especialidades duplicadas**: múltiplos funcionários podem ter o mesmo valor; não
  há verificação de unicidade.
- **Copiar-colar**: conteúdo colado é validado como conteúdo digitado; espaços
  iniciais/finais são removidos durante a validação.
- **Copiar-colar acima do limite**: colar texto que ultrapasse 255 caracteres aciona
  o aviso de limite e impede o excedente.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O formulário de registro de funcionários MUST incluir um campo de
  entrada de texto "Especialidade", posicionado imediatamente abaixo do campo
  "Cargo", com label "Especialidade" e placeholder "Digite a especialidade".
- **FR-002**: O campo de especialidade MUST usar a mesma estilização e o mesmo padrão
  de componente dos campos de formulário existentes (largura e aparência
  consistentes).
- **FR-003**: O valor do campo MUST ser vinculado ao estado do formulário sob a chave
  "especialidade" e atualizado conforme o usuário digita.
- **FR-004**: No envio do formulário, o sistema MUST validar que a especialidade não
  está vazia (após remover espaços em branco); se vazia, MUST bloquear o envio e
  exibir "O campo Especialidade é obrigatório".
- **FR-005**: A mensagem de erro MUST ser exibida abaixo do campo, em texto vermelho
  (estilo de erro existente), e o campo MUST receber foco visual quando o erro ocorre.
- **FR-006**: A validação de obrigatoriedade MUST ser acionada apenas no envio do
  formulário, não no blur do campo; a mesma mensagem MUST ser exibida de forma
  consistente a cada tentativa. As restrições de formato (caracteres inválidos e
  limite de 255) MUST ser aplicadas em tempo real na entrada, conforme FR-008 e
  FR-009.
- **FR-007**: A mensagem de erro MUST desaparecer automaticamente quando o campo
  contiver entrada válida (não vazia, dentro de 255 caracteres, sem caracteres
  inválidos).
- **FR-008**: O campo MUST aceitar letras, números, espaços, hífens, barras,
  vírgulas, parênteses e pontuação comum, e MUST bloquear a entrada de caracteres
  inválidos (ex.: @, #, $) ao digitar/colar, exibindo momentaneamente "Especialidade
  contém caracteres inválidos". O texto registrado nunca contém caracteres inválidos.
- **FR-009**: O campo MUST aplicar bloqueio rígido em 255 caracteres: MUST impedir
  digitar ou colar além de 255 caracteres. Ao colar um conteúdo maior, MUST truncar
  em 255 caracteres e exibir momentaneamente o aviso "Especialidade não deve
  ultrapassar 255 caracteres". O texto persistido nunca ultrapassa 255 caracteres.
- **FR-010**: No envio bem-sucedido, a especialidade MUST ser incluída no objeto do
  funcionário e repassada ao card do funcionário para exibição.
- **FR-011**: O card do funcionário MUST exibir a especialidade em uma nova linha
  abaixo do cargo, no formato "Especialidade: {valor}", com estilo consistente ao
  conteúdo existente do card.
- **FR-012**: Se o funcionário não possuir especialidade, o card MUST omitir
  completamente a linha de especialidade (sem label vazio, sem "undefined", sem linha
  em branco).
- **FR-013**: O valor da especialidade MUST ser persistido como rascunho em
  armazenamento local a cada alteração (onChange), sobrevivendo a recarregamentos de
  página, e MUST ser restaurado do armazenamento local para o estado ao montar o
  formulário, quando disponível.
- **FR-014**: Ao resetar/limpar o formulário, o campo de especialidade MUST voltar a
  vazio e os dados persistidos MUST ser completamente removidos do armazenamento
  local.
- **FR-015**: A alteração MUST ser puramente aditiva, sem modificar as interfaces
  (props/contratos) existentes dos componentes além da adição da especialidade.
- **FR-016**: Após um envio bem-sucedido, o sistema MUST limpar o campo de
  especialidade e MUST remover o rascunho do armazenamento local, de modo que o
  próximo cadastro comece vazio e um recarregamento posterior não restaure o valor
  já enviado.
- **FR-017**: O rótulo do campo MUST indicar status obrigatório por meio de um
  asterisco ("Especialidade *") e o campo MUST expor a obrigatoriedade a leitores de
  tela (por exemplo, via aria-required).

### Key Entities *(include if feature involves data)*

- **Funcionário (Colaborador)**: representa um funcionário registrado. Atributos
  relevantes existentes incluem nome, cargo, imagem e time; este recurso adiciona o
  atributo opcional **especialidade** (texto, até 255 caracteres).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos funcionários registrados após o lançamento possuem um valor de
  especialidade preenchido (o envio é bloqueado sem ele).
- **SC-002**: 100% das tentativas de envio com especialidade vazia ou apenas com
  espaços são bloqueadas e exibem a mensagem de obrigatoriedade.
- **SC-003**: O usuário consegue adicionar a especialidade e ver o card atualizado
  sem passos adicionais além dos já existentes no fluxo de cadastro.
- **SC-004**: A validação do campo produz resultado (aceitação ou mensagem de erro)
  em menos de 50 ms, sem atraso perceptível no preenchimento.
- **SC-005**: Valores de especialidade inseridos permanecem disponíveis após
  recarregar a página em 100% dos casos, até que o formulário seja resetado.
- **SC-006**: Nenhum card exibe "undefined", label vazio ou linha em branco quando a
  especialidade está ausente.

## Assumptions

- O armazenamento local do navegador (localStorage) é o mecanismo de persistência,
  coerente com o projeto educacional sem backend definido na constituição.
- O limite de 255 caracteres é aplicado por bloqueio rígido: a entrada é impedida
  além de 255 e uma colagem maior é truncada em 255, com aviso momentâneo. O texto
  registrado nunca ultrapassa o limite.
- "Caracteres especiais comuns" permitidos incluem espaços, hífens, barras, vírgulas,
  parênteses, pontos e sinais de programação frequentes (ex.: "+", "."), enquanto
  símbolos como @, #, $ são considerados inválidos.
- O campo de especialidade reutiliza o padrão de componente de entrada de texto já
  existente no formulário, mantendo consistência visual e de acessibilidade.
- A validação de obrigatoriedade ocorre somente no envio, conforme especificado, e
  não durante a digitação ou no blur.
