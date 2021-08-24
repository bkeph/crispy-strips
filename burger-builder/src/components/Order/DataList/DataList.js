import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import ListElement from './ListElement/ListElement';
import CSSModule from './DataList.module.css';

const DataList = (props) => {
    const deliverData = () => {
        let data = [];
        if(props.orders) {
            for (const key in props.orders) {
                if (Object.hasOwnProperty.call(props.orders, key))
                    data.push(<ListElement data = {props.orders[key]} key = {key}/>);
            }
            return data;
        }
        else
            return <LoadingSpinner />;
    }
    const data = props.orders !== "no data"
        ? deliverData()
        : "There is no order history stored on the server."

    return(<div className = {CSSModule.DataList}>{data}</div>);
}

export default DataList;