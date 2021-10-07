import { Redirect, withRouter } from "react-router";
import { connect } from 'react-redux';
import { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import CSSModule from './Auth.module.css';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios/axios";
import * as actions from '../../store/actions/index';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { checkValidity, checkOverallFormValidity, returnInputData, renderInputElements } from "../../shared/utility";

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
        this.innerCheckOverallFormValidity();
    }

    innerCheckOverallFormValidity() {
        const isFormValid = checkOverallFormValidity(this.state.inputs);

        // Avoid infinite update
        if (this.state.isFormValid === isFormValid)
            return;

        this.setState({ isFormValid });
    }

    checkFieldValidityHandler(...args) {
        const updatedInputs = checkValidity(...args);
        this.setState({
            inputs: updatedInputs
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ wasSubmitted: true });

        // const shortDate = `${moment().format('L')}\n${moment().format('LT')}`;

        const initialCustomerData = returnInputData(event, this.state.inputs);

        const data = {
            ...initialCustomerData,
            // date: shortDate
        };

        if(this.props.building && this.props.pathFromAuth !== '/checkout')
            this.props.setPathFromAuth('/checkout');

        this.props.authenticate(data, this.state.isSignup);
    }

    switchAuthMode = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        const disabled = this.state.isFormValid
            ? null
            : { disabled: "disabled" };

        const inputElements = renderInputElements(this.state.inputs, Input, this.checkFieldValidityHandler);

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