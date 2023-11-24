import { createContext, useEffect, useState } from "react";

export const Context = createContext()
export const ContextProvider = ({children}) => {
    const [starRepos, setStarRepos] = useState(false)
    const [page, setPage] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [homeBar, setHomeBar] = useState(false)
    const [profileBarActive, setProfileBarActive] = useState(false)
    const [filterAllData, setFilterAllData] = useState([])
    const [headerUserLinks, setHeaderUserLinks] = useState(false)
    const [userPageDisabled, setUserPageDisabled] = useState("prev")
    return(
        <Context.Provider value={{starRepos, setStarRepos, page, setPage, disabled, setDisabled, maxPage, setMaxPage, homeBar, setHomeBar, profileBarActive, setProfileBarActive, filterAllData, setFilterAllData, headerUserLinks, setHeaderUserLinks, userPageDisabled, setUserPageDisabled}}>
            {children}
        </Context.Provider>
    )
}