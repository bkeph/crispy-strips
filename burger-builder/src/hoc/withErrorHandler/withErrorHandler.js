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

        componentDidUpdate() {
            this.catchError();
        }

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject( this.reqInterceptor );
            axiosInstance.interceptors.response.eject( this.resInterceptor );
        }

        catchError() {
            // Reset any previous errors
            this.reqInterceptor = axiosInstance.interceptors.request.use((request) => {
                this.setState({ error: null });
                return request;
            }/*, (error) => {
                this.setState({ error: error });
            }*/);

            // Check for errors at response receipt
            this.resInterceptor = axiosInstance.interceptors.response.use(response => {
                console.log("[withErrorHandler], response:", response);
                return response;
            }, (error) => {
                console.log(error);
                this.setState({ error: error });
            });
        }

        displayError = () => {
            this.setState({ error: null });    
        }

        render() {
            console.log("[withErrorHandler], error: ", this.state.error);
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

                console.log("error element", error);

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