import { NavLink } from 'react-router-dom';
import CSSModules from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className = {CSSModules.NavigationItem}>
        <NavLink 
            to = {props.path}
            activeClassName = {CSSModules.active}
            exact>
                {props.children}
        </NavLink>

    </li>
);

export default navigationItem;