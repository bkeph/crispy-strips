import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Checkout from './components/Order/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Logout/Logout";
import { connect } from "react-redux";
import { useEffect } from "react";
import * as actions from './store/actions/index';

function App(props) {

    useEffect(() => {
        props.loginWithExistingToken();
    }, []);

    const routes = props.isAuthenticated
        ?   (
            <Switch>
                <Route path='/orders' exact component={Orders} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/auth' exact component={Auth} />
                <Route path='/logout' exact component={Logout} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
                {/* <Route render={() => <div>Page not found.</div>} /> */}
            </Switch>
        )
        :   (
            <Switch>
                <Route path='/auth' exact component={Auth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
                {/* <Route render={() => <div>Page not found.</div>} /> */}
            </Switch>
        );

    return (
        <BrowserRouter>
            <Layout>
                {routes}
            </Layout>
        </BrowserRouter>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
    loginWithExistingToken: () => dispatch(actions.checkForToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
