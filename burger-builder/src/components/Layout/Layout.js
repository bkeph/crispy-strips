import {Fragment} from 'react';
import CSSModule from '../Layout/Layout.module.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../UI/Navigation/Sidedrawer/Sidedrawer';

const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar />
            <Sidedrawer />

            {/* Using this component as a wrapper for the other components to be rendered */}
            <main className = {CSSModule.Layout}>
                {props.children}
            </main>
        </Fragment>
    );
};

export default Layout;