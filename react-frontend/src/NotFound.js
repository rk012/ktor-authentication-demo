/**
 * Component for the 404 page
 */

import {Link} from "react-router-dom";
import React from "react";

const NotFound = () => (
    <div>
        <h1>404 - Not Found!</h1>
        <Link to="/">Home</Link>
    </div>
)

export default NotFound