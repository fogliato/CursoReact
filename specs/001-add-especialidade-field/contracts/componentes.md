# Contratos de Componentes e Utilitário

**Feature**: 001-add-especialidade-field | **Date**: 2026-08-14 | **Phase**: 1

Como é uma aplicação frontend sem API externa, os "contratos" são as interfaces de
props dos componentes e a assinatura do módulo utilitário. Todas as mudanças de
contrato são **aditivas** e retrocompatíveis (FR-015).

## Módulo `src/utils/especialidade.js`

```js
/** Conjunto/limite de validação. */
export const MAX_ESPECIALIDADE = 255;

/** Mensagens de validação (fonte única). */
export const MENSAGENS = {
  obrigatorio: 'O campo Especialidade é obrigatório',
  limite: 'Especialidade não deve ultrapassar 255 caracteres',
  invalido: 'Especialidade contém caracteres inválidos',
};

/** Chave de rascunho no localStorage. */
export const CHAVE_RASCUNHO = 'especialidade:draft';

/**
 * Remove caracteres não permitidos e trunca em MAX_ESPECIALIDADE.
 * @param {string} valorBruto
 * @returns {{ valor: string, removeuInvalidos: boolean, truncou: boolean }}
 */
export function sanitizarEspecialidade(valorBruto) { /* ... */ }

/**
 * Verifica obrigatoriedade (após trim).
 * @param {string} valor
 * @returns {boolean} true se válido (não vazio).
 */
export function validarObrigatorio(valor) { /* ... */ }
```

**Contrato**:
- `sanitizarEspecialidade` NUNCA retorna string com caracteres inválidos nem com
  comprimento > 255. Sinaliza via flags se houve remoção/truncagem (para exibir aviso).
- `validarObrigatorio('   ')` retorna `false` (trim aplicado).

## Componente `CampoTexto` (extensão aditiva)

Props existentes: `label`, `placeholder`, `valor`, `aoAlterado`, `obrigatorio`.

Nova prop **opcional** (aditiva):

| Prop | Tipo | Default | Efeito |
|------|------|---------|--------|
| `id` | string | `undefined` | Quando fornecida, define `input id={id}` e `label htmlFor={id}`. Sem ela, comportamento inalterado. |

**Compatibilidade**: chamadas existentes (sem `id`) permanecem idênticas.

## Componente `Formulario` (adições internas)

- Renderiza `<CampoTexto label="Especialidade *" placeholder="Digite a especialidade"
  obrigatorio={true} id="especialidade" valor={especialidade}
  aoAlterado={aoAlterarEspecialidade} />` imediatamente após o campo "Cargo".
- Renderiza a mensagem de erro/aviso (quando houver) logo abaixo, em elemento com
  `role="alert"` e classe de erro (texto vermelho).
- No envio: valida obrigatoriedade; se inválido, previne submit, define erro e foca o
  campo; se válido, inclui `especialidade` no objeto do colaborador, limpa o campo e
  remove o rascunho do `localStorage`.
- Contrato de saída (objeto do colaborador) passa a incluir `especialidade`.

## Componente `Time` (repasse aditivo)

- Passa `especialidade={colaborador.especialidade}` ao `Colaborador`. Demais props
  inalteradas.

## Componente `Colaborador` (exibição aditiva)

Nova prop **opcional**:

| Prop | Tipo | Default | Efeito |
|------|------|---------|--------|
| `especialidade` | string | `undefined` | Quando presente e não vazio, renderiza "Especialidade: {valor}" abaixo do cargo; caso contrário, omite a linha. |

**Compatibilidade**: sem `especialidade`, o card renderiza como hoje.
