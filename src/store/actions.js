export function addToCart(product, variant) {
    const { images, name } = product;
    const { id, price, name: name2 } = variant;
    return {
        type: 'ADD_TO_CART',
        data: {
            id,
            price,
            qty: 1,
            image: images[0].filename,
            name: name + ' - ' + name2,
        }
    }
}

export function increaseQty(variant) {
    return {
        type: 'INCREASE_QTY',
        data: variant.id
    }
}

export function decreaseQty(variant) {
    return {
        type: 'DECREASE_QTY',
        data: variant.id
    }
}

export function clearCart() {
    return {
        type: 'CLEAR_CART'
    }
}

export function setAuth(user) {
    return {
        type: 'SET_AUTH',
        data: user
    }
}

export function logout(user) {
    return {
        type: 'LOGOUT',
        data: user
    }
}