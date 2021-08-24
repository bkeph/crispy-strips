import CSSModule from './ListElement.module.css';

const ListElement = (props) => {

    let customerData = [];
    let ingredients = [];
    let price = [];

    const createElement = () => {
        for (const dataType in props.data) {
            if (Object.hasOwnProperty.call(props.data, dataType)) {
                const element = props.data[dataType];

                if(dataType === "customerData") {
                    for (const customerDataElement in element) {
                        if (Object.hasOwnProperty.call(element, customerDataElement)) {
                            const customerDataItem = element[customerDataElement];
                            customerData.push([customerDataElement, customerDataItem]);
                        }
                    }
                }
                else if(dataType === "ingredients") {
                    for (const ingredientElement in element) {
                        if (Object.hasOwnProperty.call(element, ingredientElement)) {
                            const ingredientItem = element[ingredientElement];
                            ingredients.push([ingredientElement, ingredientItem]);
                        }
                    }
                }
                else if(dataType === "price") {
                    price.push([dataType, `${element}$`]);
                }
            }
        }

        const toRender = [...customerData, ...ingredients, ...price].map(item => (
            <div className = {CSSModule.ListElement} key = {`${item[0]}_${item[1]}`}>
                <div className = {CSSModule.Property}>{item[0]}</div>
                <div className = {CSSModule.Value}>{item[1]}</div>
            </div>
        ));

        return(
            <div className = {CSSModule.ListElementWrapper}>
                {toRender}
            </div>
            );
    };

    const element = (
        <div>
            {createElement()}
        </div>
    );
    return element;
}

export default ListElement;