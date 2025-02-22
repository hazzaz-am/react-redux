import { createStore } from 'redux';
import movieReducer from './reducers/movie-list';

const store = createStore(movieReducer)

export default store;