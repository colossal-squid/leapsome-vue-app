const API_URL = 'http://localhost:3022';

export function loadCurrentUser() {
    return fetch(`${API_URL}/users/current`).then(res => res.json())
}

export function findUsers(pageSize = 10, page = 0, name = undefined) {
    let url = `${API_URL}/users?take=${pageSize}&skip=${pageSize * page}`;
    if (name) {
        url += `&name=${name}`
    }
    return fetch(url).then(res => res.json())
}

export function loadUser(id) {
    if (!id) {
        throw Error(`Data#loadUser, id has to be defined, ${id} was passed`)
    }
    return fetch(`${API_URL}/users/${id}`).then(res => res.json())
}

export function loadFeedback({ author, receiver, id }) {
    if (id) {
        return fetch(`${API_URL}/feedback/${id}`).then(res => res.json())
    }
    else if (author) {
        return fetch(`${API_URL}/feedback?by=${author}`).then(res => res.json())
    } else if (receiver) {
        return fetch(`${API_URL}/feedback?for=${receiver}`).then(res => res.json())
    } else {
        return fetch(`${API_URL}/feedback`).then(res => res.json())
    }
}

export function createFeedback({ title, body, receiverIds }) {
    return fetch(`${API_URL}/feedback`, {
        method: 'post',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, body, receiverIds })
    }).then(res => res.json())
}