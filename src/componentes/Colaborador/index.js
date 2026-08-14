import './Colaborador.css'

/**
 * Card de um colaborador.
 * @param {object} props
 * @param {string} [props.especialidade] Exibida abaixo do cargo; a linha é omitida quando ausente/vazia.
 */
const Colaborador = ({corDeFundo, nome, cargo, imagem, especialidade}) => {
    return (<div className='colaborador'>
        <div className='cabecalho' style={{ backgroundColor: corDeFundo }}>
            <img src={imagem} alt={nome}/>
        </div>
        <div className='rodape'>
            <h4>{nome}</h4>
            <h5>{cargo}</h5>
            {especialidade && especialidade.trim() && (
                <h6 className='especialidade'>Especialidade: {especialidade}</h6>
            )}
        </div>
    </div>)
}

export default Colaborador