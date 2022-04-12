/**
 * Wrapper component for pages with authentication
 */

import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import React, {useEffect} from "react";

import {getUsername, get_jwt_token} from "./authToken";

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
                            <Link to="/logout">Logout</Link>
                        </header>
                        {props.page}
                    </div>
                )
            })
            .catch(() => {
                navigate("/logout")
            })
    }, [])

    return page
}