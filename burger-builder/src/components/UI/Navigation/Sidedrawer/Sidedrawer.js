import CSSModule from './Sidedrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../Logo/Logo';
import Menu from '../../Menu/Menu';
import SidedrawerStateManager from '../../../SidedrawerStateManager/SidedrawerStateManager';
import { useContext } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import { Fragment } from 'react';

const Sidedrawer = () => {
    const context = useContext(SidedrawerStateManager);
    return (
        <Fragment>
            <div className = {[CSSModule.Sidedrawer, context.showSidedrawer 
                ? CSSModule.OpenSidedrawer 
                : CSSModule.CloseSidedrawer].join(' ')}>
    
                <div className = {CSSModule.MenuAndLogoContainer}>
                    <Menu onClick = {context.displaySidedrawerHandler} />
                    <Logo />
                </div>
    
                <div className = {CSSModule.ButtonsContainer}>
                    <NavigationItems onClick = {() => context.displaySidedrawerHandler()}/>
                </div>
            </div>
    
            <div className = {CSSModule.Backdrop}>
                <Backdrop 
                    showBackdrop = {context.showSidedrawer}
                    onClick = {context.displaySidedrawerHandler}
                    zIndex = {3} />
            </div>
        </Fragment>
    );
};

export default Sidedrawer;