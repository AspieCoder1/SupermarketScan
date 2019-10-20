import { createStore } from 'redux';
import reducer from './reducer';

const initial_state = {};

export default createStore(reducer, initial_state);
