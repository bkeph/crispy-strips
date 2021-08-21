import { NavLink } from 'react-router-dom';
import CSSModules from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className = {CSSModules.NavigationItem}>
            <NavLink 
                onClick = {props.onClick}
                to = {props.path}
                activeClassName = {CSSModules.active}
                exact>
                    {props.children}
            </NavLink>
    
        </li>
    );
}

export default NavigationItem;