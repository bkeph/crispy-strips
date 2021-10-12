import { Component, Fragment, lazy, Suspense } from 'react';
import { withRouter, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

const ContactDataAsync = lazy(() => import('../../../containers/ContactData/ContactData'));

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
        const summary = !this.props.ingredients
            ?   <Redirect to='/' />
            :   <Fragment>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients} 
                        totalPrice={this.props.totalPrice}
                        closeBtnAction = {this.returnToMainPage}
                        goBtnAction = {this.toContactForm} />;

                    <Route path={`${this.props.match.path}/contact-data`}>
                        <Suspense fallback={<LoadingSpinner/>}>
                            <ContactDataAsync />
                        </Suspense>
                    </Route>
                </Fragment>

        return (summary);
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
});

export default withRouter(connect(mapStateToProps)(Checkout));