import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import CSSModule from './Logout.module.css';
import * as actions from '../../store/actions/index'; 

const TIME_UNTIL_REDIRECT = 3000;

const Logout = (props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            props.resetOrders();
            props.logout();
            props.history.push('/');
        }, TIME_UNTIL_REDIRECT);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    return (
        <div className = {CSSModule.Logout}>
            <div>You have been logged out.</div>
            <div>Redirecting to main page. Please wait...</div>
            <div><LoadingSpinner /></div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.logout()),
    resetOrders: () => dispatch(actions.initOrders())
});

export default withRouter(connect(null, mapDispatchToProps)(Logout));

