import { combineReducers, createStore } from "redux";
import _ from 'lodash';

const cart = (state = [], action) => {
    if (action.type === 'ADD_TO_CART') {
        const idx = _.findIndex(state, ['id', action.data.id]);
        const item = state[idx];
        if (idx === -1) return [
            ...state,
            action.data,
        ]
        if (item.qty >= 99) return state;
        return [
            ...state.slice(0, idx),
            {
                ...item,
                qty: item.qty + 1
            },
            ...state.slice(idx + 1)
        ]
    }
    if (action.type === 'INCREASE_QTY') {
        const idx = _.findIndex(state, ['id', action.data]);
        const item = state[idx];
        if (item.qty >= 99) return state;
        return [
            ...state.slice(0, idx),
            {
                ...item,
                qty: item.qty + 1
            },
            ...state.slice(idx + 1)
        ]
    }
    if (action.type === 'DECREASE_QTY') {
        const idx = _.findIndex(state, ['id', action.data]);
        const item = state[idx];
        if (item.qty === 1) return state.filter(f => f.id !== action.data);
        return [
            ...state.slice(0, idx),
            {
                ...item,
                qty: item.qty - 1
            },
            ...state.slice(idx + 1)
        ]
    }
    if (action.type === 'CLEAR_CART') {
        return [];
    }
    return state;
}

const auth = (state = '', action) => {
    if (action.type === 'SET_AUTH') {
        return action.data;
    }
    if (action.type === 'LOGOUT') {
        return '';
    }
    return state;
}

const reducers = combineReducers({
    cart,
    auth,
})

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const store = createStore(reducers, loadState());

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

store.subscribe(_.throttle(() => {
    saveState({
        cart: store.getState().cart,
        auth: store.getState().auth,
    });
}, 1000))

export default store;