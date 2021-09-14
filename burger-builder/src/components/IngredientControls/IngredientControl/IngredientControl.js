import { useContext } from 'react';
import CSSModule from './IngredientControl.module.css';
import StateManager from '../../StateManager/StateManager';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';

const IngredientControl = props => {
    const context = useContext(StateManager);
    const disabled = props.ingredients[props.ingredient.toLowerCase()]
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
                        {props.ingredients[props.ingredient.toLowerCase()]}
                    </div>
            </div>
            <Button 
                onClick = {() => context.addIngredient(props.ingredient.toLowerCase())}>
                    +
            </Button>
            <Button 
                onClick = {() => context.removeIngredient(props.ingredient.toLowerCase())}
                disabled = {disabled}>
                    −
            </Button>
        </div>
    );
};

const mapStateToProps = state => ({
    ingredients: state.ingredients
});

export default connect(mapStateToProps)(IngredientControl);