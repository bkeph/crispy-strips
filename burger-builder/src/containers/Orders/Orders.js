import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import DataList from '../../components/Order/DataList/DataList';

const Orders = (props) => {
    const [loadingState, loadingStateHandler] = useState(null);
    const [wasDataFetchedState, wasDataFetchedHandler] = useState(null);
    const [errorState, errorStateHandler] = useState(null);
    const [ordersDataState, ordersDataHandler] = useState(null);

    useEffect(() => {
        if(loadingState === null && wasDataFetchedState === null) {
            loadingStateHandler(true);
            wasDataFetchedHandler(false);
        
            axiosInstance.get('/orders.json')
                .then(res => {
                    console.log(res);
                    loadingStateHandler(false);
                    wasDataFetchedHandler(true);
                    res.data
                        ? ordersDataHandler(res.data)
                        : ordersDataHandler("no data");
                })
                .catch(err => {
                    loadingStateHandler(false);
                    wasDataFetchedHandler(false);
                    errorStateHandler(<div>Please try again. Following error was encountered: {err}</div>);
                });
            }
    }, [loadingState, wasDataFetchedState, errorState]);

    const toRender = loadingState
        ? <LoadingSpinner />
        : wasDataFetchedState
            ? <DataList orders = {ordersDataState}/>
            : errorState;

    return(
        toRender
    );
}

export default Orders;