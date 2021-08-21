import CSSModule from './CheckoutSummary.module.css';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

const CheckoutSummary = (props) => (
    <div className = {CSSModule.Wrapper}>
        <OrderSummary 
            ingredients = {props.ingredients}
            price = {props.totalPrice}
            title = {"Checkout"}
            closeBtnText = {"Cancel"}
            goBtnText = {"Order"}
            closeBtnAction = {props.returnToMainPageHandler}
            goBtnAction = {props.orderHandler}/>
    </div>
);


export default CheckoutSummary;