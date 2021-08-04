import CSSModule from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { Fragment } from 'react';

const Modal = (props) => (
    <Fragment>
        <div 
            className = {CSSModule.Modal}
            style = {{
                opacity: props.visible ? "100" : "0",
                transform: props.visible ? "translate(-50%, 0vh)" : "translate(-50%, -100vh)"
            }}>
                {props.children}
        </div>

        <Backdrop 
            showBackdrop = {props.visible}
            onClick = {props.displayModalHandler}/>
    </Fragment>
);

export default Modal;