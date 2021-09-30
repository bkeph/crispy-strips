import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import CSSModule from './ContactData.module.css';
import axiosInstance from '../../axios/axios';
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import moment from 'moment';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {withRouter } from "react-router";

const TIME_UNTIL_REDIRECT = 3000;

class ContactData extends Component {
    constructor() {
        super();
        this.formRef = React.createRef();
    }

    state = {
        wasSubmitted: null,
        isFormValid: null,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                    label: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: null
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street',
                    label: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: null
            },
            postalcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code',
                    label: 'Postal code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: null
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your city',
                    label: 'City'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: null
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                    label: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: null
            },
        },
    }


    componentDidUpdate() {
        let isFormValid = true;
        for (const inputFieldName in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, inputFieldName)) {
                const inputFieldData = this.state.orderForm[inputFieldName];
                isFormValid = inputFieldData.valid && isFormValid;
            }
        }

        // Avoid infinite update
        if(this.state.isFormValid === isFormValid)
            return;

        this.setState({isFormValid});
    }

    redirectToMainPageAfterPurchase() {
        if(this.props.purchased) {
            setTimeout(() => {
                this.props.history.push("/");
            }, TIME_UNTIL_REDIRECT);
        }
    }

    checkValidityHandler(currentValue, inputFieldName, value, rules) {
        let isValid = true;
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));

        if(currentValue === value || !rules)
            return;

        updatedOrderForm[inputFieldName].value = currentValue;

        if(rules.required) {
            isValid = currentValue.trim() && isValid;
        }

        if(rules.minLength) {
            isValid = currentValue.length >= rules.minLength && isValid;
        }

        updatedOrderForm[inputFieldName].valid = isValid;
        this.setState({
            orderForm: updatedOrderForm
        });
    }

    returnCustomerData(event) {
        const customerData = {};
        let index = 0;

        for (const inputFieldName in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, inputFieldName)) {
                customerData[inputFieldName] = event.target[index].value;
                index++;
            }
        }
        return customerData;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ wasSubmitted: true });

        const shortDate = `${moment().format('L')}\n${moment().format('LT')}`;

        const initialCustomerData = this.returnCustomerData(event);

        const orderData = {
            ingredients: {...this.props.ingredients},
            price: this.props.price,
            customerData: {
                ...initialCustomerData,
                date: shortDate
            }
        };

        console.log(this.props.token);
        this.props.sendOrder(orderData, this.props.token);
    }
    
    render() {
        const status = this.state.wasSubmitted
            ? this.props.loading
                ? <LoadingSpinner />
                : "Order sent!"
            : null;

        const inputElements = [];
        for (const inputFieldName in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, inputFieldName)) {

                const inputFieldData = this.state.orderForm[inputFieldName];

                const isinvalid = (inputFieldData.value !== "" && inputFieldData.valid === false)
                    ? {isinvalid: true}
                    : null;

                inputElements.push(
                    <Input 
                        onChange={(event) => this.checkValidityHandler(event.target.value, inputFieldName, inputFieldData.value, inputFieldData.validation)} 
                        key={inputFieldName} 
                        name={inputFieldName} 
                        {...isinvalid}
                        {...inputFieldData.elementConfig} />
                );
            }
        }
        
        const disabled = this.state.isFormValid
            ? null
            : { disabled: "disabled" };

        this.redirectToMainPageAfterPurchase();


        return(
            <div className = {CSSModule.ContactData}>
                <h4>Enter your contact data:</h4>
                <form onSubmit = {this.orderHandler} ref = {this.formRef}>
                    {inputElements}

                    <Button
                        disabled = {disabled}
                        isGoButton={true}>
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

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    purchased: state.order.purchased,
    token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
    sendOrder: (orderData, token) => dispatch(actions.sendOrder(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axiosInstance));