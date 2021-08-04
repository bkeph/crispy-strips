import CSSModules from './Sidedrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../Logo/Logo';
import Menu from '../../Menu/Menu';

const Sidedrawer = () => {
    return (
        <div className = {CSSModules.Sidedrawer}>

            <div className = {CSSModules.MenuAndLogoContainer}>
                <Menu />
                <Logo />
            </div>

            <div className = {CSSModules.ButtonsContainer}>
                <NavigationItems />
            </div>
        </div>
    );
};

export default Sidedrawer;