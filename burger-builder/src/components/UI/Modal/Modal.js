import CSSModule from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { Fragment } from 'react';

const Modal = (props) => {
    console.log(props.displayModalHandler); // TO DELETE
    return(
        <Fragment>
            <div 
                className = {CSSModule.Modal}
                style = {{
                    opacity: props.visible ? "100" : "0",
                    transform: props.visible ? "translateY(0vh)" : "translateY(-100vh)"
                }}>
                    {props.children}
            </div>

            <Backdrop 
                showBackdrop = {props.visible}
                onClick = {props.displayModalHandler}/>
        </Fragment>
    );
};

export default Modal;