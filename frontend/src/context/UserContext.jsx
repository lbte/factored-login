import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext()

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("factoredLoginToken"));

    // use the token, send a request to the /users/me and if it's ok the token is valid
    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token, // concatenation
                },
            };
            // make the request
            const response = await fetch("/api/users/me", requestOptions);

            // if there's an error the token is null and it logs the user out
            if(!response.ok) {
                setToken(null);
            }
            // update local storage with the token
            localStorage.setItem("factoredLoginToken", token);
        };
        // make the call
        fetchUser();
        // dependency, so every time token is update this is what'll be done
    }, [token]);

    return(
        // to make the token and setToken accessible they are passed as a prop
        <UserContext.Provider value={[token, setToken]}>
            {[props.children]}
        </UserContext.Provider>
    )
}