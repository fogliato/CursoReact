import { useEffect, useRef, useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import {
    CHAVE_RASCUNHO,
    MENSAGENS,
    sanitizarEspecialidade,
    validarObrigatorio,
} from '../../utils/especialidade'
import './Formulario.css'

const lerRascunho = () => {
    try {
        return localStorage.getItem(CHAVE_RASCUNHO) || ''
    } catch {
        return ''
    }
}

const Formulario = (props) => {
    const [nome, setNome] = useState('')
    const [cargo, setCargo] = useState('')
    const [imagem, setImagem] = useState('')
    const [time, setTime] = useState('')
    const [especialidade, setEspecialidade] = useState(lerRascunho)
    const [erroEspecialidade, setErroEspecialidade] = useState(null)
    const especialidadeWrapperRef = useRef(null)

    // Persiste o rascunho da especialidade a cada alteração.
    useEffect(() => {
        try {
            if (especialidade) {
                localStorage.setItem(CHAVE_RASCUNHO, especialidade)
            } else {
                localStorage.removeItem(CHAVE_RASCUNHO)
            }
        } catch {
            // Armazenamento indisponível: ignora silenciosamente.
        }
    }, [especialidade])

    const aoAlterarEspecialidade = (valorBruto) => {
        const { valor, removeuInvalidos, truncou } = sanitizarEspecialidade(valorBruto)
        setEspecialidade(valor)

        if (removeuInvalidos) {
            setErroEspecialidade(MENSAGENS.invalido)
        } else if (truncou) {
            setErroEspecialidade(MENSAGENS.limite)
        } else if (validarObrigatorio(valor)) {
            setErroEspecialidade(null)
        }
    }

    const limparEspecialidade = () => {
        setEspecialidade('')
        setErroEspecialidade(null)
        try {
            localStorage.removeItem(CHAVE_RASCUNHO)
        } catch {
            // Ignora indisponibilidade do armazenamento.
        }
    }

    const aoSalvar = (evento) => {
        evento.preventDefault()

        if (!validarObrigatorio(especialidade)) {
            setErroEspecialidade(MENSAGENS.obrigatorio)
            const input = especialidadeWrapperRef.current?.querySelector('input')
            if (input) {
                input.focus()
            }
            return
        }

        props.aoColaboradorCadastrado({
            nome,
            cargo,
            imagem,
            time,
            especialidade,
        })
        setNome('')
        setCargo('')
        setImagem('')
        setTime('')
        limparEspecialidade()
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
                <div ref={especialidadeWrapperRef}>
                    <CampoTexto
                        ariaRequired={true}
                        id="especialidade"
                        label="Especialidade *"
                        placeholder="Digite a especialidade"
                        valor={especialidade}
                        aoAlterado={aoAlterarEspecialidade}
                    />
                    {erroEspecialidade && (
                        <p className="campo-erro" role="alert">{erroEspecialidade}</p>
                    )}
                </div>
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
            </form>
        </section>
    )
}
export default Formulario