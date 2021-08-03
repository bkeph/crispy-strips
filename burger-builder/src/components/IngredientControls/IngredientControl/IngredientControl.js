import { useContext } from 'react';
import CSSModule from './IngredientControl.module.css';
import StateManager from '../../StateManager/StateManager';
import Button from '../../UI/Button/Button';

const IngredientControl = props => {
    const context = useContext(StateManager);
    const disabled = context.ingredients[props.ingredient.toLowerCase()]
        ? ""
        : {disabled: "disabled"};

    return (
        <div className = {CSSModule.ingredientGroup}>
            <div 
                className = {CSSModule.ingredientDetails}>
                    <div className = {CSSModule.ingredientName}>
                        {props.ingredient}
                    </div>
                    <div className = {CSSModule.ingredientQuantity}> 
                        {context.ingredients[props.ingredient.toLowerCase()]}
                    </div>
            </div>
            <Button 
                onClick = {() => context.ingredientHandler("+", props.ingredient.toLowerCase())}>
                    +
            </Button>
            <Button 
                onClick = {() => context.ingredientHandler("-", props.ingredient.toLowerCase())}
                disabled = {disabled}>
                    −
            </Button>
        </div>
    );
};

export default IngredientControl;