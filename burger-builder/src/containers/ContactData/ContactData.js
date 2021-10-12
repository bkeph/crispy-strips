import { withRouter } from "react-router";
import { connect } from 'react-redux';
import moment from 'moment';
import React, { Component } from "react";

import Button from "../../components/UI/Button/Button";
import CSSModule from './ContactData.module.css';
import axiosInstance from '../../axios/axios';
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity, checkOverallFormValidity, returnInputData, renderInputElements } from "../../shared/utility";

const TIME_UNTIL_REDIRECT = 3000;

class ContactData extends Component {
    constructor() {
        super();
        this.formRef = React.createRef();
        this.timerId = null;
        this.redirectTimer = {
            timer: () => {
                this.timerId = setTimeout(() => {
                    this.props.history.push("/");
                }, TIME_UNTIL_REDIRECT)
            }
        };
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

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    innerCheckOverallFormValidity() {
        const isFormValid = checkOverallFormValidity(this.state.orderForm);

        // Avoid infinite update
        if (this.state.isFormValid === isFormValid)
            return;

        this.setState({ isFormValid });
    }

    componentDidUpdate() {
        this.innerCheckOverallFormValidity();
    }

    redirectToMainPageAfterPurchase() {
        if (this.props.purchased) {
            this.redirectTimer.timer();
        }
    }

    checkValidityHandler = (...args) => {
        const updatedOrderForm = checkValidity(...args);
        this.setState({ orderForm: updatedOrderForm });
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ wasSubmitted: true });

        const shortDate = `${moment().format('L')}\n${moment().format('LT')}`;

        const initialCustomerData = returnInputData(event, this.state.orderForm);

        const orderData = {
            ingredients: { ...this.props.ingredients },
            price: this.props.price,
            customerData: {
                ...initialCustomerData,
                date: shortDate
            },
            userId: this.props.userId
        };

        this.props.sendOrder(orderData, this.props.token);
    }

    render() {
        const status = this.state.wasSubmitted
            ? this.props.loading
                ? <LoadingSpinner />
                : "Order sent!"
            : null;

        // const inputElements = [];
        // for (const inputFieldName in this.state.orderForm) {
        //     if (Object.hasOwnProperty.call(this.state.orderForm, inputFieldName)) {

        //         const inputFieldData = this.state.orderForm[inputFieldName];

        //         const isinvalid = (inputFieldData.value !== "" && inputFieldData.valid === false)
        //             ? { isinvalid: true }
        //             : null;

        //         inputElements.push(
        //             <Input
        //                 onChange={(event) => this.checkValidityHandler(this.state.orderForm, event.target.value, inputFieldName, inputFieldData.value, inputFieldData.validation)}
        //                 key={inputFieldName}
        //                 name={inputFieldName}
        //                 {...isinvalid}
        //                 {...inputFieldData.elementConfig} />
        //         );
        //     }
        // }

        const inputElements = renderInputElements(this.state.orderForm, Input, this.checkValidityHandler);

        const disabled = this.state.isFormValid
            ? null
            : { disabled: "disabled" };

        this.redirectToMainPageAfterPurchase();

        return (
            <div className={CSSModule.ContactData}>
                <h4>Enter your contact data:</h4>
                <form onSubmit={this.orderHandler} ref={this.formRef}>
                    {inputElements}

                    <Button
                        disabled={disabled}
                        isGoButton={true}>
                        Send
                    </Button>
                </form>
                <div className={CSSModule.Status}>
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
    token: state.auth.token,
    userId: state.auth.localId
});

const mapDispatchToProps = dispatch => ({
    sendOrder: (orderData, token) => dispatch(actions.sendOrder(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axiosInstance));