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
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';


// Component definition
class BurgerBuilder extends Component {
    state = {
        // ingredients: null, // will be fetched from server
        // ingredients_prices: null, // will be fetched from server
        // totalPrice: null, // will be fetched from server
        isPurchasable: false,
        showModal: false,
        loading: false,
        error: false,
        isCheckoutEnabled: false
    }

    componentDidMount() {
    //     axiosInstance.get('/ingredients_prices.json')
    //         .then((response) => {
    //             if(!this.state.ingredients) {
    //                 const INGREDIENT_PRICES = response.data;
                    
    //                 const INGREDIENTS = (() => {
    //                     let ingredients = {};
    //                     for (const key in INGREDIENT_PRICES) {
    //                         if(key !== "base_price")
    //                         ingredients[key] = 0;
    //                     }
    //                     return ingredients;
    //                 })();

    //                 this.setState({ ingredients_prices: INGREDIENT_PRICES, ingredients: INGREDIENTS, totalPrice: INGREDIENT_PRICES.base_price });
    //             }
    //         })
    //         .catch((error) => {
    //             this.setState({ error: true })
    //         });
    }

    componentDidUpdate() {
        this.updatePurchaseableState();
    }

    // Change value of purchasable variable if any ingredient was added
    updatePurchaseableState = () => {
        let isPurchasable = false;

        for (const key in this.props.ingredients) {
            if(this.props.ingredients[key]) {
                isPurchasable = true;
                break;
            }
        }
        if(this.state.isPurchasable !== isPurchasable)
            this.setState({isPurchasable});
    }

    displayModalHandler = () => {
        this.setState((prevState) => ({ showModal: !prevState.showModal }));
    }

    toCheckoutHandler = () => {
        // const searchParams = [];
        // const ingredients = {...this.props.ingredients};
        // const price = this.props.totalPrice;

        // searchParams.push(`price=${encodeURIComponent(price)}`);

        // for (const key in ingredients) {
        //     if (Object.hasOwnProperty.call(ingredients, key)) {
        //         searchParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(ingredients[key])}`);
        //     }
        // }
        // const searchParamsString = searchParams.join("&");
        this.props.history.push({ 
            pathname: "/checkout",
            // search: `?${searchParamsString}`
         });
    }
    
    render() {
        const orderSummary = this.state.loading
            ? <LoadingSpinner color = {"#fff"}/>
            : <OrderSummary 
                ingredients = {this.props.ingredients}
                totalPrice = {this.props.totalPrice}
                title = {"Order Summary"}
                closeBtnText = {"Close"}
                goBtnText = {"Checkout"}
                closeBtnAction = {this.displayModalHandler}
                goBtnAction = {this.toCheckoutHandler}
                showModal = {this.state.showModal}/>;

        const ingredientControls = this.props.ingredients
            ? <IngredientControls />
            : <LoadingSpinner />;

        const errorMessage = <p className = {CSSModule.ErrorMessage}>
                An error occured while fetching data from the server. Please try again later.
            </p>;

        return(
            <Fragment>
                <StateManager.Provider
                    value = {
                        {
                            ...this.state,
                            addIngredient: this.props.addIngredient,
                            removeIngredient: this.props.removeIngredient,
                            displayModalHandler: this.displayModalHandler,
                            orderHandler: this.orderHandler,
                            toCheckoutHandler: this.toCheckoutHandler,
                            returnToMainPageHandler: this.returnToMainPageHandler
                        }
                    }>
                        <Switch>
                            <Route path='/' exact>
                                <Modal 
                                    showModal = {this.state.showModal}
                                    displayModalHandler = {this.displayModalHandler}
                                    >
                                        {orderSummary}   
                                </Modal>

                                <Burger ingredients = {this.props.ingredients}/>

                                {this.state.error
                                    ? errorMessage
                                    : ingredientControls}
                            </Route>

                            <Route render={() => <div>Page not found.</div>} />
                        </Switch>
                </StateManager.Provider>

            </Fragment>
        );
    };
};

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
});

const mapDispatchToProps = (dispatch) => ({
    addIngredient: (ing) => dispatch({type: actions.ADD_INGREDIENT, ingredientToUpdate: ing}),
    removeIngredient: (ing) => dispatch({type: actions.REMOVE_INGREDIENT, ingredientToUpdate: ing})
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(BurgerBuilder), axiosInstance));