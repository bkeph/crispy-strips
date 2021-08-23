import CSSModule from './CheckoutSummary.module.css';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

const CheckoutSummary = (props) => {
    return (
        <div className = {CSSModule.Wrapper}>
            <OrderSummary 
                ingredients = {props.ingredients}
                totalPrice = {props.totalPrice}
                title = {"Checkout"}
                closeBtnText = {"Cancel"}
                goBtnText = {"Order"}
                closeBtnAction = {props.closeBtnAction}
                goBtnAction = {props.goBtnAction}/>
        </div>
    )
};


export default CheckoutSummary;