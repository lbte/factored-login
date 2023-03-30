import React, {useContext, useEffect, useState} from "react";
import Authentication from "./components/Authentication";
import Header from "./components/Header";
//import Login from "./components/Login";
import {UserContext} from "./context/UserContext";

const App = () => {
    const {token, user} = useContext(UserContext);

    // if the token doesn't exist then show the auth screen, otherwise show profile
    return (
        <>
            <div className="columns is-centered">
                <div className="column"></div>
                <div className="column m-5 is-three-quarters">
                    {
                        !token ? (
                            <Authentication/>
                        ) : (
                            <Header title="Profile"/>
                        )
                    }
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default App;
