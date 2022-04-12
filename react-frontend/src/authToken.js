/**
 * Utility functions for working with jwt tokens and authentication
 */

import axios from "axios";

export let jwt_token = null

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

    console.log(success)
    return success
}