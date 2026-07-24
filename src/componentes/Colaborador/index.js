import './Colaborador.css'

/**
 * Colaborador component displays an employee card
 * @param {Object} props - Component props
 * @param {string} props.corDeFundo - Background color for the header
 * @param {string} props.nome - Employee name
 * @param {string} props.cargo - Employee position/role
 * @param {string} props.imagem - Employee image URL
 * @param {string} [props.especialidade] - Employee specialty (optional)
 */
const Colaborador = ({corDeFundo, nome, cargo, imagem, especialidade}) => {
    return (<div className='colaborador'>
        <div className='cabecalho' style={{ backgroundColor: corDeFundo }}>
            <img src={imagem} alt={nome}/>
        </div>
        <div className='rodape'>
            <h4>{nome}</h4>
            <h5>{cargo}</h5>
            {especialidade && <p className="especialidade">Especialidade: {especialidade}</p>}
        </div>
    </div>)
}

export default Colaborador