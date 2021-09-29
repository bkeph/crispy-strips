import axiosInstance from '../../axios';
import { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import DataList from '../Order/DataList/DataList';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Orders = (props) => {
    useEffect(() => {
        if (props.loading === null && props.orders === null) {
            props.fetchOrders();
        }

    }, [props.loading, props.orders]);


    const toRender = props.loading
        ? <LoadingSpinner />
        : <DataList orders={props.orders} />;

    return (toRender);
};

const mapStateToProps = state => ({
    loading: state.fetchOrders.loading,
    error: state.fetchOrders.error,
    orders: state.fetchOrders.orders
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));