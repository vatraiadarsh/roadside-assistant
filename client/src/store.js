import {createStore, combineReducers,applyMiddleware} from redux;
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

const middlewares = [thunk,logger];

const reducer = combineReducers({});


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;