import { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React, { Suspense } from "react";

import Layout from "./containers/Layout/Layout";
import * as actions from "./store/actions/index";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
// import Orders from "./containers/Orders/Orders";
// import Checkout from "./components/Order/Checkout/Checkout";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Logout/Logout";
// import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

const OrdersAsync = React.lazy(() => import("./containers/Orders/Orders"));
const CheckoutAsync = React.lazy(() => import("./components/Order/Checkout/Checkout"));
const AuthAsync = React.lazy(() => import("./containers/Auth/Auth"));
const LogoutAsync = React.lazy(() => import("./containers/Logout/Logout"));
const BurgerBuilderAsync = React.lazy(() => import("./containers/BurgerBuilder/BurgerBuilder"));

function App(props) {
	useEffect(() => {
		props.loginWithExistingToken();
	}, []);

	const routes = props.isAuthenticated ? (
		<Switch>
			<Route path="/orders" exact>
				<Suspense fallback={<LoadingSpinner/>}>
					<OrdersAsync />
				</Suspense>
			</Route>

			<Route path="/checkout" exact>
				<Suspense fallback={<LoadingSpinner/>}>
					<CheckoutAsync />
				</Suspense>
			</Route>

			<Route path="/auth" exact>
				<Suspense fallback={<LoadingSpinner/>}>
					<AuthAsync />
				</Suspense>
			</Route>

			<Route path="/logout" exact>
				<Suspense fallback={<LoadingSpinner/>}>
					<LogoutAsync />
				</Suspense>
			</Route>

			<Route path="/" exact>
				<Suspense fallback={<LoadingSpinner/>}>
					<BurgerBuilderAsync />
				</Suspense>
			</Route>

			<Redirect to="/" />
			{/* <Route render={() => <div>Page not found.</div>} /> */}
		</Switch>
	) : (
		<Switch>
			<Route path="/auth" exact>
				<Suspense fallback={<LoadingSpinner/>}>
					<AuthAsync />
				</Suspense>
			</Route>

			<Route path="/" exact>
				<Suspense fallback={<LoadingSpinner/>}>
					<BurgerBuilderAsync />
				</Suspense>
			</Route>

			<Redirect to="/" />
			{/* <Route render={() => <div>Page not found.</div>} /> */}
		</Switch>
	);

	return (
		<BrowserRouter>
			<Layout>{routes}</Layout>
		</BrowserRouter>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
	loginWithExistingToken: () => dispatch(actions.checkForToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
