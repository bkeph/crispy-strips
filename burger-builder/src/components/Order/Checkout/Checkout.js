import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router';
import ContactData from '../../../containers/ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {
    returnToMainPage = () => {
        this.props.history.push({ pathname: "/" });
    }

    toContactForm = () => {
        this.props.history.replace(`${this.props.match.path}/contact-data`);
    }

    // componentDidMount() {
    //     if(this.props.location.search) {
    //         const dataFromURL = new URLSearchParams(this.props.location.search);
    //         const ingredients = {};

    //         for (const iterator of dataFromURL.entries()) {
    //             if(iterator[0] === "price") {
    //                 var totalPrice = +iterator[1];
    //                 continue;
    //             }
    //             ingredients[iterator[0]] = +iterator[1];
    //         }
    //         this.setState({ingredients, totalPrice, loading: true, wasDataPassed: true});
    //     } else {
    //         this.setState({loading: true, wasDataPassed: false});
    //     }
    // }
    
    render() {
        return (
            <Fragment>
                <CheckoutSummary 
                        ingredients={this.props.ingredients} 
                        totalPrice={this.props.totalPrice}
                        closeBtnAction = {this.returnToMainPage}
                        goBtnAction = {this.toContactForm}/>
                        
                <Route path={`${this.props.match.path}/contact-data`}>
                    <ContactData />
                </Route>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
});

export default connect(mapStateToProps)(withRouter(Checkout));