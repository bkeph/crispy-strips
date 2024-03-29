import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import fetchOrdersReducer from './store/reducers/fetchOrders';
import authReducer from './store/reducers/auth';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development'
		?	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		:	null
	|| compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	fetchOrders: fetchOrdersReducer,
	auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
