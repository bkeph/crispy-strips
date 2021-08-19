import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CSSModule from './Checkout.module.css';
import StateManager from '../../components/StateManager/StateManager';
import { useContext, Fragment } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

const Checkout = (props) => {
    const context = useContext(StateManager);

    const checkIngredients = () => {
        for (const key in context.ingredients) {
            if (Object.hasOwnProperty.call(context.ingredients, key)) {
                const element = context.ingredients[key];
                if(element)
                    return true;
            }
        }
        return false;       
    };

    const goBack = (time) => {
        setTimeout(() => {
            props.history.push("/");
        }, time);
    }

    const showCheckout = checkIngredients()
        ? <CheckoutSummary />
        : (
            <Fragment>
                {
                    goBack(2.5 * 1000)
                }
                <div className = {CSSModule.GoBack}>No ingredients added. You are being redirected, please wait...</div>
                <LoadingSpinner color = {"rgb(48, 48, 48)"}/>
            </Fragment>
        );

    return (showCheckout);
};

export default Checkout;