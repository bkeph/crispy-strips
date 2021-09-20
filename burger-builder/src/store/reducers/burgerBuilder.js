import * as actions from '../actions/actionTypes';
import updateState from '../utility/updateState';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    }, 
    ingredients_prices: {
        salad: 0.5,
        bacon: 0.7,
        meat: 1.3,
        cheese: 0.4,
        // base_price: 4
    },
    totalPrice: 4
};

function round(x) {
    return parseFloat(x.toFixed(1));
}

const addIngredient = (state, action) => {
    return updateState(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredientToUpdate]: state.ingredients[action.ingredientToUpdate] + 1
        },
        totalPrice: round(state.totalPrice + state.ingredients_prices[action.ingredientToUpdate])
    });
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientToUpdate]: state.ingredients[action.ingredientToUpdate] - 1
        },
        totalPrice: round(state.totalPrice - state.ingredients_prices[action.ingredientToUpdate])
    };
};

const burgerBuilder = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actions.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        default:
            return state;
    }
};

export default burgerBuilder;