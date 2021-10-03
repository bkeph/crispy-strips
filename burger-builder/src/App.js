import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Checkout from './components/Order/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Logout/Logout";

function App() {
    return (
        <BrowserRouter>
            <Layout>

                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' exact component={Orders} />
                    <Route path='/auth' exact component={Auth} />
                    <Route path='/logout' exact component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route render={() => <div>Page not found.</div>} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
