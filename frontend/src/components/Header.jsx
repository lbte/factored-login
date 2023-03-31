import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Profile from "./Profile"

// to show the title and logout button as well as the profile with it
const Header = ({title}) => {
    const { token, setToken } = useContext(UserContext);
    const [is404, set404] = useState(false); 

    const handleLogout = () => {
        setToken(null);
    };

    const handleIs404 = () => {
        set404(!is404);
    };

    return (
        <>
            <div className="columns">
                <div className="column is-two-quarters">
                    <h1 className="title">{!is404 ? title : "Eror 404: Not Found"}</h1>
                    {token ? (    
                                <div className="is-grouped">
                                    <button className="button is-pulled-right mr-2" onClick={handleLogout}>Logout</button>
                                    <button className="button is-pulled-right mr-2 is-info is-light" onClick={handleIs404}>{ !is404 ? "Click me" : "Go back"}</button>
                                </div>
                            ) : <div className="columns is-centered"><h1>OOPS!...</h1></div>}
                </div>
            </div>
            {!is404 && (
                <Profile />
            )}
        </>
    );
};

export default Header;
