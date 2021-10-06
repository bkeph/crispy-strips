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
            props.fetchOrders(props.token, props.userId);
        }

    }, [props.loading, props.orders]);

    const toRender = props.loading
        ?   <LoadingSpinner />
        :   props.orders === "no data" || (JSON.stringify(props.orders) === JSON.stringify({}))
            ?   <p>No previous orders.</p>
            :   <DataList orders={props.orders} />;

    return (toRender);
};

const mapStateToProps = state => ({
    loading: state.fetchOrders.loading,
    error: state.fetchOrders.error,
    orders: state.fetchOrders.orders,
    token: state.auth.token,
    userId: state.auth.localId
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));