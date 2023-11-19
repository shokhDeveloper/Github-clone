import { createContext, useState } from "react";

export const Context = createContext()
export const ContextProvider = ({children}) => {
    const [starRepos, setStarRepos] = useState(false)
    return(
        <Context.Provider value={{starRepos, setStarRepos}}>
            {children}
        </Context.Provider>
    )
}