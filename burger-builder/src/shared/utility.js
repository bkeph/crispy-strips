export const updateState = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    };
};

export const checkValidity = (inputs, currentValue, inputFieldName, value, rules) => {
    let isValid = true;
    const updatedInputs = JSON.parse(JSON.stringify(inputs));

    if (currentValue === value || !rules)
        return;

    updatedInputs[inputFieldName].value = currentValue;

    if (rules.required) {
        isValid = currentValue.trim() && isValid;
    }

    if (rules.minLength) {
        isValid = currentValue.length >= rules.minLength && isValid;
    }

    updatedInputs[inputFieldName].valid = isValid;

    return updatedInputs;
};

export const checkOverallFormValidity = inputs => {
    let isFormValid = true;
    for (const inputFieldName in inputs) {
        if (Object.hasOwnProperty.call(inputs, inputFieldName)) {
            const inputFieldData = inputs[inputFieldName];
            isFormValid = inputFieldData.valid && isFormValid;
        }
    }

    return isFormValid;
};

export const returnInputData = (event, inputs) => {
    const inputData = {};
    let index = 0;

    for (const inputFieldName in inputs) {
        if (Object.hasOwnProperty.call(inputs, inputFieldName)) {
            inputData[inputFieldName] = event.target[index].value;
            index++;
        }
    }
    return inputData;
};

export const renderInputElements = (inputs, InputComponent, checkValidityHandler) => {
    const inputElements = [];
    for (const inputFieldName in inputs) {
        if (Object.hasOwnProperty.call(inputs, inputFieldName)) {

            const inputFieldData = inputs[inputFieldName];

            const isinvalid = (inputFieldData.value !== "" && inputFieldData.valid === false)
                ? { isinvalid: true }
                : null;

            inputElements.push(
                <InputComponent
                    onChange={(event) => checkValidityHandler(inputs, event.target.value, inputFieldName, inputFieldData.value, inputFieldData.validation)}
                    key={inputFieldName}
                    name={inputFieldName}
                    {...isinvalid}
                    {...inputFieldData.elementConfig} />
            );
        }
    }

    return inputElements;
};