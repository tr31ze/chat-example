export const setUsername = (data) => {
    return {
        type: 'SET_USERNAME',
        payload: data
    };
};

export const sendMessage = (data, user) => {
    return {
        type: 'SEND_MESSAGE',
        payload: {data, user}
    };
};

export const redoMessage = () => {
    return {
        type: 'REDO'
    };
};

export const undoMessage = () => {
    return {
        type: 'UNDO'
    };
};

export const addUsers = (data) => {
    return {
        type: 'ADD_USERS',
        payload: data
    };
};


