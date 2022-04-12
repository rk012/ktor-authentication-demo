/**
 * Wrapper component for pages with authentication
 */

import axios from "axios";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";

import {logout, getUsername, get_jwt_token} from "./authToken";

import "./stylesheets/authPage.css"

export default function AuthPage(props) {
    const navigate = useNavigate();

    const [page, setPage] = React.useState(null)

    // Check if user is logged in on page load
    useEffect(() => {
        axios.get("/api/validate_token", {
            headers: {
                Authorization: "Bearer " + get_jwt_token()
            }
        })
            .then(() => {
                setPage(
                    <div>
                        <header>
                            <h1>{`Hello ${getUsername()}`}</h1>
                            <button onClick={() => {
                                logout()
                                navigate("/login")
                            }}>Logout</button>
                        </header>
                        {props.page}
                    </div>
                )
            })
            .catch(() => {
                logout()
                navigate("/login")
            })
    }, [])

    return page
}