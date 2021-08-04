import CSSModules from './Sidedrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Sidedrawer = () => {
    return (
        <div className = {CSSModules.Sidedrawer}>
            <NavigationItems />
            
        </div>
    );
};

export default Sidedrawer;