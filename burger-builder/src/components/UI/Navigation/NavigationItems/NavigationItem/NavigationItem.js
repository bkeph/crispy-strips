import CSSModules from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className = {CSSModules.NavigationItem}>
        <a
            href = {props.link}
            className = {props.active ? CSSModules.active : null}>
                {props.children}
        </a>
    </li>
);

export default navigationItem;