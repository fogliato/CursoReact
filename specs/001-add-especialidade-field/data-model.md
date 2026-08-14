# Data Model: Adicionar Campo de Especialidade

**Feature**: 001-add-especialidade-field | **Date**: 2026-08-14 | **Phase**: 1

Esta feature não usa banco de dados. O "modelo de dados" descreve a entidade de
domínio em memória (estado React) e o rascunho persistido em `localStorage`.

## Entidade: Colaborador

Representa um funcionário exibido em um card de time.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | string | Sim | Nome do colaborador (existente). |
| `cargo` | string | Sim | Cargo do colaborador (existente). |
| `imagem` | string (URL) | Não | Endereço da imagem (existente). |
| `time` | string | Sim | Nome do time (existente). |
| `especialidade` | string | **Sim** (no formulário) | **NOVO.** Área de expertise. ≤ 255 caracteres. Apenas caracteres permitidos. |

**Relacionamentos**: Um `Colaborador` pertence a um `Time` (via `time`). Sem
unicidade de especialidade (múltiplos colaboradores podem repetir valores — spec).

### Regras de validação (especialidade)

- **Obrigatório**: após `trim`, não pode ser vazio (validado no envio). Mensagem:
  "O campo Especialidade é obrigatório".
- **Comprimento**: máximo 255 caracteres; entrada além disso é truncada (bloqueio
  rígido). Aviso momentâneo: "Especialidade não deve ultrapassar 255 caracteres".
- **Formato**: apenas letras (incl. acentuadas), números, espaço, `-`, `/`, `,`,
  `(`, `)`, `.`, `+`. Caracteres inválidos são bloqueados na entrada. Aviso
  momentâneo: "Especialidade contém caracteres inválidos".

### Exibição no card

- Renderiza "Especialidade: {valor}" abaixo do cargo quando presente e não vazio.
- Omite completamente a linha quando ausente/vazio (sem label vazio, sem "undefined").

## Rascunho persistido (localStorage)

| Chave | Valor | Ciclo de vida |
|-------|-------|---------------|
| `especialidade:draft` | string (valor atual do campo, já sanitizado) | Gravado em cada `onChange`; lido no mount; removido no envio bem-sucedido e no reset. |

### Transições de estado do rascunho

```text
[vazio] --digita/cola--> [rascunho salvo em localStorage]
[rascunho salvo] --recarrega página--> [restaurado no mount]
[rascunho salvo] --envio válido--> [campo limpo + chave removida]
[rascunho salvo] --reset--> [campo limpo + chave removida]
[qualquer] --caractere inválido/estouro de 255--> [entrada sanitizada; estado nunca inválido]
```

## Estado do componente Formulario

| Estado | Tipo | Origem | Notas |
|--------|------|--------|-------|
| `especialidade` | string | `useState(() => localStorage[especialidade:draft] ?? '')` | Valor sanitizado do campo. |
| `erroEspecialidade` | string \| null | `useState(null)` | Mensagem de erro atual (obrigatório) ou aviso momentâneo (formato/limite). |
