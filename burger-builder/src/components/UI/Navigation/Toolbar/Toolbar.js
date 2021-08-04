import CSSModule from './Toolbar.module.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../../Menu/Menu';
import StateManager from '../../../StateManager/StateManager';
import { useContext } from 'react';

const Toolbar = () => {
    const context = useContext(StateManager);
    return (
        <header className = {CSSModule.Toolbar}>
            <Menu />

            {/* TO DO: Hide when (max-width: 400px) */}
            <Logo /> 
            <nav className = {CSSModule.NavigationItems}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default Toolbar;