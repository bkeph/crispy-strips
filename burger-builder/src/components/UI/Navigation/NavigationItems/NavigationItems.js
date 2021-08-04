import NavigationItem from "./NavigationItem/NavigationItem";
import CSSModule from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className = {CSSModule.NavigationItems}>
        <NavigationItem active link = {"/"}>
            BurgerBuilder
        </NavigationItem>

        <NavigationItem link = {"/"}>
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;