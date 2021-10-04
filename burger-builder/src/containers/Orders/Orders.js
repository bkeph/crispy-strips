import axiosInstance from '../../axios/axios';
import { useEffect } from 'react';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import DataList from '../../components/Order/DataList/DataList';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Orders = (props) => {
    useEffect(() => {
        if (props.loading === null && props.orders === null) {
            props.fetchOrders(props.token);
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
    orders: state.fetchOrders.orders,
    token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token) => dispatch(actions.fetchOrders(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));