/**
 * Component for Home page
 */

import {Link} from 'react-router-dom'

import './stylesheets/home.css'

const Home = () => (
    <div id="homePage">
        <h1>Home page</h1>
        <div id="loginButtons">
            <Link to="./login" className="NavButton">Login</Link>
            <Link to="./register" className="NavButton">Register</Link>
        </div>
    </div>
)

export default Home;
