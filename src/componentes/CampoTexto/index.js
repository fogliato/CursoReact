import "./CampoTexto.css"

/**
 * Campo de entrada de texto reutilizável.
 * @param {object} props
 * @param {string} [props.id] Quando fornecido, associa `label`↔`input` via `htmlFor`.
 * @param {boolean} [props.obrigatorio] Define o atributo `required` nativo.
 * @param {boolean} [props.ariaRequired] Define `aria-required` sem bloquear o envio nativo.
 */
const CampoTexto = (props) => {
    const placeholderModificada = `${props.placeholder}...`

    const aoDigitado = (evento) =>{
        props.aoAlterado(evento.target.value)
    }
    return (
        <div className="campo-texto">
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} value={props.valor} onChange={aoDigitado} required={props.obrigatorio} aria-required={props.ariaRequired} placeholder={placeholderModificada} />
        </div>
    );
}

export default CampoTexto;