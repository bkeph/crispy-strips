import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CSSModule from './Checkout.module.css';
import { Component, Fragment, useState } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { withRouter } from 'react-router';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: null
    }

    componentDidMount() {
        this.parseIngredientsAndPrice();
    }

    parseIngredientsAndPrice = () => {
        const dataFromURL = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (const iterator of dataFromURL.entries()) {
            if(iterator[0] === "price") {
                var totalPrice = iterator[1];
                continue;
            }
            ingredients[iterator[0]] = iterator[1];
        }
        this.setState({ingredients, totalPrice});
    }

    goBack = (time) => {
        setTimeout(() => {
            this.props.history.push("/");
        }, time);
    }

    checkIngredients = () => {
        for (const key in this.state.ingredients) {
            if (Object.hasOwnProperty.call(this.state.ingredients, key)) {
                const element = this.state.ingredients[key];
                if(element)
                    return true;
            }
        }
        return false;       
    }

    
    
    render() {
        const showCheckout = this.checkIngredients()
            ? <CheckoutSummary ingredients={this.state.ingredients} />
            : (
                <Fragment>
                    {
                        this.goBack(2.5 * 1000)
                    }
                    <div className = {CSSModule.GoBack}>No ingredients added. You are being redirected, please wait...</div>
                    <LoadingSpinner color = {"rgb(48, 48, 48)"}/>
                </Fragment>
            );

        return showCheckout;
    }
}

export default withRouter(Checkout);