import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import DataList from '../../components/Order/DataList/DataList';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = () => {
    const [loadingState, loadingStateHandler] = useState(null);
    const [ordersDataState, ordersDataHandler] = useState(null);
    const [errorState, errorHandler] = useState(null);

    useEffect(() => {
        if(loadingState === null && ordersDataState === null) {
            loadingStateHandler(true);
        
            axiosInstance.get('/orders.json')
                .then(res => {
                    loadingStateHandler(false);

                    if(res) {
                        if(res.data)
                            ordersDataHandler(res.data);
                        else
                            ordersDataHandler("no data");
                    }
                })
                .catch(err => {
                    loadingStateHandler(false);
                    errorHandler(true);
                });
            }
    }, [loadingState, ordersDataState]);

    const toRender = loadingState
        ? <LoadingSpinner />
        : <DataList orders = {ordersDataState}/>;

    return(
        toRender
    );
}

export default withErrorHandler(Orders, axiosInstance);