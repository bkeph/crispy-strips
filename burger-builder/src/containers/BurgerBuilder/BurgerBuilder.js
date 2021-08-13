import { Component, Fragment } from "react";
import Burger from '../../components/Burger/Burger';
import IngredientControls from '../../components/IngredientControls/IngredientControls';
import StateManager from '../../components/StateManager/StateManager';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from '../../axios';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import CSSModule from './BurgerBuilder.module.css';


// Component definition
class BurgerBuilder extends Component {
    state = {
        ingredients: null, // will be fetched from server
        ingredients_prices: null, // will be fetched from server
        totalPrice: null, // will be fetched from server
        isPurchasable: false,
        showModal: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axiosInstance.get('/ingredients_prices.json')
            .then((response) => {
                if(!this.state.ingredients) {
                    const INGREDIENT_PRICES = response.data;
                    
                    const INGREDIENTS = (() => {
                        let ingredients = {};
                        for (const key in INGREDIENT_PRICES) {
                            if(key !== "base_price")
                            ingredients[key] = 0;
                        }
                        return ingredients;
                    })();

                    this.setState({ ingredients_prices: INGREDIENT_PRICES, ingredients: INGREDIENTS, totalPrice: INGREDIENT_PRICES.base_price });
                }
            })
            .catch((error) => {
                this.setState({ error: true })
            });
    }

    ingredientHandler = (operation, ingredient) => {
        const updatedState = {...this.state};

        function round(x) {
            return parseFloat(x.toFixed(1));
        }

        switch(operation){
            case ('+'):
                updatedState.ingredients[ingredient]++;
                updatedState.totalPrice += updatedState.ingredients_prices[ingredient];
                break;

            case("-"):
                if(updatedState.ingredients[ingredient]) {
                    updatedState.ingredients[ingredient]--;
                    updatedState.totalPrice -= updatedState.ingredients_prices[ingredient];
                }
                break;

            default:
                console.error(Error("Operation unknown"));
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
        this.setState({ loading: true });

        const orderData = {
            ingredients: {...this.state.ingredients},
            price: this.state.totalPrice,
            customerData: {
                name: "Dummy Name",
                street: "Dummy Street 123"
            }
        };

        axiosInstance.post('/orders.json', orderData)
            .then((response) => {
                console.log("[BurgerBuilder.js] RESPONSE", response);
                this.setState({showModal: false, loading: false});
            })
            .catch((error) => {
                console.error("[BurgerBuilder.js] ERROR", error);
                this.setState({showModal: false, loading: false});
            });
    }
    
    render() {
        const orderSummary = this.state.loading
            ? <LoadingSpinner />
            : <OrderSummary 
                ingredients = {this.state.ingredients}
                price = {this.state.totalPrice}/>;

        const ingredientControls = this.state.ingredients
            ? <IngredientControls />
            : <LoadingSpinner color = {"rgb(48, 48, 48)"}/>;

        const errorMessage = <p className = {CSSModule.ErrorMessage}>
                An error occured while fetching data from the server. Please try again later.
            </p>;


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

                        <Burger ingredients = {this.state.ingredients}/>

                        {this.state.error
                            ? errorMessage
                            : ingredientControls}
                </StateManager.Provider>

            </Fragment>
        );
    };
};

export default withErrorHandler(BurgerBuilder, axiosInstance);