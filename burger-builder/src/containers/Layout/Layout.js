import {Component, Fragment} from 'react';
import CSSModule from '../Layout/Layout.module.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/UI/Navigation/Sidedrawer/Sidedrawer';
import SidedrawerStateManager from '../../components/SidedrawerStateManager/SidedrawerStateManager';

class Layout extends Component {
    state = {
        showSidedrawer: false,
        // mobileVersion: window.visualViewport.width < 400 // TO DELETE
        //     ? true
        //     : false
    }

    // showScreenWidth = (() => { // TO DELETE
    //     console.log("mobileVersion:",this.state.mobileVersion);
    //     // console.log("Window.screen.width", window.visualViewport.width);
    // })()

    displaySidedrawerHandler = () => {
        this.setState((prevState) => ({ showSidedrawer: !prevState.showSidedrawer }));
    }
    
    render() {
        return (
            <Fragment>
                <SidedrawerStateManager.Provider
                    value = {
                        {
                            ...this.state,
                            displaySidedrawerHandler: this.displaySidedrawerHandler
                        }
                    }>

                        <Toolbar />
                        <Sidedrawer />

                        {/* Using this component as a wrapper for the other components to be rendered */}
                        <main className = {CSSModule.Layout}>
                            {this.props.children}
                        </main>

                </SidedrawerStateManager.Provider>
            </Fragment>
        );
    }
}

export default Layout;