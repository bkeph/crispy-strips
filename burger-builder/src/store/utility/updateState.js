const updateState = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    };
}

export default updateState;