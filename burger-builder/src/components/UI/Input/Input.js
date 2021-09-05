import CSSModule from './Input.module.css';

const Input = (props) => {
    return(
        <div className = {CSSModule.Input}>
            <label>{props.label}</label>
            <input {...props} />
        </div>
    );
}

export default Input;