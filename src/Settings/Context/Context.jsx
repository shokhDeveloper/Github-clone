import { createContext, useState } from "react";

export const Context = createContext()
export const ContextProvider = ({children}) => {
    const [starRepos, setStarRepos] = useState(false)
    const [page, setPage] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [homeBar, setHomeBar] = useState(false)
    return(
        <Context.Provider value={{starRepos, setStarRepos, page, setPage, disabled, setDisabled, maxPage, setMaxPage, homeBar, setHomeBar}}>
            {children}
        </Context.Provider>
    )
}