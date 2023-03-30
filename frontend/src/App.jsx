import React, {useContext, useEffect, useState} from "react";
import Authentication from "./components/Authentication";
import Header from "./components/Header";
//import Login from "./components/Login";
import {UserContext} from "./context/UserContext";

const App = () => {
    // to be able to receive the message from the root endpoint
    const [message, setMessage] = useState("");
    const {token, user} = useContext(UserContext);

    // function to make the request, and as the endpoint is async this function must be as well
    const getWelcomeMessage = async () => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        };
        const response = await fetch("/api", requestOptions);
        const data = await response.json();

        //console.log(data);
        if (!response.ok) {
            console.log("Something went wrong");
        } else {
            setMessage(data.message);
        }
    };

    // use the function just created
    useEffect(() => {
        getWelcomeMessage();
    }, []);

    // put the header message
    // if the token doesn't exist then show the register screen, otherwise show table
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
