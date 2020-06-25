import { combineReducers, createStore } from "redux";
import _ from 'lodash';

const cart = (state = [], action) => {
    if(action.type === 'ADD_TO_CART') {
        const idx = _.findIndex(state, ['id', action.data.id]);
        const item = state[idx];
        if(idx === -1) return [
            ...state,
            action.data,
        ]
        if(item.qty >= 99) return state;
        return [
            ...state.slice(0, idx),
            {
                ...item,
                qty: item.qty + 1
            },
            ...state.slice(idx + 1)
        ]
    }
    if(action.type === 'INCREASE_QTY') {
        const idx = _.findIndex(state, ['id', action.data]);
        const item = state[idx];
        if(item.qty >= 99) return state;
        return [
            ...state.slice(0, idx),
            {
                ...item,
                qty: item.qty + 1
            },
            ...state.slice(idx + 1)
        ]
    }
    if(action.type === 'DECREASE_QTY') {
        const idx = _.findIndex(state, ['id', action.data]);
        const item = state[idx];
        if(item.qty === 1) return state.filter(f => f.id !== action.data);
        return [
            ...state.slice(0, idx),
            {
                ...item,
                qty: item.qty - 1
            },
            ...state.slice(idx + 1)
        ]
    }
    return state;
}

const store = combineReducers({
    cart,
})

export default createStore(store);