import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from './NavigationItem.module.css';
import SidedrawerStateManager from '../../../../SidedrawerStateManager/SidedrawerStateManager';

const NavigationItem = (props) => {
    const context = useContext(SidedrawerStateManager);

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