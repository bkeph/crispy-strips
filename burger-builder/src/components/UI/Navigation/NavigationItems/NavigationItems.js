import { useContext } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import CSSModule from './NavigationItems.module.css';
import SidedrawerStateManager from '../../../SidedrawerStateManager/SidedrawerStateManager';

const NavigationItems = (props) => {
    const context = useContext(SidedrawerStateManager);

    const auth = context.isAuthenticated
        ?   (
            <NavigationItem onClick = {props.onClick} path = {"/logout"}>
                Logout
            </NavigationItem>
        )
        :   (
            <NavigationItem onClick = {props.onClick} path = {"/auth"}>
                Authentication
            </NavigationItem>
        );

    return (
        <ul className = {CSSModule.NavigationItems}>
            <NavigationItem onClick = {props.onClick} path = {"/"}>
                BurgerBuilder
            </NavigationItem>
    
            <NavigationItem onClick = {props.onClick} path = {"/orders"}>
                Orders
            </NavigationItem>

            {auth}

        </ul>
    );
};

export default NavigationItems;