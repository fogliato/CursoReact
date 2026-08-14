import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Formulario from './index'

const setup = () => {
  const aoColaboradorCadastrado = jest.fn()
  render(
    <Formulario
      times={['Front-End', 'Mobile']}
      aoColaboradorCadastrado={aoColaboradorCadastrado}
    />
  )
  return { aoColaboradorCadastrado }
}

// Preenche os demais campos obrigatórios (com required nativo) para que o envio
// alcance a validação customizada da especialidade.
const preencherOutrosCampos = () => {
  userEvent.type(screen.getByPlaceholderText(/Digite o seu nome/i), 'Ana')
  userEvent.type(screen.getByPlaceholderText(/Digite o seu cargo/i), 'Dev')
  userEvent.selectOptions(screen.getByRole('combobox'), 'Front-End')
}

beforeEach(() => {
  localStorage.clear()
})

// US1 - T004
describe('US1: campo de especialidade', () => {
  test('renderiza o campo "Especialidade *" abaixo do campo "Cargo"', () => {
    setup()
    const especialidade = screen.getByLabelText(/Especialidade/i)
    expect(especialidade).toBeInTheDocument()

    const cargo = screen.getByPlaceholderText(/Digite o seu cargo/i)
    const posicao = cargo.compareDocumentPosition(especialidade)
    // eslint-disable-next-line no-bitwise
    expect(posicao & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})

// US2 - T011
describe('US2: validação da especialidade', () => {
  test('bloqueia o envio e mostra erro de obrigatório quando vazio', async () => {
    const { aoColaboradorCadastrado } = setup()
    preencherOutrosCampos()

    userEvent.click(screen.getByRole('button', { name: /Criar Card/i }))

    expect(aoColaboradorCadastrado).not.toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'O campo Especialidade é obrigatório'
      )
    )
  })

  test('trata apenas espaços como vazio', async () => {
    const { aoColaboradorCadastrado } = setup()
    preencherOutrosCampos()

    userEvent.type(screen.getByLabelText(/Especialidade/i), '   ')
    userEvent.click(screen.getByRole('button', { name: /Criar Card/i }))

    expect(aoColaboradorCadastrado).not.toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'O campo Especialidade é obrigatório'
      )
    )
  })

  test('bloqueia caracteres inválidos e exibe aviso', () => {
    setup()
    const campo = screen.getByLabelText(/Especialidade/i)

    userEvent.type(campo, 'Dev@#$')

    expect(campo).toHaveValue('Dev')
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Especialidade contém caracteres inválidos'
    )
  })

  test('o erro some quando um valor válido é inserido', async () => {
    setup()
    preencherOutrosCampos()

    userEvent.click(screen.getByRole('button', { name: /Criar Card/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())

    userEvent.type(screen.getByLabelText(/Especialidade/i), 'Backend')
    await waitFor(() =>
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    )
  })
})

// US1 - T005 (submit inclui especialidade) + US3 - T016 (persistência)
describe('US1/US3: envio e persistência', () => {
  test('inclui a especialidade no colaborador e limpa o campo no envio', async () => {
    const { aoColaboradorCadastrado } = setup()

    userEvent.type(screen.getByPlaceholderText(/Digite o seu nome/i), 'Ana')
    userEvent.type(screen.getByPlaceholderText(/Digite o seu cargo/i), 'Dev')
    userEvent.type(screen.getByLabelText(/Especialidade/i), 'Backend')
    userEvent.selectOptions(screen.getByRole('combobox'), 'Front-End')
    userEvent.click(screen.getByRole('button', { name: /Criar Card/i }))

    expect(aoColaboradorCadastrado).toHaveBeenCalledWith(
      expect.objectContaining({ especialidade: 'Backend' })
    )
    await waitFor(() =>
      expect(screen.getByLabelText(/Especialidade/i)).toHaveValue('')
    )
    expect(localStorage.getItem('especialidade:draft')).toBeNull()
  })

  test('persiste o rascunho no localStorage a cada digitação', () => {
    setup()

    userEvent.type(screen.getByLabelText(/Especialidade/i), 'QA')
    expect(localStorage.getItem('especialidade:draft')).toBe('QA')
  })

  test('restaura o rascunho do localStorage no mount', () => {
    localStorage.setItem('especialidade:draft', 'DevOps')
    setup()
    expect(screen.getByLabelText(/Especialidade/i)).toHaveValue('DevOps')
  })
})
