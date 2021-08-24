import NavigationItem from "./NavigationItem/NavigationItem";
import CSSModule from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className = {CSSModule.NavigationItems}>
        <NavigationItem onClick = {props.onClick} path = {"/"}>
            BurgerBuilder
        </NavigationItem>

        <NavigationItem onClick = {props.onClick} path = {"/checkout"}>
            Checkout
        </NavigationItem>

        <NavigationItem onClick = {props.onClick} path = {"/orders"}>
            Orders
        </NavigationItem>
    </ul>
);

export default navigationItems;