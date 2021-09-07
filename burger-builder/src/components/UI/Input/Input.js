import CSSModule from './Input.module.css';

const Input = (props) => {
    const inputFieldClasses = [CSSModule.Input];
    if(props.isinvalid === true)
        inputFieldClasses.push(CSSModule.Invalid);

    return(
        <div className = {CSSModule.InputContainer}>
            <label>{props.label}</label>
            <input className = {inputFieldClasses.join(" ")} {...props}/>
        </div>
    );
}

export default Input;