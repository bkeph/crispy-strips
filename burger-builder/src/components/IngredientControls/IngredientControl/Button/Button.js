import CSSModule from './Button.module.css';

const Button = (props) => <button 
    className = {CSSModule.button}
    style = {{...props.style}}
    onClick = {props.onClick}
    {...props.disabled}>
        {props.children}
</button>;

export default Button;