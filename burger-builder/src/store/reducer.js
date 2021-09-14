import * as actions from './actions';

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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_INGREDIENT:
            console.log(state.ingredients);
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientToUpdate]: state.ingredients[action.ingredientToUpdate] + 1
                },
                totalPrice: round(state.totalPrice + state.ingredients_prices[action.ingredientToUpdate])
            };

        case actions.REMOVE_INGREDIENT:
            console.log(state.ingredients);
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientToUpdate]: state.ingredients[action.ingredientToUpdate] - 1
                },
                totalPrice: round(state.totalPrice - state.ingredients_prices[action.ingredientToUpdate])
            };

        default:
            return state;
    }
};

export default reducer;