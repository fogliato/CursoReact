/**
 * Utilitários de validação e persistência do campo "Especialidade".
 * Funções puras e determinísticas — testáveis isoladamente.
 */

/** Comprimento máximo permitido para a especialidade. */
export const MAX_ESPECIALIDADE = 255;

/** Mensagens de validação (fonte única de verdade). */
export const MENSAGENS = {
  obrigatorio: 'O campo Especialidade é obrigatório',
  limite: 'Especialidade não deve ultrapassar 255 caracteres',
  invalido: 'Especialidade contém caracteres inválidos',
};

/** Chave do rascunho no localStorage. */
export const CHAVE_RASCUNHO = 'especialidade:draft';

// Conjunto permitido: letras (incl. acentuadas), números, espaço e - / , ( ) . +
const CARACTERES_INVALIDOS = /[^0-9A-Za-zÀ-ÖØ-öø-ÿ \-/,().+]/g;

/**
 * Remove caracteres não permitidos e trunca em MAX_ESPECIALIDADE.
 * @param {string} valorBruto Valor digitado/colado pelo usuário.
 * @returns {{ valor: string, removeuInvalidos: boolean, truncou: boolean }}
 *   Valor sanitizado e flags indicando se houve remoção/truncagem.
 */
export function sanitizarEspecialidade(valorBruto) {
  const entrada = typeof valorBruto === 'string' ? valorBruto : '';
  const semInvalidos = entrada.replace(CARACTERES_INVALIDOS, '');
  const removeuInvalidos = semInvalidos.length !== entrada.length;

  const truncou = semInvalidos.length > MAX_ESPECIALIDADE;
  const valor = truncou ? semInvalidos.slice(0, MAX_ESPECIALIDADE) : semInvalidos;

  return { valor, removeuInvalidos, truncou };
}

/**
 * Verifica a obrigatoriedade da especialidade (após trim).
 * @param {string} valor Valor atual do campo.
 * @returns {boolean} true se válido (não vazio após remover espaços).
 */
export function validarObrigatorio(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}
