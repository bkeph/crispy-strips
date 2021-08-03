import IngredientControl from "./IngredientControl/IngredientControl";
import CSSModule from './IngredientControls.module.css';
import StateManager from '../StateManager/StateManager';
import Button from "./IngredientControl/Button/Button";
import { useContext } from "react";

const IngredientControls = () => {
    const context = useContext(StateManager);
    let controlsForIngredients = [];

    for (const key in context.ingredients) {
        if (context.ingredients.hasOwnProperty(key)) {
            controlsForIngredients.push(
                <IngredientControl  
                    // Capitalize first letter of ingredient
                    ingredient = {key[0].toUpperCase() + key.slice(1)}
                    key = {key}/>
            );
        }
    }

    const disabled = context.isPurchasable
        ? ""
        : { disabled: "disabled" };

    const adjacentStyling = {
        padding: "6px 18px",
        margin: "0 18px 20px auto"
    };

    return (
        <div className = {CSSModule.IngredientControls}>
            {controlsForIngredients}
            <div className = {CSSModule.priceData}>
                <div className = {CSSModule.priceLabel}>Price</div>
                <div>{context.totalPrice} $</div>
            </div>

            <Button
                disabled = {disabled}
                style = {adjacentStyling}
                onClick = {context.displayModalHandler}>
                    Checkout
            </Button>

        </div>
    );
};

export default IngredientControls;