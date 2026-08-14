import {
  MAX_ESPECIALIDADE,
  sanitizarEspecialidade,
  validarObrigatorio,
} from './especialidade';

describe('sanitizarEspecialidade', () => {
  test('mantém caracteres permitidos (letras, números, pontuação comum)', () => {
    const { valor, removeuInvalidos, truncou } = sanitizarEspecialidade(
      'C++, Node.js e QA/QC (backend) - nível 2'
    );
    expect(valor).toBe('C++, Node.js e QA/QC (backend) - nível 2');
    expect(removeuInvalidos).toBe(false);
    expect(truncou).toBe(false);
  });

  test('remove caracteres inválidos e sinaliza a remoção', () => {
    const { valor, removeuInvalidos } = sanitizarEspecialidade('Dev@ #Back$end');
    expect(valor).toBe('Dev Backend');
    expect(removeuInvalidos).toBe(true);
  });

  test('trunca em 255 caracteres e sinaliza a truncagem', () => {
    const entrada = 'a'.repeat(300);
    const { valor, truncou } = sanitizarEspecialidade(entrada);
    expect(valor).toHaveLength(MAX_ESPECIALIDADE);
    expect(truncou).toBe(true);
  });

  test('não trunca quando o comprimento é exatamente 255', () => {
    const entrada = 'b'.repeat(255);
    const { valor, truncou } = sanitizarEspecialidade(entrada);
    expect(valor).toHaveLength(255);
    expect(truncou).toBe(false);
  });

  test('trata entrada não-string como vazia', () => {
    expect(sanitizarEspecialidade(undefined).valor).toBe('');
    expect(sanitizarEspecialidade(null).valor).toBe('');
  });
});

describe('validarObrigatorio', () => {
  test('retorna false para string vazia', () => {
    expect(validarObrigatorio('')).toBe(false);
  });

  test('retorna false para apenas espaços em branco', () => {
    expect(validarObrigatorio('   ')).toBe(false);
  });

  test('retorna true para valor não vazio', () => {
    expect(validarObrigatorio('Backend')).toBe(true);
  });

  test('retorna false para entrada não-string', () => {
    expect(validarObrigatorio(undefined)).toBe(false);
  });
});
