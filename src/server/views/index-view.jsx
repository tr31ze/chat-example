//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from 'electrode-redux-router-engine';
import {routes} from '../../client/routes';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../client/reducers';
import Immutable from 'seamless-immutable'

const Promise = require('bluebird');

function createReduxStore(req, match) { // eslint-disable-line
    const logger = store => next => action => {
        console.group(action.type);
        console.info('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return result;
    };

    const initialState = Immutable({
        currentUser: {
            nickname: "",
            joined: null
        },
        messages: {
            past: [],
            current: '',
            next: []
        },
        users: []
    });

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(logger)
    );
    return Promise.resolve(store);
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {
    const app = req.server && req.server.app || req.app;
    if (!app.routesEngine) {
        app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
    }

    return app.routesEngine.render(req);
};
