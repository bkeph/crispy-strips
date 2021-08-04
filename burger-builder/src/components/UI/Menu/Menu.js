import MenuIcon from '../../../assets/icons/menu.svg';
import CSSModule from './Menu.module.css';

const Menu = (props) => (
    <img 
        src = {MenuIcon} 
        className = {CSSModule.Menu} 
        alt = "Menu"
        onClick = {props.onClick} />
);

export default Menu;