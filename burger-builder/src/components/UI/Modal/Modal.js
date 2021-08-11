import CSSModule from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { Fragment, useEffect } from 'react';
import React from 'react';

const Modal = (props) => {
    //Render Modal only when showModal changes
    useEffect(() => {
        // console.log("[Modal.js] useEffect (componentDidUpdate)");
    }, [props.showModal]);

    return (
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
}

// instead of exporting the component; used for avoiding useless rerendering when the components contained inside do not change
export default React.memo(Modal);