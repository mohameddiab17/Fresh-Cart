import { createContext, useEffect, useState } from "react";


export const authContext = createContext();

export default function AuthContextProvider({children}){

    const [userIsLoggedIn , setUserIsLoggedIn] = useState(!!localStorage.getItem('token'))  // ==> Boolean() ==> explicit conversion
    
    // useEffect(()=>{
    //     if (localStorage.getItem('token') != null) {
    //         setUserIsLoggedIn(true)                     ==> infiniteLoop
    //     }
    // })

    return <authContext.Provider value={{userIsLoggedIn , setUserIsLoggedIn}}>
    {children}
    </authContext.Provider>
}