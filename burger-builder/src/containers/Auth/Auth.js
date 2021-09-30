import { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import CSSModule from './Auth.module.css';
import { connect } from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios/axios";
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        wasSubmitted: null,
        isFormValid: null,
        inputs: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                    label: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: null
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                    label: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: null
            },
        }
    }

    componentDidUpdate() {
        let isFormValid = true;
        for (const inputFieldName in this.state.inputs) {
            if (Object.hasOwnProperty.call(this.state.inputs, inputFieldName)) {
                const inputFieldData = this.state.inputs[inputFieldName];
                isFormValid = inputFieldData.valid && isFormValid;
            }
        }

        // Avoid infinite update
        if (this.state.isFormValid === isFormValid)
            return;

        this.setState({ isFormValid });
    }

    checkValidityHandler(currentValue, inputFieldName, value, rules) {
        let isValid = true;
        const updatedInputs = JSON.parse(JSON.stringify(this.state.inputs));

        if (currentValue === value || !rules)
            return;

        updatedInputs[inputFieldName].value = currentValue;

        if (rules.required) {
            isValid = currentValue.trim() && isValid;
        }

        if (rules.minLength) {
            isValid = currentValue.length >= rules.minLength && isValid;
        }

        updatedInputs[inputFieldName].valid = isValid;
        this.setState({
            inputs: updatedInputs
        });
    }

    returnCustomerData(event) {
        const inputData = {};
        let index = 0;

        for (const inputFieldName in this.state.inputs) {
            if (Object.hasOwnProperty.call(this.state.inputs, inputFieldName)) {
                inputData[inputFieldName] = event.target[index].value;
                index++;
            }
        }
        return inputData;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ wasSubmitted: true });

        // const shortDate = `${moment().format('L')}\n${moment().format('LT')}`;

        const initialCustomerData = this.returnCustomerData(event);

        const data = {
            ...initialCustomerData,
            // date: shortDate
        };

        this.props.authenticate(data);
    }

    render() {
        const disabled = this.state.isFormValid
            ? null
            : { disabled: "disabled" };

        const inputElements = [];
        for (const inputFieldName in this.state.inputs) {
            if (Object.hasOwnProperty.call(this.state.inputs, inputFieldName)) {

                const inputFieldData = this.state.inputs[inputFieldName];

                const isinvalid = (inputFieldData.value !== "" && inputFieldData.valid === false)
                    ? { isinvalid: true }
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

        return (
            <div className={CSSModule.Auth}>
                <form onSubmit={this.submitHandler}>
                    <h4>Enter your credentials</h4>

                    {inputElements}

                    <Button
                        disabled={disabled}
                        isGoButton={true}>
                        Submit
                    </Button>
                </form>
            </div>
        );
    };
}

const mapDispatchToProps = dispatch => ({
    authenticate: (credentials) => dispatch(actions.auth(credentials))
});

export default connect(null, mapDispatchToProps)(withErrorHandler(Auth, axiosInstance));