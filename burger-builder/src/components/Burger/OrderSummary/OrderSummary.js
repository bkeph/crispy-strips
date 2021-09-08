import CSSModule from './OrderSummary.module.css';
import Burger from '../Burger';
import Button from '../../UI/Button/Button';
import { useEffect } from "react";


const buttonAdjacentStyling = {
    margin: "0 10px",
    padding: "6px 18px",
    flexGrow: 1
}

const OrderSummary = (props) => {
    const listIngredients = () => {
        let ingredientsSelected = [];

        for (const key in props.ingredients) {
            if (Object.hasOwnProperty.call(props.ingredients, key)) {
                if(props.ingredients[key] !== 0) {
                    ingredientsSelected.push (
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
        }
        return ingredientsSelected;
    };

    //Render OrderSummary only when modal is shown
    useEffect(() => {
        // console.log("[OrderSummary.js] useEffect");
    }, [props.showModal]);

    return(
        <div className = {CSSModule.OrderSummary}>

            {/* Modal title */}
            <div className = {CSSModule.Title}>
                {props.title}
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
                        {props.totalPrice} $
                    </div>
                </div>
            </div>

            {/* Wrapper of buttons */}
            <div className = {CSSModule.ButtonsWrapper}>
                {/* Close button */}
                <Button
                    style = {buttonAdjacentStyling}
                    onClick = {props.closeBtnAction}>
                    {props.closeBtnText}
                </Button>

                {/* Order button */}
                <Button
                    style = {buttonAdjacentStyling}
                    onClick = {props.goBtnAction}
                    isGoButton={true}>
                    {props.goBtnText}
                </Button>
            </div>

            
        </div>
    );
};

export default OrderSummary;