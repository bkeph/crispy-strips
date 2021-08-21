import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';

function App() {
    return (
        <BrowserRouter>
            <Layout>

                <Switch>
                    <Route path='/checkout'>
                        <Checkout />
                    </Route>

                    <Route path='/' exact>
                        <BurgerBuilder />
                    </Route>

                    <Route render={() => <div>Page not found.</div>} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
