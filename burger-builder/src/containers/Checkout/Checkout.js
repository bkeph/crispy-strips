import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CSSModule from './Checkout.module.css';
import { Component, Fragment } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { withRouter, Route } from 'react-router';
import ContactData from '../Checkout/ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: null,
        loading: null,
        wasDataPassed: null,
        toRender: null
    }

    returnToMainPage = () => {
        this.props.history.push({ pathname: "/" });
    }

    toContactForm = () => {
        this.props.history.replace(`${this.props.match.path}/contact-data`);
    }

    componentDidMount() {
        this.parseIngredientsAndPrice();
    }

    componentDidUpdate() {
        if(this.state.loading)
            this.setState({ loading: false });

        if(!this.state.toRender) {
            if(this.state.wasDataPassed)
                this.setState({
                    toRender: <CheckoutSummary 
                        ingredients={this.state.ingredients} 
                        totalPrice={this.state.totalPrice}
                        closeBtnAction = {this.returnToMainPage}
                        goBtnAction = {this.toContactForm}/>
                });
            else {
                this.goBack(2.5 * 1000);
                this.setState({ 
                    toRender: 
                        <Fragment>
                            <div className = {CSSModule.GoBack}>No ingredients added. You are being redirected, please wait...</div>
                            <LoadingSpinner />
                        </Fragment>
                 });
            }
        }
    }

    parseIngredientsAndPrice = () => {
        if(this.props.location.search) {
            const dataFromURL = new URLSearchParams(this.props.location.search);
            const ingredients = {};

            for (const iterator of dataFromURL.entries()) {
                if(iterator[0] === "price") {
                    var totalPrice = +iterator[1];
                    continue;
                }
                ingredients[iterator[0]] = +iterator[1];
            }
            this.setState({ingredients, totalPrice, loading: true, wasDataPassed: true});
        } else {
            this.setState({loading: true, wasDataPassed: false});
        }
    }

    goBack = (time) => {
        setTimeout(() => {
            this.props.history.push("/");
        }, time);
    }
    
    render() {

        const toRender = this.state.loading
            ? <LoadingSpinner />
            : this.state.toRender;

        return (
            <Fragment>
                {toRender}
                <Route path={`${this.props.match.path}/contact-data`}>
                    {
                        this.state.wasDataPassed
                            ? <ContactData 
                                    ingredients = {this.state.ingredients}
                                    price = {this.state.totalPrice}/>
                            : null
                    }
                </Route>
            </Fragment>
        );
    }
}

export default withRouter(Checkout);