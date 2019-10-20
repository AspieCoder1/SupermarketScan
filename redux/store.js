import { createStore } from 'redux';
import reducer from './reducer';

const initial_state = { predictions: [] };

export default createStore(reducer, initial_state);
