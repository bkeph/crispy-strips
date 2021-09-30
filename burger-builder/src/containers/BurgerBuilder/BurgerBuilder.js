import { Component, Fragment } from "react";
import Burger from '../../components/Burger/Burger';
import IngredientControls from '../../components/IngredientControls/IngredientControls';
import StateManager from '../../components/StateManager/StateManager';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from '../../axios/axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import CSSModule from './BurgerBuilder.module.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';


// Component definition
class BurgerBuilder extends Component {
    state = {
        isPurchasable: false,
        showModal: false,
        isCheckoutEnabled: false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    componentDidUpdate() {
        this.updatePurchaseableState();
    }

    // Change value of purchasable variable if any ingredient was added
    updatePurchaseableState = () => {
        let isPurchasable = false;

        for (const key in this.props.ingredients) {
            if (this.props.ingredients[key]) {
                isPurchasable = true;
                break;
            }
        }
        if (this.state.isPurchasable !== isPurchasable)
            this.setState({ isPurchasable });
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
        const errorMessage = <p className={CSSModule.ErrorMessage}>
            An error occured while fetching data from the server. Please try again later.
        </p>;

        return (
            <Fragment>
                <StateManager.Provider
                    value={
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
                                showModal={this.state.showModal}
                                displayModalHandler={this.displayModalHandler}
                            >
                                <OrderSummary
                                    ingredients={this.props.ingredients}
                                    totalPrice={this.props.totalPrice}
                                    title={"Order Summary"}
                                    closeBtnText={"Close"}
                                    goBtnText={"Checkout"}
                                    closeBtnAction={this.displayModalHandler}
                                    goBtnAction={this.toCheckoutHandler}
                                    showModal={this.state.showModal} />;
                            </Modal>

                            <Burger ingredients={this.props.ingredients} />

                            {this.props.error
                                ? errorMessage
                                : <IngredientControls />}
                        </Route>

                        <Route render={() => <div>Page not found.</div>} />
                    </Switch>
                </StateManager.Provider>

            </Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ing) => dispatch(actionCreators.addIngredient(ing)),
        removeIngredient: (ing) => dispatch(actionCreators.removeIngredient(ing)),
        initIngredients: () => dispatch(actionCreators.initIngredients()),
        setPurchased: () => dispatch(actionCreators.setPurchased())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(BurgerBuilder), axiosInstance));