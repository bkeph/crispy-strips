import LogoPath from '../../assets/images/Logo.png';
import CSSModule from './Logo.module.css';

const Logo = () => {
    return (
        <div className = {CSSModule.Logo}>
            <img src = {LogoPath} alt = {"Burger Builder Logo"}/>
        </div>
    ); 
};

export default Logo;