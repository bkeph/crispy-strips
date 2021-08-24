import CSSModule from './ListElement.module.css';

const ListElement = (props) => {

    let customerData = [];
    let ingredients = [];

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
            }
        }

        const customerDataToRender = customerData.map(item => (
            <div className = {CSSModule.ListElement} key = {`${item[0]}_${item[1]}`}>
                <div>{item[0]}</div>
                <div>{item[1]}</div>
            </div>
        ));

        const ingredientsToRender = ingredients.map(item => (
            <div className = {CSSModule.ListElement} key = {`${item[0]}_${item[1]}`}>
                <div>{item[0]}</div>
                <div>{item[1]}</div>
            </div>
        ));

        const toRender = ([customerDataToRender, ingredientsToRender]);

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