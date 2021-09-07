import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import CSSModule from './ContactData.module.css';
import axiosInstance from '../../../axios';
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import moment from 'moment';
import Input from '../../../components/UI/Input/Input';

const FIELD_CHECK_INTERVAL = 1800; //ms

class ContactData extends Component {
    constructor() {
        super();
        this.formRef = React.createRef();
    }

    state = {
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
        ingredients: null,
        price: null,    
        loading: null,
        wasSubmitted: null,
        areAllInputFieldsValid: null
    }

    componentDidMount() {
        if(!this.state.ingredients && !this.state.price)
            this.setState({ingredients: this.props.ingredients, price: this.props.price});

        // Check every *FIELD_CHECK_INTERVAL* ms if the value of the input fields have changed (added to solve the autocomplete issue that did not trigger onChange event set on <Input /> elements)
        setInterval(() => {
            let inputElementCounter = 0;
            for (const inputFieldName in this.state.orderForm) {
                if (Object.hasOwnProperty.call(this.state.orderForm, inputFieldName)) {

                    const inputFieldData = this.state.orderForm[inputFieldName];
                    
                    this.checkValidityHandler(this.formRef.current[inputElementCounter].value, inputFieldName, inputFieldData.value, inputFieldData.validation);
                }
            }
        }, FIELD_CHECK_INTERVAL);
    }

    componentDidUpdate() {
        let countFilledInputs = 0;
        for (const inputFieldName in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, inputFieldName)) {
                const inputFieldData = this.state.orderForm[inputFieldName];
                if(inputFieldData.valid)
                    countFilledInputs++;
            }
        }

        const areAllInputFieldsValid = countFilledInputs === 5
            ? true
            : false;

        // Avoid infinite update
        if(this.state.areAllInputFieldsValid === areAllInputFieldsValid)
            return;

        this.setState({areAllInputFieldsValid});
    }

    checkValidityHandler(currentValue, inputFieldName, value, rules) {
        // console.log(inputFieldName, value);
        let isValid = true;
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));

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

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true, 
            wasSubmitted: true,
        });

        const shortDate = `${moment().format('L')}\n${moment().format('LT')}`;

        const orderData = {
            ingredients: {...this.state.ingredients},
            price: this.state.price,
            customerData: {
                name: event.target[0].value,
                email: event.target[1].value,
                street: event.target[2].value,
                city: event.target[3].value,
                postalcode: event.target[4].value,
                date: shortDate
            }
        };

        // console.log(this.state.orderForm);

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

        const inputElements = [];
        for (const inputFieldName in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, inputFieldName)) {

                const inputFieldData = this.state.orderForm[inputFieldName];

                const isinvalid = (inputFieldData.value !== "" && inputFieldData.valid !== null && !inputFieldData.valid)
                    ? true
                    : null;

                inputElements.push(
                    <Input 
                        onChange={(event) => this.checkValidityHandler(event.target.value, inputFieldName, inputFieldData.value, inputFieldData.validation)} 
                        key={inputFieldName} 
                        name={inputFieldName} 
                        isinvalid={isinvalid}
                        {...inputFieldData.elementConfig} />
                );
            }
        }
        
        const disabled = this.state.areAllInputFieldsValid
            ? ""
            : { disabled: "disabled" };

        return(
            <div className = {CSSModule.ContactData}>
                <h4>Enter your contact data:</h4>
                <form onSubmit = {this.orderHandler} ref = {this.formRef}>
                    {inputElements}

                    <Button
                        style = {{ backgroundImage: "linear-gradient(rgba(186, 255, 130, 0.5), rgba(30, 255, 0, 0.25))" }}
                        disabled = {disabled}>
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