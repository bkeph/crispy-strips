import { Component, Fragment } from "react";
import Burger from '../../components/Burger/Burger';
import IngredientControls from '../../components/IngredientControls/IngredientControls';
import StateManager from '../../components/StateManager/StateManager';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner'; // TO DELETE


const INGREDIENT_PRICES = {
    base_price: 4, // do not delete
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const INGREDIENTS = (function addIngredientsToState() {
    let ingredients = {};
    for (const key in INGREDIENT_PRICES) {
        if(key !== "base_price")
        ingredients[key] = 0;
    }
    return ingredients;
})();


// Component definition

class BurgerBuilder extends Component {
    state = {
        ingredients: {...INGREDIENTS},
        totalPrice: INGREDIENT_PRICES.base_price,
        isPurchasable: false,
        showModal: false,
        loading: false,
    }

    ingredientHandler = (operation, ingredient) => {
        const updatedState = {...this.state};

        function round(x) {
            return parseFloat(x.toFixed(1));
        }

        switch(operation){
            case ('+'):
                updatedState.ingredients[ingredient]++;
                updatedState.totalPrice += INGREDIENT_PRICES[ingredient];
                break;

            case("-"):
                if(updatedState.ingredients[ingredient]) {
                    updatedState.ingredients[ingredient]--;
                    updatedState.totalPrice -= INGREDIENT_PRICES[ingredient];
                }
                break;

            default:
                console.error(Error("Operation unknown", "BurgerBuilder.js", "35"));
                break;
        }

        updatedState.totalPrice = round(updatedState.totalPrice);
        this.setState(updatedState);
        this.updatePurchaseableState(updatedState);
    }

    // change value of purchasable variable if any ingredient was added
    updatePurchaseableState = (updatedState) => {
        let isPurchasable = false;

        for (const key in this.state.ingredients) {
            if(updatedState.ingredients[key]) {
                isPurchasable = true;
                break;
            }
        }
        updatedState.isPurchasable = isPurchasable;
        this.setState(updatedState);
    }

    displayModalHandler = () => {
        this.setState((prevState) => ({ showModal: !prevState.showModal }));
    }

    orderHandler = () => {
        this.setState({loading: true});

        const orderData = {
            ingredients: {...this.state.ingredients},
            price: this.state.totalPrice,
            customerData: {
                name: "Dummy Name",
                street: "Dummy Street 123"
            }
        };

        axios.post('/orders.json', orderData)
            .then((response) => {
                console.log("response", response);
                this.setState({showModal: false, loading: false});
            })
            .catch((error) => {
                console.error("MY_ERROR", error);
                this.setState({showModal: false, loading: false});
            });
    }
    
    render() {
        const orderSummary = this.state.loading
            ? <LoadingSpinner />
            : <OrderSummary 
                ingredients = {this.state.ingredients}
                price = {this.state.totalPrice}/>;

        return(
            <Fragment>
                <StateManager.Provider
                    value = {
                        {
                            ...this.state,
                            ingredientHandler: this.ingredientHandler,
                            displayModalHandler: this.displayModalHandler,
                            orderHandler: this.orderHandler
                        }
                    }>
                        <Modal 
                            showModal = {this.state.showModal}
                            displayModalHandler = {this.displayModalHandler}
                            >
                                {orderSummary}   
                        </Modal>

                        <Burger 
                            ingredients = {this.state.ingredients}/>

                        <IngredientControls />
                </StateManager.Provider>

            </Fragment>
        );
    };
};

export default BurgerBuilder;