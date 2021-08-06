import CSSModules from './Sidedrawer.module.css';
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
            <div className = {[CSSModules.Sidedrawer, context.showSidedrawer 
                ? CSSModules.OpenSidedrawer 
                : CSSModules.CloseSidedrawer].join(' ')}>
    
                <div className = {CSSModules.MenuAndLogoContainer}>
                    <Menu onClick = {context.displaySidedrawerHandler} />
                    <Logo />
                </div>
    
                <div className = {CSSModules.ButtonsContainer}>
                    <NavigationItems />
                </div>
            </div>
    
            <Backdrop 
                showBackdrop = {context.showSidedrawer}
                onClick = {context.displaySidedrawerHandler}
                zIndex = {3} />
        </Fragment>
    );
};

export default Sidedrawer;