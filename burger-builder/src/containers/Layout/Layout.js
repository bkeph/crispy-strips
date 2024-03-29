import {Component, Fragment} from 'react';
import CSSModule from '../Layout/Layout.module.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/UI/Navigation/Sidedrawer/Sidedrawer';
import SidedrawerStateManager from '../../components/SidedrawerStateManager/SidedrawerStateManager';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSidedrawer: false,
    }

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
                            isAuthenticated: this.props.isAuthenticated,
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

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(Layout);