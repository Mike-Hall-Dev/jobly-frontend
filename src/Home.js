import React, { useContext } from "react";
import CurrUserContext from "./CurrUserContext";
import "./Home.css"
import { Link } from "react-router-dom";

const Home = () => {
    const { currUser } = useContext(CurrUserContext);
    return (
        <div className="Home">
            <h2>Jobly</h2>
            <p>All the jobs in one, convenient place.</p>
            {(currUser !== null) ?
                <h3>Welcome Back, {currUser.username}!</h3>
                :
                <div>
                    <Link to="/login" className="btn btn-outline-success me-1">Login</Link>
                    <Link to="/signup" className="btn btn-outline-info ms-1">Sign Up</Link>
                </div>
            }
        </div>
    )
}

export default Home;