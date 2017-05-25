import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware, reducer } from './ApiRedux.js';

export default store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

store.dispatch({ type: 'GET_CHEF_DATA' });
