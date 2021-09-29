import Modal from "../../components/UI/Modal/Modal";
import { Component, Fragment } from "react";
import CSSModule from './withErrorHandler.module.css';

// HOC that wrap any component that uses Axios and handle its errors
const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.catchError();
        }

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject( this.reqInterceptor );
            axiosInstance.interceptors.response.eject( this.resInterceptor );
        }

        catchError() {
            // Reset any previous errors
            this.reqInterceptor = axiosInstance.interceptors.request.use((request) => {
                if(this.state.error)
                    this.setState({ error: null });
                return request;
            });

            // Check for errors at response receipt
            this.resInterceptor = axiosInstance.interceptors.response.use(response => response, (error) => {
                console.log(error);
                if(!this.state.error)
                    this.setState({ error: error });
            });
        }

        displayError = () => {
            this.setState({ error: null });    
        }

        render() {
            const error = this.state.error
                ? (
                    <Modal 
                        showModal = {!!this.state.error}
                        displayModalHandler = {this.displayError}>
                            <div className = {CSSModule.ErrorMessage}>
                                {`ERROR: ${this.state.error.message}`}
                            </div>
                    </Modal>
                )
                : null;

            return(
                <Fragment>
                    {error}
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;