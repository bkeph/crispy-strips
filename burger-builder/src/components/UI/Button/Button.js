import CSSModule from './Button.module.css';

const Button = (props) => {
    const buttonClasses = [CSSModule.Button];

    let style = {...props.style};
    if(props.disabled)
        buttonClasses.push(CSSModule.Disabled);
    else if(props.isGoButton)
        style.backgroundImage = "linear-gradient(rgba(186, 255, 130, 0.5), rgba(30, 255, 0, 0.25))";

    return (
        <button 
            className = {buttonClasses.join(" ")}
            style = {{...style}}
            onClick = {props.onClick}
            {...props.disabled}>
                {props.children}
        </button>
    );
}

export default Button;