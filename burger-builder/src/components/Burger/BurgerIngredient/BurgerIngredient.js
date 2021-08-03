import CSSModule from '../BurgerIngredient/BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const burgerIngredient = props => {
    let ingredient = null;

    switch(props.type) {
        case('bread-bottom'):
            ingredient = <div 
                className = {CSSModule.BreadBottom}></div>;
            break;

        case('bread-top'):
            ingredient = (
                <div className = {CSSModule.BreadTop}>
                    <div className = {CSSModule.Seeds1}></div>
                    <div className = {CSSModule.Seeds2}></div>
                </div>
            );
            break;

        case('meat'):
            ingredient = <div className = {CSSModule.Meat}></div>;
            break;

        case('cheese'):
            ingredient = <div className = {CSSModule.Cheese}></div>;
            break;

        case('salad'):
            ingredient = <div className = {CSSModule.Salad}></div>;
            break;

        case('bacon'):
            ingredient = <div className = {CSSModule.Bacon}></div>;
            break;

        default:
            ingredient = null;
    }

    return ingredient;
};

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default burgerIngredient;