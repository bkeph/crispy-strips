import Modal from "../../components/UI/Modal/Modal";
import { Component, Fragment } from "react";
import CSSModule from './withErrorHandler.module.css';

// HOC that wrap any component that uses Axios and handle its errors
const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }
        
        // constructor(props) {
        //     super(props);
        //     this.state = { error: null };
        //     this.catchError("constructor");
        // }

        componentDidMount() {
            this.catchError();
        }

        componentDidUpdate() {
            this.catchError();
        }

        catchError() {
            // Reset any previous errors
            axiosInstance.interceptors.request.use((request) => {
                if(this.state.error) {
                    this.setState({ error: null });
                }
                return request;
            }, (error) => {
                this.setState({ error: error });
            });

            // Check for errors at response receipt
            axiosInstance.interceptors.response.use(response => response, (error) => {
                this.setState({ error: error });
            });
        }

        displayError = () => {
            if(this.state.error)
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