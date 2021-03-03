import {createStore } from 'redux';
import reducer  from './reducers/index';

const configStore = () => createStore(reducer);

export default configStore;
