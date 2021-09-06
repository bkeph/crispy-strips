import { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import CSSModule from './ContactData.module.css';
import axiosInstance from '../../../axios';
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import moment from 'moment';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
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
                    required: true
                },
                valid: false
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
                    required: true
                },
                valid: false
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
                    required: true
                },
                valid: false
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
                    required: true
                },
                valid: false
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
                valid: false
            },
        },
        ingredients: null,
        price: null,    
        loading: null,
        wasSubmitted: null
    }

    componentDidMount() {
        if(!this.state.ingredients && !this.state.price)
            this.setState({ingredients: this.props.ingredients, price: this.props.price});
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true, 
            wasSubmitted: true,
        });

        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));

        let counterOfInputElements = 0;
        for (const inputElement in updatedOrderForm) {
            if (Object.hasOwnProperty.call(updatedOrderForm, inputElement)) {
                const element = updatedOrderForm[inputElement];
                element.value = event.target[counterOfInputElements].value;
                counterOfInputElements++;
                console.log("element", element);
            }
        }
        this.setState({
            orderForm: updatedOrderForm
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
        for (const key in this.state.orderForm) {
            if (Object.hasOwnProperty.call(this.state.orderForm, key)) {
                const element = this.state.orderForm[key];
                inputElements.push(
                    <Input key={key} name={key} {...element.elementConfig} />
                );
            }
        }

        return(
            <div className = {CSSModule.ContactData}>
                <h4>Enter your contact data:</h4>
                <form onSubmit = {this.orderHandler}>
                    {inputElements}

                    <Button
                        style = {{ backgroundImage: "linear-gradient(rgba(186, 255, 130, 0.5), rgba(30, 255, 0, 0.25))" }}>
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