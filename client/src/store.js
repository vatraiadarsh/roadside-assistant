import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import {userRegisterReducer} from "./reducers/userReducers";



const reducer = combineReducers({
    userRegister:userRegisterReducer,
});

const middlewares = [thunk,logger];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;