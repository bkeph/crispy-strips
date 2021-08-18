import { NavLink } from 'react-router-dom';
import CSSModules from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className = {CSSModules.NavigationItem}>
        {/* <a
            href = {props.path}
            className = {props.active ? CSSModules.active : null}>
                {props.children}
        </a> */}

        <NavLink 
            to = {props.path}
            activeClassName = {CSSModules.active}>
                {props.children}
        </NavLink>

    </li>
);

export default navigationItem;