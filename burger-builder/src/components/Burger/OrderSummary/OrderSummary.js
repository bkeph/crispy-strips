import CSSModule from './OrderSummary.module.css';
import Burger from '../Burger';
import Button from '../../IngredientControls/IngredientControl/Button/Button';
import { useContext } from "react";
import StateManager from '../../StateManager/StateManager';


const buttonAdjacentStyling = {
    margin: "0 10px",
    padding: "6px 18px",
    flexGrow: 1
}

const OrderSummary = (props) => {

    const context = useContext(StateManager);

    const listIngredients = () => {
        let checkoutModalData = [];

        for (const key in props.ingredients) {
            if (Object.hasOwnProperty.call(props.ingredients, key) && props.ingredients[key] !== 0) {
                checkoutModalData.push (
                    <div className = {CSSModule.ingredientGroup} key = {`${key}${props.ingredients[key]}`}>
                        <div className = {CSSModule.ingredientName} style = {{textTransform: 'capitalize'}}>
                            {key}
                        </div>

                        <div className = {CSSModule.ingredientQuantity}> 
                            {props.ingredients[key]}
                        </div>
                    </div>
                );
            }
        }
        return checkoutModalData;
    };

    return(
        <div className = {CSSModule.OrderSummary}>

            {/* Modal title */}
            <div className = {CSSModule.Title}>
                Order Summary
            </div>

            <div className = {CSSModule.Wrapper}>

                {/* Burger picture */}
                <Burger 
                    ingredients = {props.ingredients}
                    finalSnapshot = {true}/>

                {/* List of ingredients */}
                {listIngredients()}

                {/* Final price */}
                <div className = {CSSModule.priceData}>
                    <div className = {CSSModule.priceLabel}>
                        Price
                    </div>

                    <div>
                        {context.totalPrice} $
                    </div>
                </div>
            </div>

            {/* Wrapper of buttons */}
            <div className = {CSSModule.ButtonsWrapper}>
                {/* Close button */}
                <Button
                    style = {buttonAdjacentStyling}
                    onClick = {context.displayModalHandler}>
                    Close
                </Button>

                {/* Order button */}
                <Button
                    style = {{...buttonAdjacentStyling, backgroundImage: "linear-gradient(rgba(186, 255, 130, 0.5), rgba(30, 255, 0, 0.25))"}}>
                    Order
                </Button>
            </div>

            
        </div>
    );
};

export default OrderSummary;