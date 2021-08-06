import CSSModule from './Backdrop.module.css';


// const Backdrop = (props) => props.showBackdrop 
//         ? <div className = {CSSModule.Backdrop} onClick = {props.onClick} /> 
//         : null;

const Backdrop = (props) => {
    return props.showBackdrop 
        ? <div className = {CSSModule.Backdrop} onClick = {props.onClick} style = {{ zIndex: props.zIndex }} />
        : null;
}


        
export default Backdrop;