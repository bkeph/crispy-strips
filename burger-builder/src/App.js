import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <BurgerBuilder />
            </Layout>
        </BrowserRouter>
    );
}

export default App;
