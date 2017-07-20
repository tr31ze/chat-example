import {combineReducers} from 'redux';
import moment from 'moment';

const checkBox = (store, action) => {
    if (action.type === 'TOGGLE_CHECK') {
        return {
            checked: !store.checked
        };
    }

    return store || {checked: false};
};

const number = (store, action) => {
    if (action.type === 'INC_NUMBER') {
        return {
            value: store.value + 1
        };
    } else if (action.type === 'DEC_NUMBER') {
        return {
            value: store.value - 1
        };
    }

    return store || {value: 0};
};

const messages = (store = [], action) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            if(store.current && store.past.length > 0) {
                return store
                    .set('past', store.past.concat(store.current))
                    .set('current', action.payload);
            } else if(store.current && store.past.length === 0) {
              return store
                .set('past', store.past.concat(store.current))
                .set('current', action.payload);
            }
            else {
                return store
                        .set('current', action.payload);
            }

        case 'REDO':
            if(store.current && store.past.length > 0) {
                return store
                    .set('past', store.past.concat(store.current))
                    .set('current', store.next[store.next.length - 1])
                    .set('next', store.next.slice(0, store.next.length - 1));
            } else if(store.current && store.past.length === 0) {
                return store
                    .set('past', store.current)
                    .set('current', store.next[store.next.length - 1])
                    .set('next', store.next.slice(0, store.next.length - 1));
            } else {
                return store
                    .set('current', store.next[store.next.length - 1])
                    .set('next', store.next.slice(0, store.next.length - 1));
            }


        case 'UNDO':
            if(store.current && store.past.length > 0) {
                return store
                    .set('past', store.past.slice(0, store.past.length - 1))
                    .set('next', store.next.concat(store.current))
                    .set('current', store.past[store.past.length - 1]);
            } else {
                return store
                    .set('next', store.next.concat(store.current))
                    .set('current', "")

            }

        default:
            return store;
    }
};

const users = (store = [], action) => {
    switch (action.type) {
        case 'ADD_USERS':
           return store.concat(action.payload);

        default:
            return store;
    }

};

const currentUser = (store = {}, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return store
                    .set("nickname", action.payload.username)
                    .set("joined", action.payload.time);

        default:
            return store;
    }

};

export default combineReducers({
    currentUser,
    messages,
    users
});
