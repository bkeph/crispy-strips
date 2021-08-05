import CSSModule from './Toolbar.module.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../../Menu/Menu';
import SidedrawerStateManager from '../../../SidedrawerStateManager/SidedrawerStateManager';
import { useContext } from 'react';

const Toolbar = () => {
    const context = useContext(SidedrawerStateManager);
    return (
        <header className = {CSSModule.Toolbar}>
            <div className = {CSSModule.Menu}>
                <Menu 
                    onClick = {context.displaySidedrawerHandler} />
            </div>

            <Logo /> 
            
            <nav className = {CSSModule.NavigationItems}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default Toolbar;