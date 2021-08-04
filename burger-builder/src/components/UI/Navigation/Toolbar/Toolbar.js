import CSSModule from './Toolbar.module.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
    return (
        <header className = {CSSModule.Toolbar}>
            <div>Menu</div>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;