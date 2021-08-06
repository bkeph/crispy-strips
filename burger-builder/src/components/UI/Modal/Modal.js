import CSSModule from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { Fragment } from 'react';

const Modal = (props) => (
    <Fragment>
        <div 
            className = {CSSModule.Modal}
            style = {{
                opacity: props.showModal ? "100" : "0",
                transform: props.showModal ? "translate(-50%, 0vh)" : "translate(-50%, -100vh)"
            }}>
                {props.children}
        </div>

        <Backdrop 
            showBackdrop = {props.showModal}
            onClick = {props.displayModalHandler}
            zIndex = {1}/>
    </Fragment>
);

export default Modal;