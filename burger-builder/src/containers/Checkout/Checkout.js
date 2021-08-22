import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CSSModule from './Checkout.module.css';
import { Component, Fragment } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { withRouter } from 'react-router';
import axiosInstance from '../../axios';


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: null,
        loading: null,
        wasDataPassed: null,
        toRender: null
    }

    returnToMainPageHandler = () => {
        console.log("gotHere");
        this.props.history.push({ pathname: "/" });
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
                        closeBtnAction = {this.returnToMainPageHandler}
                        goBtnAction = {this.orderHandler}/>
                });
            else {
                this.goBack(2.5 * 1000);
                this.setState({ 
                    toRender: <Fragment>
                            <div className = {CSSModule.GoBack}>No ingredients added. You are being redirected, please wait...</div>
                            <LoadingSpinner color = {"rgb(48, 48, 48)"}/>
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
                    var totalPrice = iterator[1];
                    continue;
                }
                ingredients[iterator[0]] = iterator[1];
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


    // returnToMainPageHandler = () => {
    //     // this.setState({showModal: false});
    //     console.log("gotHere");
    //     this.props.history.push({ pathname: "/" });
    // }

    // orderHandler = () => {
    //     this.setState({ loading: true });

    //     const orderData = {
    //         ingredients: {...this.state.ingredients},
    //         price: this.state.totalPrice,
    //         customerData: {
    //             name: "Dummy Name",
    //             street: "Dummy Street 123"
    //         }
    //     };

    //     axiosInstance.post('/orders.json', orderData)
    //         .then((response) => {
    //             console.log("[BurgerBuilder.js] RESPONSE", response);
    //             this.setState({showModal: false, loading: false});
    //         })
    //         .catch((error) => {
    //             console.error("[BurgerBuilder.js] ERROR", error);
    //             this.setState({showModal: false, loading: false});
    //         });
    // }
    
    render() {

        const toRender = this.state.loading
            ? <LoadingSpinner color = {"rgb(48, 48, 48)"}/>
            : this.state.toRender;

        return toRender;
    }
}

export default withRouter(Checkout);