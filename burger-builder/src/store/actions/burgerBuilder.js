import * as actionTypes from './actionTypes'; 
import axiosInstance from '../../axios/axios';

export const addIngredient = (ing) => {
    return({
        type: actionTypes.ADD_INGREDIENT, 
        ingredientToUpdate: ing
    });
};

export const removeIngredient = (ing) => {
    return({
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientToUpdate: ing
    });
};

const initIngredients_Sync = (ingredientsData, error) => {
    return({
        type: actionTypes.INIT_INGREDIENTS,
        initialState: ingredientsData,
        error
    });
};

export const initIngredients = () => {
    return dispatch => {
        axiosInstance.get('/ingredients_prices.json')
            .then((response) => {
                const INGREDIENT_PRICES = response.data;
                
                const INGREDIENTS = (() => {
                    let ingredients = {};
                    for (const key in INGREDIENT_PRICES) {
                        if(key !== "base_price")
                        ingredients[key] = 0;
                    }
                    return ingredients;
                })();

                const ingredientsData = {
                    ingredients_prices: INGREDIENT_PRICES, 
                    ingredients: INGREDIENTS, 
                    totalPrice: INGREDIENT_PRICES.base_price
                };

                dispatch(initIngredients_Sync(ingredientsData, false));
            })
            .catch((error) => {
                dispatch(initIngredients_Sync(null, error))
            });
    }
};

export const setAuthReturnPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_RETURN_PATH,
        path
    };
}