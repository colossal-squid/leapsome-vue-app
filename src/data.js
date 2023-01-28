const API_URL = 'http://localhost:3022';

export function loadCurrentUser() {
    return fetch(`${API_URL}/users/current`).then(res => res.json())
}

export function findUsers() {
    return fetch(`${API_URL}/users`).then(res => res.json())
}

export function loadUser(id) {
    if (!id) {
        throw Error(`Data#loadUser, id has to be defined, ${id} was passed`)
    }
    return fetch(`${API_URL}/users/${id}`).then(res => res.json())
}

export function loadFeedback ({author, receiver}) {
    if (author) {
        return fetch(`${API_URL}/feedback?by=${author}`).then(res => res.json())
    } else if (receiver) {
        return fetch(`${API_URL}/feedback?for=${receiver}`).then(res => res.json())
    } else {
        return fetch(`${API_URL}/feedback`)
    }
}