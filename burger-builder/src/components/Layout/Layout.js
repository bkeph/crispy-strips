import {Fragment} from 'react';
import CSSModule from '../Layout/Layout.module.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar />

            {/* Using this component as a wrapper for the other components to be rendered */}
            <main className = {CSSModule.Layout}>
                {props.children}
            </main>
        </Fragment>
    );
};

export default Layout;