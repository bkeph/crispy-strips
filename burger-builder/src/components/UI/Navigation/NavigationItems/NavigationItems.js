import NavigationItem from "./NavigationItem/NavigationItem";
import CSSModule from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className = {CSSModule.NavigationItems}>
        <NavigationItem /* active */ path = {"/"}>
            BurgerBuilder
        </NavigationItem>

        <NavigationItem path = {"/checkout"}>
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;