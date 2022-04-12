/**
 * Component for logout page
 */
import {Navigate} from "react-router-dom";

import {logout} from "./authToken";

export default function LogoutPage() {
    logout()

    return <Navigate to="/login"/>
}