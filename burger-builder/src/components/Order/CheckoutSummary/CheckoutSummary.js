import CSSModule from './CheckoutSummary.module.css';
import StateManager from '../../StateManager/StateManager';
import { useContext } from 'react';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

const CheckoutSummary = () => {
    const context = useContext(StateManager);

    return(
        <div className = {CSSModule.Wrapper}>
            <OrderSummary 
                ingredients = {context.ingredients}
                price = {context.totalPrice}
                title = {"Checkout"}
                closeBtnText = {"Go to main page"}
                goBtnText = {"Order"}
                closeBtnAction = {context.returnToMainPageHandler}
                goBtnAction = {context.orderHandler}/>
        </div>
    );
}

export default CheckoutSummary;