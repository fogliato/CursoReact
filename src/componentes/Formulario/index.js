import { useState, useEffect } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import { validateEspecialidade } from '../../utils/validation'
import { persistFormState, loadFormState, clearFormState } from '../../utils/storageUtils'
import './Formulario.css'

const Formulario = (props) => {
    const [nome, setNome] = useState('')
    const [cargo, setCargo] = useState('')
    const [imagem, setImagem] = useState('')
    const [time, setTime] = useState('')
    const [especialidade, setEspecialidade] = useState('')
    const [erroEspecialidade, setErroEspecialidade] = useState('')

    // Load form state from localStorage on component mount (T009)
    useEffect(() => {
        const savedState = loadFormState()
        if (savedState) {
            setNome(savedState.nome || '')
            setCargo(savedState.cargo || '')
            setImagem(savedState.imagem || '')
            setTime(savedState.time || '')
            setEspecialidade(savedState.especialidade || '')
        }
    }, [])

    // Handle especialidade change with error auto-clear
    const handleEspecialidadeChange = (valor) => {
        setEspecialidade(valor)
        // Clear error when field becomes non-empty and valid
        if (valor && valor.trim() !== '') {
            const validacao = validateEspecialidade(valor)
            if (validacao.isValid) {
                setErroEspecialidade('')
            }
        }
    }

    // Handle form reset (T011)
    const handleReset = () => {
        setNome('')
        setCargo('')
        setImagem('')
        setTime('')
        setEspecialidade('')
        setErroEspecialidade('')
        clearFormState()
    }

    const aoSalvar = (evento) => {
        evento.preventDefault()
        
        // Validate especialidade field
        const validacao = validateEspecialidade(especialidade)
        if (!validacao.isValid) {
            setErroEspecialidade(validacao.error)
            return
        }

        const novoColaborador = {
            nome,
            cargo,
            imagem,
            time,
            especialidade
        }

        // Persist form state to localStorage (T010)
        persistFormState(novoColaborador)

        props.aoColaboradorCadastrado(novoColaborador)
        
        // Reset form after successful submission
        handleReset()
    }

    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para criar o card do colaborador</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite o seu nome"
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Cargo"
                    placeholder="Digite o seu cargo"
                    valor={cargo}
                    aoAlterado={valor => setCargo(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Especialidade"
                    placeholder="Digite a sua especialidade"
                    valor={especialidade}
                    aoAlterado={handleEspecialidadeChange}
                />
                {erroEspecialidade && <span className="erro">{erroEspecialidade}</span>}
                <CampoTexto
                    label="Imagem"
                    placeholder="Digite o endereço da imagem"
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)}
                />
                <ListaSuspensa
                    obrigatorio={true}
                    itens={props.times}
                    label="Times"
                    valor={time}
                    aoAlterado={valor => setTime(valor)}
                />
                <Botao>Criar Card</Botao>
                <button type="button" onClick={handleReset} style={{ marginLeft: '10px', padding: '10px 30px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Limpar Formulário</button>
            </form>
        </section>
    )
}
export default Formulario