import { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import CSSModule from './Auth.module.css';
import { connect } from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios/axios";
import * as actions from '../../store/actions/index';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { Redirect, withRouter } from "react-router";

class Auth extends Component {
    state = {
        wasSubmitted: null,
        isFormValid: null,
        isSignup: true,
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
        this.checkOverallFormValidity();
    }

    checkOverallFormValidity() {
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

    checkFieldValidityHandler(currentValue, inputFieldName, value, rules) {
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

        this.props.authenticate(data, this.state.isSignup);
    }

    switchAuthMode = (event) => {
        event.preventDefault();

        if(this.props.building && this.props.pathFromAuth !== '/checkout')
            this.props.setPathFromAuth('/checkout');

        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
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
                        onChange={(event) => this.checkFieldValidityHandler(event.target.value, inputFieldName, inputFieldData.value, inputFieldData.validation)}
                        key={inputFieldName}
                        name={inputFieldName}
                        {...isinvalid}
                        {...inputFieldData.elementConfig} />
                );
            }
        }

        const status = this.props.loading
            ?   <LoadingSpinner />
            :   this.props.error
                ?   <p>{this.props.error.message}</p>
                :   null;

        const redirect = this.props.isAuthenticated
            ?   <Redirect to={this.props.pathFromAuth} />
            :   null;

        return (
            <div className={CSSModule.Auth}>

                {redirect}

                <form onSubmit={this.submitHandler}>
                    <h4>{this.state.isSignup ? "Sign UP": "Sign IN"}</h4>

                    {inputElements}

                    <Button
                        disabled={disabled}
                        isGoButton={true}>
                        Submit
                    </Button>

                    <Button
                        onClick = {(event) => this.switchAuthMode(event)}
                        isGoButton={false}>
                        Switch to {this.state.isSignup ? "Sign IN": "Sign UP"}
                    </Button>

                    <div className = {CSSModule.Status}>
                        {status}
                    </div>
                </form>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    building: state.burgerBuilder.building,
    pathFromAuth: state.burgerBuilder.pathFromAuth
});

const mapDispatchToProps = dispatch => ({
    authenticate: (credentials, isSignup) => dispatch(actions.auth(credentials, isSignup)),
    setPathFromAuth: (path) => dispatch(actions.setAuthReturnPath(path))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axiosInstance)));