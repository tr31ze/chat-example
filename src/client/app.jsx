//
// This is the client side entry point for the React app.
//

import React from 'react';
import {render} from 'react-dom';
import {routes} from './routes';
import {Router, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import Immutable from 'seamless-immutable';
//
//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

const logger = store => next => action => {
    console.group(action.type);
    console.log('prev state', store.getState());
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

window.webappStart = () => {
    const initialState = Immutable(window.__PRELOADED_STATE__);

    const store = createStore(rootReducer, initialState, applyMiddleware(logger));
    render(
        <Provider store={store}>
            <Router history={browserHistory}>{routes}</Router>
        </Provider>,
        document.querySelector('.js-content')
    );
};
