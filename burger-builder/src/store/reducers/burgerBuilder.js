import * as actions from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initialState = {
    ingredients: null, 
    ingredients_prices: null,
    totalPrice: null,
    error: false,
    pathFromAuth: "/",
    building: false
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
        totalPrice: round(state.totalPrice + state.ingredients_prices[action.ingredientToUpdate]),
        building: true
    });
};

const removeIngredient = (state, action) => {
    return updateState(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredientToUpdate]: state.ingredients[action.ingredientToUpdate] - 1
        },
        totalPrice: round(state.totalPrice - state.ingredients_prices[action.ingredientToUpdate]),
        building: true
    });
};

const initIngredients = (state, action) => {
    return updateState(state, {
        error: action.error,
        ...action.initialState,
        building: false,
        pathFromAuth: "/"
    });
};

const setAuthReturnPath = (state, action) => {
    return updateState(state, {
        pathFromAuth: action.path
    });
}

const burgerBuilder = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actions.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        case actions.INIT_INGREDIENTS:
            return initIngredients(state, action);

        case actions.SET_AUTH_RETURN_PATH:
            return setAuthReturnPath(state, action);

        default:
            return state;
    }
};

export default burgerBuilder;