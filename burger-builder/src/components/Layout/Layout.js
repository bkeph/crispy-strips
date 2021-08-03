import {Fragment} from 'react';
import CSSModule from '../Layout/Layout.module.css';

const Layout = (props) => {
    return (
        <Fragment>
            <div>
                Toolbar, Sidebar, Backdrop
            </div>

            {/* Using this component as a wrapper for the other components to be rendered */}
            <main className = {CSSModule.Layout}>
                {props.children}
            </main>
        </Fragment>
    );
};

export default Layout;