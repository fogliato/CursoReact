import { render, screen } from '@testing-library/react'
import Colaborador from './index'

// US1 - T005
describe('US1: exibição da especialidade no card', () => {
  test('exibe "Especialidade: {valor}" quando fornecida', () => {
    render(
      <Colaborador
        corDeFundo="#82CFFA"
        nome="Ana"
        cargo="Dev"
        imagem="ana.png"
        especialidade="Desenvolvedor Backend"
      />
    )
    expect(
      screen.getByText('Especialidade: Desenvolvedor Backend')
    ).toBeInTheDocument()
  })

  test('omite a linha de especialidade quando ausente', () => {
    render(
      <Colaborador corDeFundo="#82CFFA" nome="Ana" cargo="Dev" imagem="ana.png" />
    )
    expect(screen.queryByText(/Especialidade:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/undefined/i)).not.toBeInTheDocument()
  })

  test('omite a linha quando a especialidade é apenas espaços', () => {
    render(
      <Colaborador
        corDeFundo="#82CFFA"
        nome="Ana"
        cargo="Dev"
        imagem="ana.png"
        especialidade="   "
      />
    )
    expect(screen.queryByText(/Especialidade:/i)).not.toBeInTheDocument()
  })
})
