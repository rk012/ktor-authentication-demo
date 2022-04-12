/**
 * Utility functions for working with jwt tokens and authentication
 */

import axios from "axios";
import {Buffer} from "buffer";

let jwt_token = ""

export function getUsername() {
    if (jwt_token == null) {
        return null;
    }

    return JSON.parse(Buffer.from(jwt_token.split('.')[1], 'base64').toString()).user
}

export async function createToken(username, password, register) {
    let success = false

    if (register) {
        await axios.post(`/register?user=${username}&pass=${password}`)
            .then(response => response.data)
            .then(data => {
                jwt_token = data
                success = true
                alert(`User ${username} created!`)
            })
            .catch(e => {
                if (e.response.status === 403) {
                    alert(`User ${username} already exists!`)
                }
            })
    } else {
        await axios.post(`/login?user=${username}&pass=${password}`)
            .then(response => response.data)
            .then(data => {
                jwt_token = data
                success = true
                alert(`User ${username} logged in!`)
            })
            .catch(e => {
                if (e.response.status === 401) {
                    alert(`User ${username} does not exist or password is incorrect.`)
                }
            })
    }

    return success
}

export function get_jwt_token() {
    return jwt_token
}

export function logout() {
    jwt_token = ""
}