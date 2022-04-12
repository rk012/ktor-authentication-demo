/**
 * Component for Login and Registration Page
 */

import React from 'react'
import {useNavigate, Navigate} from "react-router-dom";

import {get_jwt_token, createToken} from "./authToken"
import './stylesheets/loginPage.css'

export default function LoginPage(props) {
    const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passRepeat, setPassRepeat] = React.useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()

        let register = false

        if (props.registration) {
            if (password !== passRepeat) {
                console.log(password)
                console.log(passRepeat)

                alert("Passwords do not match")
                return null
            }

            register = true
        }

        createToken(username, password, register).then(res => {
            if (res) {
                navigate('/dashboard')
            }
        })
    }

    if (get_jwt_token() !== "") {
        return <Navigate to="/dashboard"/>
    }

    let passReentry = null

    if (props.registration) {
        passReentry = <input type="text" placeholder="Retype Password" onChange={e => {
            setPassRepeat(e.target.value)
        }}/>
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="Username" onChange={e => {
                    setUsername(e.target.value)
                }}/>
                <input type="text" placeholder="Password" onChange={e => {
                    setPassword(e.target.value)
                }}/>
                {passReentry}
                <input type="submit"/>
            </form>
        </div>
    )
}