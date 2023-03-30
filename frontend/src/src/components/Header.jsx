import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Profile from "./Profile"

const Header = ({title}) => {
    const { token, setToken } = useContext(UserContext);

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <>
            <div className="columns">
                <div className="column is-two-quarters">
                    <h1 className="title">{title}</h1>
                </div>
                <div className="column is-two-quarters">
                    {token && (<button className="button is-pulled-right" onClick={handleLogout}>Logout</button>)}
                </div>
            </div>

            <Profile />
        </>
    );
};

export default Header;
