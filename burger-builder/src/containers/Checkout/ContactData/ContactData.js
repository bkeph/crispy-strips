import { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import CSSModule from './ContactData.module.css';
import axiosInstance from '../../../axios';
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import moment from 'moment';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        ingredients: null,
        price: null,
        name: null,
        email: null,
        street: null,
        city: null,
        postalcode: null,
        loading: null,
        wasSubmitted: null
    }

    componentDidMount() {
        if(!this.state.ingredients && !this.state.price)
            this.setState({ingredients: this.props.ingredients, price: this.props.price});
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true, wasSubmitted: true});

        // const date = new Date();
        const shortDate = `${moment().format('L')}\n${moment().format('LT')}`;

        const orderData = {
            ingredients: {...this.state.ingredients},
            price: this.state.price,
            customerData: {
                // name: this.state.name,
                // email: this.state.email,
                // street: this.state.street,
                // city: this.state.city,
                // postalcode: this.state.postalcode,
                name: "Dummy",
                email: "Dummy",
                street: "Dummy",
                city: "Dummy",
                postalcode: "Dummy",
                date: shortDate
            }
        };

        axiosInstance.post('/orders.json', orderData)
            .then((response) => {
                console.log("[BurgerBuilder.js] RESPONSE", response);
                this.setState({loading: false});
            })
            .catch((error) => {
                console.error("[BurgerBuilder.js] ERROR", error);
                this.setState({loading: false});
            });
    }
    
    render() {
        const status = this.state.wasSubmitted
            ? this.state.loading
                ? <LoadingSpinner />
                : "Order sent!"
            : null;

        return(
            <div className = {CSSModule.ContactData}>
                <h4>Enter your contact data:</h4>
                <form>
                    <Input name="name" type="text" placeholder="Your name" label="Name" />
                    <Input name="email" type="email" placeholder="Your email" label="Email" />
                    <Input name="street" type="text" placeholder="Your street" label="Street" />
                    <Input name="city" type="text" placeholder="Your city" label="City" />
                    <Input name="postalcode" type="text" placeholder="Your postalcode" label="Postal Code" />

                    <Button
                        style = {{ backgroundImage: "linear-gradient(rgba(186, 255, 130, 0.5), rgba(30, 255, 0, 0.25))" }}
                        onClick = {this.orderHandler}>
                            Send
                    </Button>
                </form>
                <div className = {CSSModule.Status}>
                    {status}
                </div>
            </div>
        );
    }
}

export default ContactData;